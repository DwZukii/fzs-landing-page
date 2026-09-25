import { useLanguage } from '../i18n/LanguageContext.jsx';
import Card from './ui/Card.jsx';
import Icon from './ui/Icon.jsx';
import Section, { Eyebrow, H2 } from './ui/Section.jsx';

const icons = ['scale', 'phone', 'shield'];

// No invented statistics, media logos, review counts or testimonials here.
export default function WhyUs() {
  const { t } = useLanguage();
  const cards = t('why.cards');
  return (
    <Section id="kenapa" tone="alt">
      <div className="max-w-2xl">
        <Eyebrow>{t('why.eyebrow')}</Eyebrow>
        <H2>{t('why.heading')}</H2>
      </div>
      <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
        {cards.map((card, i) => (
          <Card as="li" key={i} className="relative !p-5 md:!p-7">
            {/* Mobile: icon sits beside the title instead of above it, which
                drops the empty band the absolute icon needed. */}
            <div className="flex items-center gap-3 md:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-navy-900 md:absolute md:right-5 md:top-5 md:h-11 md:w-11">
                <Icon name={icons[i]} className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              <h3 className="font-heading text-h3 font-semibold text-slate-900 md:mt-12 md:text-h3-lg">{card.title}</h3>
            </div>
            <p className="mt-2">{card.body}</p>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
