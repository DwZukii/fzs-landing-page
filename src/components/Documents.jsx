import { useLanguage } from '../i18n/LanguageContext.jsx';
import Icon from './ui/Icon.jsx';
import Section, { Eyebrow, H2 } from './ui/Section.jsx';

export default function Documents() {
  const { t } = useLanguage();
  const items = t('docs.items');
  return (
    <Section id="dokumen">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <Eyebrow>{t('docs.eyebrow')}</Eyebrow>
          <H2>{t('docs.heading')}</H2>
        </div>
        <div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-card border border-slate-200 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900">
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="font-medium text-slate-900">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-small text-slate-600">{t('docs.note')}</p>
        </div>
      </div>
    </Section>
  );
}
