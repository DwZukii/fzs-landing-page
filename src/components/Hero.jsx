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
      {/* Two columns only from lg. Splitting at md leaves the text column ~370px
          wide while the headline steps up to 48px, which wraps it to five lines
          on a tablet. */}
      <div className="mx-auto grid max-w-content items-center gap-8 px-5 pb-10 pt-10 md:gap-10 md:px-12 md:pb-14 md:pt-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-heading text-h1 font-extrabold text-white lg:text-h1-lg">{t('hero.headline')}</h1>
          <p className="mt-4 max-w-xl text-body text-slate-300 md:mt-5 md:text-[18px] md:leading-relaxed">
            {t('hero.sub')}
          </p>
          <div className="mt-7 md:mt-8">
            <Button as="a" href="#kalkulator" size="lg" className="w-full sm:w-auto">
              {t('hero.cta')}
              {/* Below 390px the label plus the arrow wraps to two lines, which
                  makes the primary CTA look broken. The label alone is clear. */}
              <Icon name="arrowRight" className="hidden h-5 w-5 min-[390px]:block" />
            </Button>
            {/* Hidden on mobile: the trust strip right below already says "no upfront fee". */}
            <p className="mt-3 hidden text-small text-slate-300 md:block">{t('hero.reassurance')}</p>
          </div>
        </div>

        {/* Second in the DOM, so on a single-column mobile layout the photo
            lands below the CTA and the call to action stays above the fold. */}
        <div className="relative">
          <Squiggle shape="burst" from="lg" className="-left-8 -top-6 h-16 w-16" />
          <Squiggle shape="squiggle" from="lg" className="-right-4 top-10 h-8 w-20" />
          <Squiggle shape="dots" from="lg" className="-bottom-4 left-4 h-8 w-14" />
          {/* Stock photo from Unsplash (free for commercial use, no attribution required).
              TODO: replace with a real photo of an FZS consultant — the trust strip claims
              "Perunding sebenar", so a genuine face is worth more than stock here.
              Landscape band while the hero is stacked (a 4:5 portrait at full width is a
              tower that pushes the form off the screen); portrait only at lg, where the
              photo becomes the side column. */}
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
              className="relative mx-auto aspect-[16/11] w-full max-w-[520px] rounded-[20px] object-cover object-top shadow-[0_18px_48px_rgba(0,0,0,.28)] lg:aspect-[4/5] lg:max-w-[400px] lg:rounded-[24px] lg:object-center"
            />
          </picture>
        </div>
      </div>
      <TrustStrip />
    </DarkPanel>
  );
}
