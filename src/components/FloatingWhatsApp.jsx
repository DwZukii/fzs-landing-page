import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { WhatsAppGlyph } from './ui/Icon.jsx';
import WhatsAppLink from './ui/WhatsAppLink.jsx';

const SHOW_AFTER_PX = 400;

// Hidden while any text field is focused so it never covers the mobile keyboard
// (the phone field in the lead form in particular).
function isTypingTarget(el) {
  return el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !['checkbox', 'radio', 'range'].includes(el.type)));
}

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    const onFocusIn = (e) => setTyping(isTypingTarget(e.target));
    const onFocusOut = () => setTyping(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const visible = scrolled && !typing;

  return (
    <WhatsAppLink
      message={t('floatingWa.message')}
      aria-label={t('floatingWa.label')}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : 'true'}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(10,31,61,.25)] transition md:bottom-8 md:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </WhatsAppLink>
  );
}
