import { useLanguage } from '../i18n/LanguageContext.jsx';
import Icon from './ui/Icon.jsx';
import Section, { Eyebrow, H2 } from './ui/Section.jsx';

export default function Faq() {
  const { t } = useLanguage();
  const items = t('faq.items');
  return (
    <Section id="faq" tone="alt">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
          <H2>{t('faq.heading')}</H2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={i} className="group rounded-card border border-slate-200 bg-white open:shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card p-5 font-heading text-[16px] font-semibold text-slate-900 md:p-6 md:text-[18px]">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-navy-900 transition-transform group-open:rotate-180">
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 md:px-6 md:pb-6">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
