import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { normalisePhone } from '../../lib/normalisePhone.js';
import { submitLead } from '../../lib/submitLead.js';
import { getUtm, track } from '../../lib/tracking.js';
import Button from '../ui/Button.jsx';
import { WhatsAppGlyph } from '../ui/Icon.jsx';
import WhatsAppLink from '../ui/WhatsAppLink.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ nama, telefon, emel, majikan }) {
  const errors = {};
  if (nama.trim().length < 3) errors.nama = 'nama';
  if (!normalisePhone(telefon)) errors.telefon = 'telefon';
  if (!EMAIL_RE.test(emel.trim())) errors.emel = 'emel';
  if (!majikan.trim()) errors.majikan = 'majikan';
  return errors;
}

// Calculator figures are optional — the form works on its own.
const num = (v) => (Number.isFinite(v) ? v : '');

function TextField({ id, label, help, value, onChange, error, ...props }) {
  const describedBy = [help && `${id}-help`, `${id}-error`].filter(Boolean).join(' ');
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        {...props}
      />
      {help && (
        <p id={`${id}-help`} className="field-help">
          {help}
        </p>
      )}
      <p id={`${id}-error`} className="field-error" aria-live="polite">
        {error || ''}
      </p>
    </div>
  );
}

export default function LeadForm({ calc }) {
  const { t, lang } = useLanguage();
  const mountedAt = useRef(Date.now());
  const [fields, setFields] = useState({
    nama: '',
    telefon: '',
    emel: '',
    majikan: '',
    consent: false,
    company: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [submitError, setSubmitError] = useState('');
  const successRef = useRef(null);

  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  const set = (key) => (value) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    if (!fields.consent) return;

    setStatus('sending');
    setSubmitError('');
    const utm = getUtm();
    const c = calc || {};
    const payload = {
      nama: fields.nama.trim(),
      telefon: normalisePhone(fields.telefon),
      emel: fields.emel.trim(),
      majikan: fields.majikan.trim(),
      gajiPokok: num(c.gajiPokok),
      jumlahPotongan: num(c.jumlahPotongan),
      umur: num(c.umur),
      lokasi: c.lokasi || '',
      tempoh: num(c.tempoh),
      jenisPotongan: c.jenisPotongan || '',
      estimatedLow: c.result?.eligible ? c.result.low : '',
      estimatedHigh: c.result?.eligible ? c.result.high : '',
      ansuranMampu: Number.isFinite(c.result?.ansuranMampu) ? Math.round(c.result.ansuranMampu) : '',
      // The edge function requires this explicitly; the submit button is
      // disabled until the box is ticked, so it is always true here.
      consent: true,
      lang,
      source: 'landing_page_v1',
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
    };

    try {
      const result = await submitLead(payload, {
        honeypot: fields.company,
        mountedAt: mountedAt.current,
        lang,
      });
      // Bot submissions are dropped silently but still see the success state.
      if (!result.skipped) track('Lead');
      setStatus('done');
    } catch (err) {
      setSubmitError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'done') {
    const nama = fields.nama.trim();
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="animate-slide-in rounded-card border border-slate-200 bg-white p-6 text-center shadow-card focus:outline-none md:p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-positive text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 font-heading text-h3 font-semibold text-slate-900 md:text-h3-lg">
          {t('success.heading', { nama })}
        </h3>
        <p className="mt-2">{t('success.body', { telefon: fields.telefon.trim() })}</p>
        <p className="mt-5 font-medium text-slate-900">{t('success.faster')}</p>
        <Button
          as={WhatsAppLink}
          message={t('success.waMessage', { nama })}
          variant="whatsapp"
          className="mt-3 w-full sm:w-auto"
        >
          <WhatsAppGlyph />
          {t('success.waCta')}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-card border border-slate-200 bg-white p-5 shadow-card md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="nama"
          label={t('lead.nama')}
          value={fields.nama}
          onChange={set('nama')}
          error={errors.nama && t('lead.errors.nama')}
          autoComplete="name"
          maxLength={80}
        />
        <TextField
          id="telefon"
          label={t('lead.telefon')}
          help={t('lead.telefonHelp')}
          value={fields.telefon}
          onChange={set('telefon')}
          error={errors.telefon && t('lead.errors.telefon')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
        />
        <TextField
          id="emel"
          label={t('lead.emel')}
          help={t('lead.emelHelp')}
          value={fields.emel}
          onChange={set('emel')}
          error={errors.emel && t('lead.errors.emel')}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={120}
        />
        <TextField
          id="majikan"
          label={t('lead.majikan')}
          help={t('lead.majikanHelp')}
          value={fields.majikan}
          onChange={set('majikan')}
          error={errors.majikan && t('lead.errors.majikan')}
          autoComplete="organization"
          maxLength={120}
        />
      </div>

      {/* Honeypot — real users never see or fill this */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company">{t('lead.honeypot')}</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={(e) => set('company')(e.target.value)}
        />
      </div>

      <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-input bg-sand-50 p-4">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(e) => set('consent')(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-navy-900"
        />
        <span className="text-small text-slate-900 md:text-[14px]">{t('lead.consent')}</span>
      </label>

      {/* A failed submission must never be a dead end — always offer WhatsApp. */}
      {submitError && (
        <div role="alert" className="mt-5 rounded-input border border-warn/40 bg-warn/5 p-4 text-center">
          <p className="text-small font-semibold text-warn">{submitError}</p>
          <Button
            as={WhatsAppLink}
            message={t('lead.altMessage')}
            variant="whatsapp"
            size="sm"
            className="mt-3 w-full sm:w-auto"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            {t('lead.altCta')}
          </Button>
        </div>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={!fields.consent || status === 'sending'}>
        {status === 'sending' ? t('lead.sending') : t('lead.submit')}
      </Button>
      <p className="mt-3 text-center text-small text-slate-600">{t('lead.privacy')}</p>
    </form>
  );
}
