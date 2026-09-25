import { useLanguage } from '../i18n/LanguageContext.jsx';
import { SSM_NUMBER, WHATSAPP_DISPLAY } from '../lib/whatsapp.js';
import { Container } from './ui/Section.jsx';
import WhatsAppLink from './ui/WhatsAppLink.jsx';
import Wordmark from './Wordmark.jsx';

const sections = ['kalkulator', 'siapa', 'cara', 'dokumen', 'kenapa', 'faq', 'hubungi'];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-4 bg-navy-900 pb-24 pt-14 text-slate-300 md:pb-12 md:pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark dark className="text-xl" />
            <p className="mt-3 max-w-sm">{t('footer.tagline')}</p>
            <p className="mt-4 text-small">
              FZS SUCCESS · {t('footer.registration')}: {SSM_NUMBER}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-heading text-small font-semibold uppercase tracking-[0.12em] text-white">
                {t('footer.whatsapp')}
              </p>
              <WhatsAppLink className="mt-1 inline-block rounded text-white underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-400">
                {WHATSAPP_DISPLAY}
              </WhatsAppLink>
            </div>
            <div>
              <p className="font-heading text-small font-semibold uppercase tracking-[0.12em] text-white">
                {t('footer.hours')}
              </p>
              {/* TODO: confirm operating hours with client */}
              <p className="mt-1">{t('footer.hoursValue')}</p>
            </div>
          </div>

          <nav aria-label={t('footer.linksHeading')}>
            <p className="font-heading text-small font-semibold uppercase tracking-[0.12em] text-white">
              {t('footer.linksHeading')}
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {sections.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="rounded hover:text-white">
                    {t(`nav.menu.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Disclaimer: always visible, never collapsed */}
        <div className="mt-12 border-t border-navy-700 pt-8">
          <p className="text-small text-slate-300">{t('footer.disclaimer')}</p>
          <p className="mt-6 text-small text-slate-300">
            © {new Date().getFullYear()} FZS SUCCESS. {t('footer.rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
