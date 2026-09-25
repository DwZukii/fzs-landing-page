import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import LeadSection from './components/LeadSection.jsx';
import WhoWeHelp from './components/WhoWeHelp.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Documents from './components/Documents.jsx';
import WhyUs from './components/WhyUs.jsx';
import ScamWarning from './components/ScamWarning.jsx';
import Faq from './components/Faq.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <LeadSection />
        <WhoWeHelp />
        <HowItWorks />
        <Documents />
        <WhyUs />
        <ScamWarning />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
