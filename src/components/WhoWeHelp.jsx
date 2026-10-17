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
      {/* max-w-3xl: at 2xl the 38px heading wrapped to leave "swasta" alone. */}
      <div className="max-w-3xl">
        <Eyebrow>{t('who.eyebrow')}</Eyebrow>
        <H2>{t('who.heading')}</H2>
      </div>
      {/* Mobile: a compact 2x2 grid of icon + title. The descriptions and
          per-card links only appear from md, where there is room for them. */}
      <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-6 xl:grid-cols-4">
        {cards.map((card, i) => (
          <Card as="li" key={i} className="relative flex flex-col !p-4 md:!p-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 text-navy-900 md:absolute md:right-5 md:top-5 md:h-11 md:w-11">
              <Icon name={icons[i]} className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <h3 className="mt-3 font-heading text-[15px] font-semibold leading-snug text-slate-900 md:mt-12 md:text-h3-lg xl:min-h-[2.6em]">
              {card.title}
            </h3>
            <p className="mt-2 hidden flex-1 md:block">{card.body}</p>
            <a
              href="#kalkulator"
              className="mt-5 hidden items-center gap-1.5 self-start rounded font-heading text-small font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:decoration-navy-900 md:inline-flex md:text-[14px]"
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
