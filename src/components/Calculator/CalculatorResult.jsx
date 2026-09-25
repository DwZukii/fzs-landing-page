import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { formatRM } from '../../lib/formatCurrency.js';
import Button from '../ui/Button.jsx';
import Icon, { WhatsAppGlyph } from '../ui/Icon.jsx';
import WhatsAppLink from '../ui/WhatsAppLink.jsx';

// Estimate only. Never shows rates, funder names, net cash or approval odds.
export default function CalculatorResult({ result }) {
  const { t } = useLanguage();

  if (!result.eligible) {
    const message = result.reason === 'AGE' ? t('result.age') : t('result.dsr');
    return (
      <div className="animate-slide-in rounded-card border border-slate-200 border-l-4 border-l-warn bg-white p-5 md:p-6">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-warn">
            <Icon name="alert" className="h-4 w-4" />
          </span>
          <p className="text-slate-900">{message}</p>
        </div>
        <Button as={WhatsAppLink} message={t('result.waMessage')} variant="whatsapp" className="mt-5 w-full sm:w-auto">
          <WhatsAppGlyph />
          {t('result.waCta')}
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-slide-in rounded-card bg-gold-100 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-heading text-small font-semibold uppercase tracking-[0.12em] text-navy-900">
          {t('result.label')}
        </p>
        <span className="rounded-full border border-navy-900/20 bg-white px-2.5 py-0.5 text-small font-semibold text-navy-900">
          {t('result.badge')}
        </span>
      </div>
      <p className="mt-2 font-heading text-[32px] font-bold leading-tight text-navy-900 tabular-nums min-[400px]:text-[36px] md:text-[48px]">
        <span className="whitespace-nowrap">{formatRM(result.low)}</span>
        <span className="px-2 font-semibold">–</span>
        <span className="whitespace-nowrap">{formatRM(result.high)}</span>
      </p>
      <p className="mt-1 font-medium text-navy-900">{t('result.tenure', { years: result.years })}</p>
      <p className="mt-4 border-t border-navy-900/10 pt-4 text-small text-slate-600">{t('result.caveat')}</p>
    </div>
  );
}
