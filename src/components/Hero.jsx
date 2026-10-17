import { Fragment } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './ui/Button.jsx';
import DarkPanel, { PanelContainer } from './ui/DarkPanel.jsx';
import Icon from './ui/Icon.jsx';
import Squiggle from './ui/Squiggle.jsx';
import TrustStrip from './TrustStrip.jsx';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <DarkPanel id="hero" className="pt-1">
      {/* Two columns only from lg. The photo column is fixed rather than a
          fraction: measured in DM Sans 600, "Penjawat Awam & Swasta" needs 563px
          at 48px, and a 1.1fr/0.9fr split left only 552px, stranding "Swasta" on
          a third line.
          - xl: 380px photo + 64 gap leaves 600px of the 1044px column for 48px.
          - lg: the headline is 40px (needs 469px). At 1024 with a scrollbar the
            column is ~913px, so a 380px photo left 469 exactly and it still
            wrapped; 340px leaves ~509. */}
      <PanelContainer className="grid items-center gap-8 pb-10 pt-10 md:gap-10 md:pb-14 md:pt-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:py-12 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h1 className="font-heading text-h1 font-semibold text-white md:text-[40px] xl:text-h1-lg">
            {/* One block per phrase. The space between them is kept so screen
                readers don't hear "PeribadiPenjawat" as one word. */}
            {t('hero.headline').split('\n').map((phrase, i) => (
              <Fragment key={phrase}>
                {i > 0 && ' '}
                <span className="block">{phrase}</span>
              </Fragment>
            ))}
          </h1>
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
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <Squiggle shape="burst" from="lg" className="-left-8 -top-6 h-16 w-16" />
          {/* The photo now fills its column exactly, so this sits further out to
              stay visible; xl only, as below 1280px the panel edge would clip it. */}
          <Squiggle shape="squiggle" from="xl" className="-right-14 top-10 h-8 w-20" />
          <Squiggle shape="dots" from="lg" className="-bottom-4 left-4 h-8 w-14" />
          {/* Stock photo from Unsplash (free for commercial use, no attribution required).
              TODO: replace with a real photo of an FZS consultant — the trust strip claims
              "Perunding sebenar", so a genuine face is worth more than stock here.

              Art-directed, not CSS-cropped: each layout gets a file composed for its box.
              - Stacked (below lg): the original 3:2 landscape frame, uncropped. A tall
                photo at full width would push the form off the screen.
              - Side column (lg+): a square crop. The earlier 4:5 portrait stood 500px
                tall next to a ~320px text block, made the hero taller than a 672px
                laptop window and hid the trust strip below the fold. Square keeps the
                whole panel, trust strip included, on screen at 1338x672.
              width/height on each <source> lets the browser reserve the right box for
              whichever file it picks, so there is no layout shift either way. */}
          <picture>
            <source media="(min-width: 1024px)" type="image/webp" srcSet="/consultant-square.webp" width={760} height={760} />
            <source media="(min-width: 1024px)" srcSet="/consultant-square.jpg" width={760} height={760} />
            <source type="image/webp" srcSet="/consultant-wide.webp" width={1040} height={692} />
            <img
              src="/consultant-wide.jpg"
              alt={t('hero.photoAlt')}
              width={1040}
              height={692}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="relative aspect-[3/2] w-full rounded-[20px] object-cover shadow-[0_18px_48px_rgba(0,0,0,.28)] lg:aspect-square lg:rounded-[24px]"
            />
          </picture>
        </div>
      </PanelContainer>
      <TrustStrip />
    </DarkPanel>
  );
}
