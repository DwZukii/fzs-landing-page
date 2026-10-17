import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './ui/Button.jsx';
import DarkPanel, { PanelContainer } from './ui/DarkPanel.jsx';
import Icon from './ui/Icon.jsx';
import { Eyebrow, H2 } from './ui/Section.jsx';
import Squiggle from './ui/Squiggle.jsx';

const STEP_MS = 4000;
const stepIcons = ['calculator', 'search', 'document', 'bank'];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = t('how.steps');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, paused, reducedMotion, steps.length]);

  const current = steps[active];

  return (
    <DarkPanel id="cara">
      <Squiggle shape="squiggle" className="right-12 top-10 h-8 w-20" />
      <PanelContainer className="py-14 md:py-24">
        <Eyebrow dark>{t('how.eyebrow')}</Eyebrow>
        <H2 dark>{t('how.heading')}</H2>

        <div
          className="mt-8 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ol className="space-y-2">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`flex w-full items-start gap-4 rounded-card p-3 text-left transition-colors md:p-4 ${
                      isActive ? 'bg-navy-800' : 'hover:bg-navy-800/60'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-heading font-bold transition-colors ${
                        isActive
                          ? 'border-gold-500 bg-gold-500 text-navy-900'
                          : 'border-slate-300/50 text-slate-300/70'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                      <span className="block font-heading text-h3 font-semibold text-white md:text-h3-lg">{step.title}</span>
                      {/* Titles carry the meaning on mobile; the detail is desktop-only. */}
                      <span className="mt-1 hidden text-slate-300 md:block">{step.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Illustrated card reflecting the active step */}
          <div className="relative hidden md:block" aria-hidden="true">
            <Squiggle shape="dots" className="-right-3 -top-6 h-8 w-14" />
            <div key={active} className="animate-fade-in rounded-card bg-white p-8 text-slate-600 shadow-card">
              <div className="flex items-center justify-between">
                <span className="font-heading text-small font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {t('how.stepLabel', { n: active + 1 })}
                </span>
                <span className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-gold-500' : 'w-1.5 bg-slate-200'}`}
                    />
                  ))}
                </span>
              </div>
              <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-[24px] bg-gold-100 text-navy-900">
                <Icon name={stepIcons[active]} className="h-12 w-12" strokeWidth={1.6} />
              </div>
              <p className="mt-6 font-heading text-h3-lg font-semibold text-slate-900">{current.title}</p>
              <p className="mt-2">{current.body}</p>
              <div className="mt-6 space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-sand-100" />
                <div className="h-2 w-1/2 rounded-full bg-sand-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-navy-700 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <p className="font-heading text-h3 font-semibold text-white md:text-h3-lg">{t('how.bottomLine')}</p>
          <Button as="a" href="#kalkulator">
            {t('how.bottomCta')}
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
        </div>
      </PanelContainer>
    </DarkPanel>
  );
}
