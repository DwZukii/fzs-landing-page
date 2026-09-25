# FZS Success — Landing Page

Single-page marketing site for FZS Success (SSM 202303129497), a financing
**consultancy** (not a lender) for Malaysian civil servants. Its one job: turn
Meta Ads traffic into a phone number in a Google Sheet.

Stack: Vite + React 18 (JS) + Tailwind CSS v3. No router, no UI/animation
libraries. Deploy target: Vercel.

## Commands

```bash
npm install
npm run dev        # local dev server
npm test           # unit tests (node:test — no extra dependency)
npm run build      # i18n key check + production build to dist/
npm run preview    # serve the production build
```

`npm run build` runs `scripts/check-i18n.js` first and fails if the `bm` and
`en` key sets in `src/i18n/copy.js` diverge.

## Environment variables

Copy `.env.example` to `.env` (never commit `.env`). Set the same values in
Vercel → Project → Settings → Environment Variables.

| Variable | Purpose |
|---|---|
| `VITE_LEAD_ENDPOINT` | `submit-lead` Supabase Edge Function URL |
| `VITE_META_PIXEL_ID` | Meta Pixel ID (digits). Pixel is skipped when unset. |

## Where things live

| What | File |
|---|---|
| Every calculator number | `src/config/loanConfig.js` — never hardcode figures in components |
| Eligibility maths (pure) | `src/lib/calculateEligibility.js` + `.test.js` |
| All copy, BM + EN | `src/i18n/copy.js` |
| Lead form + optional calculator | `src/components/LeadSection.jsx` (owns `#kalkulator`) |
| Lead submission, anti-spam | `src/lib/submitLead.js`, `src/components/Calculator/LeadForm.jsx` |
| Pixel + UTM capture | `index.html`, `src/lib/tracking.js` |
| Lead endpoint (server) | `supabase/functions/submit-lead/index.ts` |

## Lead capture — Supabase

Leads go to `public.web_leads` in the **TeleManager** Supabase project
(`zzxlgfffbgiexecfxbmd`), a table kept deliberately separate from the 3.17M-row
`leads` cold-call pool and from `customers`.

```
Landing page ──POST──> submit-lead Edge Function ──> web_leads ──> Tele Manager
                       (service role: validates,        (RLS: super_admin only)
                        dedupes, rate-limits)
```

The page holds **no database credential**. `web_leads` has no INSERT policy at
all, so the edge function's service role is the only write path — the form
cannot be bypassed and the table cannot be spammed with the anon key.

### What the function enforces

| Check | Behaviour |
|---|---|
| Origin allow-list | 403 when `ALLOWED_ORIGINS` is set and the origin is not on it |
| Honeypot `company` | returns `{ ok: true }`, stores nothing |
| Name / phone / email / consent | 400 with a field code |
| Rate limit | 5 per IP (salted SHA-256 hash) per hour → 429 |
| Duplicate phone within 30 days | returns `{ ok: true, duplicate: true }`, no second row |
| `already_in_pool` | read-only flag if the number already exists in `leads`; nothing is written to `leads` |

### Redeploying it

```bash
npx supabase functions deploy submit-lead --project-ref zzxlgfffbgiexecfxbmd --no-verify-jwt
```

`verify_jwt` must stay off — the caller is an anonymous browser.
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.
`IP_SALT` is already set. **`ALLOWED_ORIGINS` is not yet set** — see open item 16.

```bash
npx supabase secrets set ALLOWED_ORIGINS="https://<real-domain>" --project-ref zzxlgfffbgiexecfxbmd
```

### Viewing leads

Tele Manager → **Web Leads** (sidebar, "Landing Page" section). Visible only to
`super_admin`; RLS returns zero rows to everyone else.

## Anti-spam

- Honeypot field `company` (off-screen, not `display:none`). Filled → success
  shown, nothing sent.
- Submissions under 4 s after the form mounts are silently dropped.
- One submission per 60 s per browser session.

## Tracking (Meta Pixel)

| Event | When |
|---|---|
| `PageView` | page load |
| `CalculatorCompleted` (custom) | user presses *Kira Anggaran* with valid inputs |
| `Lead` | lead form submitted and sent |
| `Contact` | any WhatsApp link clicked |

