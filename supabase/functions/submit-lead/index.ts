// FZS Success landing page -> public.web_leads
//
// The public page never holds a database credential. This function runs with
// the service role and is the only write path into web_leads (the table has no
// INSERT policy at all), so the form cannot be bypassed and the database that
// holds 3.17M real phone numbers is never exposed to anonymous writes.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
  .split(',').map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin: string | null) {
  // When ALLOWED_ORIGINS is unset the function stays usable (echo the caller's
  // origin) but the origin allow-list below is skipped.
  // TODO: set the ALLOWED_ORIGINS secret before pointing any ad at this.
  const allow = ALLOWED_ORIGINS.length
    ? (origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0])
    : (origin ?? '*');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}

function normalisePhone(raw: string): string | null {
  let n = String(raw).replace(/\D/g, '');
  if (n.startsWith('0')) n = '60' + n.slice(1);
  if (!n.startsWith('60')) n = '60' + n;
  return /^601\d{8,9}$/.test(n) ? n : null;
}

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const num = (v: unknown) => {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const str = (v: unknown, max: number) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s.slice(0, max);
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method' }), { status: 405, headers });
  }
  if (ALLOWED_ORIGINS.length && (!origin || !ALLOWED_ORIGINS.includes(origin))) {
    return new Response(JSON.stringify({ ok: false, error: 'origin' }), { status: 403, headers });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'json' }), { status: 400, headers });
  }

  // Honeypot: report success, store nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  const fullName = String(body.nama ?? '').trim();
  const phone = normalisePhone(String(body.telefon ?? ''));
  const email = str(body.emel, 120)?.toLowerCase() ?? null;

  if (fullName.length < 3) {
    return new Response(JSON.stringify({ ok: false, error: 'name' }), { status: 400, headers });
  }
  if (!phone) {
    return new Response(JSON.stringify({ ok: false, error: 'phone' }), { status: 400, headers });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'email' }), { status: 400, headers });
  }
  if (body.consent !== true) {
    return new Response(JSON.stringify({ ok: false, error: 'consent' }), { status: 400, headers });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('cf-connecting-ip') ?? 'unknown';
  const ipHash = await sha256(ip + (Deno.env.get('IP_SALT') ?? ''));

  // Rate limit: 5 per IP per hour.
  const { count: recent } = await supabase
    .from('web_leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', new Date(Date.now() - 3_600_000).toISOString());

  if ((recent ?? 0) >= 5) {
    return new Response(JSON.stringify({ ok: false, error: 'rate_limit' }), {
      status: 429, headers,
    });
  }

  // Same phone in the last 30 days: report success, do not duplicate the row.
  const { data: dupe } = await supabase
    .from('web_leads')
    .select('id')
    .eq('phone_number', phone)
    .gte('created_at', new Date(Date.now() - 30 * 86_400_000).toISOString())
    .limit(1)
    .maybeSingle();

  if (dupe) {
    return new Response(JSON.stringify({ ok: true, duplicate: true }), { headers });
  }

  // Read-only flag so the admin knows this number is already in the cold-call
  // pool. Nothing is ever written to `leads`.
  const { data: inPool } = await supabase
    .from('leads')
    .select('id')
    .eq('phone_number', phone)
    .limit(1)
    .maybeSingle();

  // Calculator fields stay null when the visitor skipped the calculator, so a
  // blank estimate is never mistaken for a real one.
  const usedCalculator = num(body.gajiPokok) !== null;
  const location = body.lokasi === 'luarBandar' ? 'luarBandar'
    : body.lokasi === 'bandar' ? 'bandar' : null;
  // The form's segmented control sends bpa_angkasa / potongan_terus.
  const deductionType = body.jenisPotongan === 'potongan_terus' ? 'direct'
    : body.jenisPotongan === 'bpa_angkasa' ? 'bpa' : null;

  const { error } = await supabase.from('web_leads').insert({
    full_name: fullName.slice(0, 80),
    phone_number: phone,
    email,
    employer_name: str(body.majikan, 120),
    age: usedCalculator ? num(body.umur) : null,
    location: usedCalculator ? location : null,
    gross_salary: num(body.gajiPokok),
    existing_commitment: num(body.jumlahPotongan),
    deduction_type: usedCalculator ? deductionType : null,
    tenure_years: usedCalculator ? num(body.tempoh) : null,
    estimated_low: num(body.estimatedLow),
    estimated_high: num(body.estimatedHigh),
    affordable_installment: num(body.ansuranMampu),
    already_in_pool: Boolean(inPool),
    lang: body.lang === 'en' ? 'en' : 'bm',
    source: 'landing_page_v1',
    utm_source: str(body.utm_source, 200),
    utm_medium: str(body.utm_medium, 200),
    utm_campaign: str(body.utm_campaign, 200),
    utm_content: str(body.utm_content, 200),
    ip_hash: ipHash,
    user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
  });

  if (error) {
    console.error('insert failed', error);
    return new Response(JSON.stringify({ ok: false, error: 'insert' }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
});
