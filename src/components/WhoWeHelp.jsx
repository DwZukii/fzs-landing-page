import { useLanguage } from '../i18n/LanguageContext.jsx';
import Card from './ui/Card.jsx';
import Icon from './ui/Icon.jsx';
import Section, { Eyebrow, H2 } from './ui/Section.jsx';

const icons = ['bank', 'briefcase', 'building', 'heart'];

export default function WhoWeHelp() {
  const { t } = useLanguage();
  const cards = t('who.cards');
  return (
    <Section id="siapa" tone="alt">
      <div className="max-w-2xl">
        <Eyebrow>{t('who.eyebrow')}</Eyebrow>
        <H2>{t('who.heading')}</H2>
      </div>
      <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card as="li" key={i} className="relative flex flex-col">
            <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-navy-900">
              <Icon name={icons[i]} className="h-5 w-5" />
            </span>
            <h3 className="mt-12 font-heading text-h3 font-semibold text-slate-900 md:text-h3-lg">{card.title}</h3>
            <p className="mt-2 flex-1">{card.body}</p>
            <a
              href="#kalkulator"
              className="mt-5 inline-flex items-center gap-1.5 self-start rounded font-heading text-small font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:decoration-navy-900 md:text-[14px]"
            >
              {t('who.link')}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
