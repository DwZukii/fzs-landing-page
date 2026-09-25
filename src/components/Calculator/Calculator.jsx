import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { LOAN_CONFIG as C } from '../../config/loanConfig.js';
import { calculateEligibility, maxTenureForAge, validateInputs } from '../../lib/calculateEligibility.js';
import { parseDigits } from '../../lib/formatCurrency.js';
import { trackCustom } from '../../lib/tracking.js';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import CalculatorInputs from './CalculatorInputs.jsx';
import CalculatorResult from './CalculatorResult.jsx';

function toNumbers(values) {
  return {
    gajiPokok: parseDigits(values.gajiPokok),
    jumlahPotongan: parseDigits(values.jumlahPotongan),
    umur: values.umur === '' ? NaN : Number(values.umur),
    lokasi: values.lokasi,
    tempoh: values.tempoh,
    jenisPotongan: values.jenisPotongan,
  };
}

// Optional widget. Collapsed by default so the lead form above stays the focus.
// `onResult` hands the figures to the parent so they travel with the lead.
export default function Calculator({ onResult }) {
  const { t } = useLanguage();
  const [values, setValues] = useState({
    gajiPokok: '',
    jumlahPotongan: '',
    umur: '',
    lokasi: 'bandar',
    tempoh: C.DEFAULT_TENURE_YEARS,
    jenisPotongan: 'bpa_angkasa',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Last valid calculation. Kept while an input is mid-edit and temporarily
  // invalid, so the result panel doesn't flicker away as the user retypes.
  const [payload, setPayload] = useState(null);
  const resultRef = useRef(null);

  const numbers = toNumbers(values);
  const ageValid = Number.isFinite(numbers.umur) && numbers.umur >= C.MIN_AGE && numbers.umur <= C.MAX_AGE;
  const maxTenure = ageValid ? maxTenureForAge(numbers.umur) : C.MAX_TENURE_YEARS;

  useEffect(() => {
    if (!submitted) {
      setPayload(null);
      onResult?.(null);
      return;
    }
    if (Object.keys(validateInputs(numbers)).length) return; // keep the last valid one
    const result = calculateEligibility({ ...numbers, tempoh: Math.min(numbers.tempoh, maxTenure) });
    const next = { ...numbers, tempoh: result.years ?? numbers.tempoh, result };
    setPayload(next);
    onResult?.(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, values]);

  function handleChange(field, value) {
    setValues((v) => {
      const next = { ...v, [field]: value };
      if (field === 'umur') {
        const age = Number(value);
        if (value !== '' && age >= C.MIN_AGE && age <= C.MAX_AGE) {
          const max = maxTenureForAge(age);
          // Keep the slider at the top when age lowers the ceiling.
          if (next.tempoh > max || v.tempoh === Math.max(C.MIN_TENURE_YEARS, maxTenure)) {
            next.tempoh = Math.max(C.MIN_TENURE_YEARS, max);
          }
        }
      }
      return next;
    });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleCalculate(e) {
    e.preventDefault();
    const found = validateInputs(numbers);
    setErrors(found);
    if (Object.keys(found).length) {
      setSubmitted(false);
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setSubmitted(true);
    const r = calculateEligibility({ ...numbers, tempoh: Math.min(numbers.tempoh, maxTenure) });
    trackCustom('CalculatorCompleted', { eligible: r.eligible, reason: r.reason || null });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  const hasErrors = Object.values(errors).some(Boolean);
  const result = payload?.result;

  return (
    <details className="group mt-5 rounded-card border border-slate-200 bg-white shadow-card">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-card p-5 md:p-6">
        <span className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-navy-900">
            <Icon name="calculator" className="h-5 w-5" />
          </span>
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-h3 font-semibold text-slate-900">{t('calc.toggleTitle')}</span>
              <span className="rounded-full bg-sand-100 px-2 py-0.5 text-small font-semibold text-slate-600">
                {t('calc.optional')}
              </span>
            </span>
            <span className="mt-1 block text-small text-slate-600">{t('calc.toggleSub')}</span>
          </span>
        </span>
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-navy-900 transition-transform group-open:rotate-180">
          <Icon name="chevronDown" className="h-4 w-4" />
        </span>
      </summary>

      <div className="border-t border-slate-200 p-5 md:p-7">
        <p className="mb-6 text-small text-slate-600">{t('calc.intro')}</p>
        <form onSubmit={handleCalculate} noValidate>
          <CalculatorInputs values={values} errors={errors} maxTenure={maxTenure} onChange={handleChange} />
          <p className="sr-only" aria-live="polite">
            {hasErrors ? t('calc.errors.summary') : ''}
          </p>
          <Button type="submit" size="lg" className="mt-8 w-full">
            {t('calc.submit')}
          </Button>
        </form>

        <div ref={resultRef} className="scroll-mt-24" aria-live="polite">
          {result && (
            <div className="mt-6">
              <CalculatorResult result={result} />
            </div>
          )}
        </div>
      </div>
    </details>
  );
}
