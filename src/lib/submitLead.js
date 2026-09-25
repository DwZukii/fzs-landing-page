// Posts a lead to the submit-lead Supabase Edge Function, which validates it
// server-side and writes to public.web_leads using the service role.
//
// The page holds no database credential: the function is the only write path
// into web_leads, and the table has no INSERT policy at all.

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT;

export const MIN_TIME_ON_PAGE_MS = 4_000;

const RATE_LIMIT_KEY = 'fzs_last_submit';
const RATE_LIMIT_MS = 60_000;

export function isRateLimited(now = Date.now()) {
  try {
    return now - Number(sessionStorage.getItem(RATE_LIMIT_KEY) || 0) < RATE_LIMIT_MS;
  } catch {
    return false;
  }
}

function markSubmitted(now = Date.now()) {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, String(now));
  } catch {
    // best effort — the function rate-limits by IP server-side as well
  }
}

// Server error codes -> what the visitor reads. Anything unmapped falls back to
// the generic message, which always points at WhatsApp so a failed submission
// is never a dead end.
const MESSAGES = {
  bm: {
    name: 'Sila masukkan nama penuh anda.',
    phone: 'Nombor telefon tidak sah. Sila semak semula.',
    email: 'Alamat e-mel tidak sah. Sila semak semula.',
    consent: 'Sila tandakan kotak persetujuan.',
    rate_limit: 'Terlalu banyak permintaan. Sila cuba lagi sebentar nanti.',
    origin: 'Maaf, ada masalah teknikal. Sila WhatsApp kami terus.',
    generic: 'Maaf, ada masalah teknikal. Sila WhatsApp kami terus.',
  },
  en: {
    name: 'Please enter your full name.',
    phone: 'That mobile number is not valid. Please check it again.',
    email: 'That email address is not valid. Please check it again.',
    consent: 'Please tick the consent box.',
    rate_limit: 'Too many requests. Please try again in a moment.',
    origin: 'Sorry, something went wrong on our side. Please WhatsApp us instead.',
    generic: 'Sorry, something went wrong on our side. Please WhatsApp us instead.',
  },
};

// Throws an Error carrying a ready-to-display message. Callers show it inline
// and keep the WhatsApp button visible.
export async function submitLead(payload, { honeypot, mountedAt, lang = 'bm' } = {}) {
  const copy = MESSAGES[lang] || MESSAGES.bm;

  // Client-side bot checks. Both are mirrored server-side; these just avoid a
  // pointless round trip.
  if (honeypot) return { ok: true, skipped: 'honeypot' };
  if (mountedAt && Date.now() - mountedAt < MIN_TIME_ON_PAGE_MS) {
    return { ok: true, skipped: 'too_fast' };
  }

  if (!ENDPOINT) {
    console.warn('[lead] VITE_LEAD_ENDPOINT is not set; lead not sent.', payload);
    throw new Error(copy.generic);
  }

  if (isRateLimited()) throw new Error(copy.rate_limit);

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Network down, DNS, CORS rejection — nothing came back at all.
    console.warn('[lead] request failed', err);
    throw new Error(copy.generic);
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON body — fall through to the status check */
  }

  if (!res.ok || !data.ok) {
    console.warn('[lead] rejected', res.status, data);
    throw new Error(copy[data.error] ?? copy.generic);
  }

  markSubmitted();
  return data; // { ok: true } or { ok: true, duplicate: true }
}
