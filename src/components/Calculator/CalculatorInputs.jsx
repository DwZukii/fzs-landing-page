import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { formatDigitsInput } from '../../lib/formatCurrency.js';
import { LOAN_CONFIG as C } from '../../config/loanConfig.js';

function FieldError({ id, message }) {
  return (
    <p id={id} className="field-error" aria-live="polite">
      {message || ''}
    </p>
  );
}

function MoneyInput({ id, label, help, value, onChange, error }) {
  const helpId = `${id}-help`;
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-medium text-slate-600">
          RM
        </span>
        <input
          id={id}
          name={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="input-field pl-12 tabular-nums"
          value={value}
          onChange={(e) => onChange(formatDigitsInput(e.target.value))}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${helpId} ${errId}`}
        />
      </div>
      <p id={helpId} className="field-help">
        {help}
      </p>
      {error && <FieldError id={errId} message={error} />}
    </div>
  );
}

function Segmented({ name, legend, help, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="grid grid-cols-2 gap-1 rounded-input border border-slate-200 bg-sand-50 p-1">
        {options.map((opt) => (
          <label key={opt.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="peer sr-only"
            />
            <span className="flex min-h-[44px] items-center justify-center rounded-[9px] px-2 text-center text-small font-semibold text-slate-600 transition-colors peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500 md:text-[14px]">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {help && <p className="field-help">{help}</p>}
    </fieldset>
  );
}

export default function CalculatorInputs({ values, errors, maxTenure, onChange }) {
  const { t } = useLanguage();
  const errorText = (field) => {
    const key = errors[field];
    if (!key) return '';
    return t(`calc.errors.${key}`, {
      min: key === 'ageRange' ? C.MIN_AGE : C.MIN_SALARY.toLocaleString('en-MY'),
      max: C.MAX_AGE,
    });
  };

  const sliderMax = Math.max(C.MIN_TENURE_YEARS, maxTenure);
  const sliderDisabled = maxTenure < C.MIN_TENURE_YEARS;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
      <MoneyInput
        id="gajiPokok"
        label={t('calc.gajiPokok')}
        help={t('calc.gajiPokokHelp')}
        value={values.gajiPokok}
        onChange={(v) => onChange('gajiPokok', v)}
        error={errorText('gajiPokok')}
      />
      <MoneyInput
        id="jumlahPotongan"
        label={t('calc.jumlahPotongan')}
        help={t('calc.jumlahPotonganHelp')}
        value={values.jumlahPotongan}
        onChange={(v) => onChange('jumlahPotongan', v)}
        error={errorText('jumlahPotongan')}
      />

      <div>
        <label htmlFor="umur" className="field-label">
          {t('calc.umur')}
        </label>
        <div className="relative">
          <input
            id="umur"
            name="umur"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={2}
            className="input-field pr-16 tabular-nums"
            value={values.umur}
            onChange={(e) => onChange('umur', e.target.value.replace(/\D/g, '').slice(0, 2))}
            aria-invalid={errors.umur ? 'true' : 'false'}
            aria-describedby="umur-error"
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-600">
            {t('calc.umurSuffix')}
          </span>
        </div>
        {errors.umur && <FieldError id="umur-error" message={errorText('umur')} />}
      </div>

      <Segmented
        name="lokasi"
        legend={t('calc.lokasi')}
        help={t('calc.lokasiHelp')}
        value={values.lokasi}
        onChange={(v) => onChange('lokasi', v)}
        options={[
          { value: 'bandar', label: t('calc.lokasiBandar') },
          { value: 'luarBandar', label: t('calc.lokasiLuarBandar') },
        ]}
      />

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="tempoh" className="field-label">
            {t('calc.tempoh')}
          </label>
          <span className="font-heading text-body-lg font-bold text-navy-900 tabular-nums" aria-hidden="true">
            {t('calc.tempohValue', { n: values.tempoh })}
          </span>
        </div>
        <input
          id="tempoh"
          name="tempoh"
          type="range"
          min={C.MIN_TENURE_YEARS}
          max={sliderMax}
          step={1}
          value={Math.min(values.tempoh, sliderMax)}
          disabled={sliderDisabled}
          onChange={(e) => onChange('tempoh', Number(e.target.value))}
          aria-valuetext={t('calc.tempohValue', { n: values.tempoh })}
          className="mt-3 h-2 w-full cursor-pointer accent-gold-500 disabled:cursor-not-allowed"
        />
        <div className="mt-1 flex justify-between text-small text-slate-600 tabular-nums" aria-hidden="true">
          <span>{C.MIN_TENURE_YEARS}</span>
          <span>{sliderMax}</span>
        </div>
        {maxTenure < C.MAX_TENURE_YEARS && !sliderDisabled && (
          <p className="field-help">{t('calc.tempohMaxNote', { n: maxTenure })}</p>
        )}
      </div>

      <Segmented
        name="jenisPotongan"
        legend={t('calc.jenisPotongan')}
        value={values.jenisPotongan}
        onChange={(v) => onChange('jenisPotongan', v)}
        options={[
          { value: 'bpa_angkasa', label: t('calc.jenisBpa') },
          { value: 'potongan_terus', label: t('calc.jenisTerus') },
        ]}
      />
    </div>
  );
}
