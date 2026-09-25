import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './ui/Button.jsx';
import DarkPanel from './ui/DarkPanel.jsx';
import { WhatsAppGlyph } from './ui/Icon.jsx';
import Squiggle from './ui/Squiggle.jsx';
import WhatsAppLink from './ui/WhatsAppLink.jsx';

export default function FinalCta() {
  const { t } = useLanguage();
  const stats = t('final.stats');
  return (
    <DarkPanel id="hubungi" className="pb-4">
      <Squiggle shape="burst" className="left-10 top-10 h-14 w-14" />
      <Squiggle shape="loop" className="bottom-10 right-12 h-14 w-16" />
      <div className="mx-auto max-w-3xl px-6 py-14 text-center md:py-24">
        <h2 className="font-heading text-h2 font-semibold text-white md:text-h2-lg">{t('final.heading')}</h2>
        <p className="mt-3 text-slate-300">{t('final.line')}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button as="a" href="#kalkulator" size="lg">
            {t('final.primary')}
          </Button>
          <Button as={WhatsAppLink} message={t('final.waMessage')} variant="outlineLight" size="lg">
            <WhatsAppGlyph />
            {t('final.secondary')}
          </Button>
        </div>
        <dl className="mx-auto mt-12 grid max-w-md grid-cols-2 divide-x divide-navy-700">
          {stats.map((s) => (
            <div key={s.value} className="px-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading whitespace-nowrap text-[28px] font-bold leading-none text-gold-500 md:text-[44px]">{s.value}</dd>
              <dd className="mt-2 text-small text-slate-300">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DarkPanel>
  );
}
