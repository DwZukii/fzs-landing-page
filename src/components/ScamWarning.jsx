import { useLanguage } from '../i18n/LanguageContext.jsx';
import { WHATSAPP_DISPLAY } from '../lib/whatsapp.js';
import Icon from './ui/Icon.jsx';
import { Container } from './ui/Section.jsx';
import WhatsAppLink from './ui/WhatsAppLink.jsx';

export default function ScamWarning() {
  const { t } = useLanguage();
  return (
    <section id="amaran" className="scroll-mt-20 py-14 md:py-24" aria-labelledby="amaran-heading">
      <Container>
        <div className="rounded-card border-l-[6px] border-warn bg-gold-100 p-6 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:gap-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warn text-white">
              <Icon name="alert" className="h-7 w-7" />
            </span>
            <div className="max-w-3xl">
              <h2 id="amaran-heading" className="font-heading text-h2 font-extrabold text-slate-900 md:text-h2-lg">
                {t('scam.heading')}
              </h2>
              <div className="mt-4 space-y-3 text-slate-900">
                <p>
                  {t('scam.p1Before')}
                  <strong className="font-extrabold text-warn">{t('scam.p1Strong')}</strong>
                  {t('scam.p1After')}
                </p>
                <p>{t('scam.p2')}</p>
                <p>{t('scam.p3')}</p>
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-2 font-medium text-slate-900">
                {t('scam.official')}
                <WhatsAppLink className="rounded font-heading font-extrabold text-navy-900 underline decoration-warn decoration-2 underline-offset-4">
                  {WHATSAPP_DISPLAY}
                </WhatsAppLink>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
