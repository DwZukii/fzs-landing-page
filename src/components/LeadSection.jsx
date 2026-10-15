import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Section, { Eyebrow, H2 } from './ui/Section.jsx';
import Squiggle from './ui/Squiggle.jsx';
import Button from './ui/Button.jsx';
import { WhatsAppGlyph } from './ui/Icon.jsx';
import WhatsAppLink from './ui/WhatsAppLink.jsx';
import LeadForm from './Calculator/LeadForm.jsx';
import Calculator from './Calculator/Calculator.jsx';

// The form is the page's job. The calculator sits under it, always open;
// when it produces a result, those figures ride along with the lead.
export default function LeadSection() {
  const { t } = useLanguage();
  const [calc, setCalc] = useState(null);

  return (
    <Section id="kalkulator">
      {/* This wrapper is the accent's positioning context. Without it the
          accent anchors to the full-width section and strands itself at the
          far right of a wide monitor, away from anything it decorates. */}
      <div className="relative">
        <Squiggle shape="loop" className="right-0 top-10 h-14 w-16" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t('lead.eyebrow')}</Eyebrow>
        <H2>{t('lead.heading')}</H2>
        <p className="mt-3">{t('lead.intro')}</p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl md:mt-10">
        <LeadForm calc={calc} />
        <Calculator onResult={setCalc} />

        {/* Contact path for anyone who would rather not fill in a form */}
        <div className="mt-5 rounded-card border border-slate-200 bg-white p-5 text-center shadow-card md:p-6">
          <p className="font-heading text-h3 font-semibold text-slate-900">{t('lead.altHeading')}</p>
          <p className="mx-auto mt-1.5 max-w-md text-small text-slate-600">{t('lead.altBody')}</p>
          <Button as={WhatsAppLink} message={t('lead.altMessage')} variant="whatsapp" className="mt-4 w-full sm:w-auto">
            <WhatsAppGlyph />
            {t('lead.altCta')}
          </Button>
        </div>
      </div>
    </Section>
  );
}
