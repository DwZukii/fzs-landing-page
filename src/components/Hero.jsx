import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './ui/Button.jsx';
import DarkPanel from './ui/DarkPanel.jsx';
import Icon from './ui/Icon.jsx';
import Squiggle from './ui/Squiggle.jsx';
import TrustStrip from './TrustStrip.jsx';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <DarkPanel id="hero" className="pt-1">
      <div className="mx-auto grid max-w-content items-center gap-10 px-5 pb-10 pt-10 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:pb-14 md:pt-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-800 px-3 py-1 text-small font-medium text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="font-heading text-h1 font-extrabold text-white md:text-h1-lg">{t('hero.headline')}</h1>
          <p className="mt-4 max-w-xl text-body text-slate-300 md:mt-5 md:text-[18px] md:leading-relaxed">
            {t('hero.sub')}
          </p>
          <div className="mt-7 md:mt-8">
            <Button as="a" href="#kalkulator" size="lg" className="w-full sm:w-auto">
              {t('hero.cta')}
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <p className="mt-3 text-small text-slate-300">{t('hero.reassurance')}</p>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Squiggle shape="burst" className="-left-8 -top-6 h-16 w-16" />
          <Squiggle shape="squiggle" className="-right-4 top-10 h-8 w-20" />
          <Squiggle shape="dots" className="-bottom-4 left-4 h-8 w-14" />
          {/* Stock photo from Unsplash (free for commercial use, no attribution required).
              TODO: replace with a real photo of an FZS consultant — the trust strip claims
              "Perunding sebenar", so a genuine face is worth more than stock here. */}
          <picture>
            <source srcSet="/consultant.webp" type="image/webp" />
            <img
              src="/consultant.jpg"
              alt={t('hero.photoAlt')}
              width={800}
              height={1000}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="relative mx-auto aspect-[4/5] w-full max-w-[400px] rounded-[24px] object-cover shadow-[0_18px_48px_rgba(0,0,0,.28)]"
            />
          </picture>
        </div>
      </div>
      <TrustStrip />
    </DarkPanel>
  );
}
