import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './ui/Button.jsx';
import Wordmark from './Wordmark.jsx';

function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const option = (value, label) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`rounded-full px-2.5 py-1 text-small font-semibold transition-colors ${
        lang === value ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-navy-900'
      }`}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label={t('nav.langLabel')} className="flex items-center rounded-full border border-slate-200 bg-white p-0.5">
      {option('bm', 'BM')}
      {option('en', 'EN')}
    </div>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${scrolled ? 'bg-sand-50/95 shadow-header backdrop-blur' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-3 px-4 md:h-[72px] md:px-8">
        <a href="#top" className="shrink-0 rounded-md text-[15px] min-[390px]:text-[17px] md:text-lg" aria-label="FZS Success">
          <Wordmark />
        </a>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageToggle />
          <Button as="a" href="#kalkulator" size="sm" className="whitespace-nowrap" aria-label={t('nav.cta')}>
            <span className="min-[400px]:hidden" aria-hidden="true">{t('nav.ctaShort')}</span>
            <span className="hidden min-[400px]:inline" aria-hidden="true">{t('nav.cta')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