No other third-party scripts. Keep it that way — every script costs load time
on 4G.

## Compliance guardrails (do not break in future edits)

- Never promise approval ("lulus", "jamin", "approved").
- Never name a bank or koperasi, or show a rate, a lender comparison or a net
  cash figure. `RATE_LOW/HIGH` in the config are used for maths only.
- The full footer disclaimer ("... bukan sebuah bank atau pemberi pinjaman
  berlesen ...") must stay visible and uncollapsed. The shorter standalone line
  "Kami bukan bank atau pemberi pinjaman." was removed at the client's request
  — see open item 13.
- No government logos or imagery.
- Do not collect IC numbers, payslips or bank details on this page.
- Every calculator output is labelled *Anggaran / Estimate*.

## Open items — need client answers before launch

These are marked `TODO` in the code. Nothing below has been guessed.

1. **Max tenure conflict** — bank worksheet says 10 years, internal tool priced
   15. Currently `MAX_TENURE_YEARS: 10`.
2. Whether the **sara hidup** (cost-of-living) test applies across the whole
   panel or only one product.
3. Real **`MAX_FINANCING`** ceiling (currently RM250,000).
4. **Minimum years of service** — not modelled at all in v1.
5. **Operating hours** for the footer (currently "Akan dimaklumkan").
6. **Real consultant photo** for the hero. Currently an Unsplash stock photo
   (`public/consultant.webp`, free for commercial use, no attribution needed).
   The trust strip claims "Perunding sebenar", so a genuine face is worth more.
   The photo is hidden below `md` to keep the CTA above the fold on mobile.
7. **Logo file** (currently a text wordmark in `src/components/Wordmark.jsx`).
8. **Domain name** — do not ship ads to a `*.vercel.app` URL; it reads as a
   scam and will hurt conversion.
9. Whether **`OPTIMISM_HAIRCUT` 0.90** is right or should be tighter.
10. **OG image** (1200×630) and `og:url` once the domain is set.
11. With `MAX_AGE: 58` and `MAX_AGE_AT_MATURITY: 60`, age validation blocks
    anyone who would hit the `AGE` result, so that message is currently
    unreachable from the UI (it is still tested). Confirm whether applicants
    aged 59+ should be allowed through to see the "contact us" path instead.
12. The worked example quotes sara-hidup baki as 3290.36; exact arithmetic
    gives 3290.37. Doesn't affect the result (DSR binds) but worth confirming
    the worksheet's rounding.
13. **Removed disclaimer line.** The standalone "Kami bukan bank atau pemberi
    pinjaman." was removed from the calculator result and the footer at the
    client's request. The original brief listed it as a hard requirement in
    both places. The full legal disclaimer paragraph still stands in the
    footer. Worth a second opinion before the Meta Ads review.
14. ~~Public + private sector wording.~~ Done — hero H1, page title, meta
    description, OG tags, footer tagline, "who we help" cards and the FAQ all
    now cover kerajaan and swasta.
15. **Email is a required field.** Every extra required field costs conversions
    on paid traffic. Consider making it optional if lead volume drops.
16. **`ALLOWED_ORIGINS` is not set on the edge function.** Until it is, the
    function accepts a POST from any origin. The rate limit, honeypot,
    validation and dedupe still apply, and CORS never stops `curl` anyway — but
    set it the moment the domain is decided (open item 8):
    ```bash
    npx supabase secrets set ALLOWED_ORIGINS="https://<domain>" --project-ref zzxlgfffbgiexecfxbmd
    ```
17. **The integration brief predates two form changes.** It specified a
    `department` column and no email field. The live form collects "Nama
    Majikan" and an email address, so the table uses `employer_name` and adds
    `email`. Confirm the naming is what you want before anyone builds reports
    on it.
18. **Notification on arrival** (brief open item 5). Volume will be low, and
    response speed is the main thing that converts inbound enquiries. Worth
    adding a WhatsApp or email ping to the admin.
19. **Retention policy** for `web_leads` rows that never convert.
20. `check_duplicate_phones(text[])` already exists in the project. The edge
    function uses its own single-phone lookup against `leads` instead; consider
    reusing the RPC if the signature suits (brief open item 4).
