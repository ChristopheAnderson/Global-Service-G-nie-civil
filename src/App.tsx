import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/ui/Preloader';
import { CursorGlow } from './components/ui/CursorGlow';
import { ArchitecturalFloatingDecorations } from './components/ui/ArchitecturalFloatingDecorations';
import { KineticTicker } from './components/ui/KineticTicker';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { CostEstimator } from './components/calculator/CostEstimator';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EngagementsSection } from './components/sections/EngagementsSection';
import { TeamSection } from './components/sections/TeamSection';
import { NewsSection } from './components/sections/NewsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { QuoteModal } from './components/modals/QuoteModal';
import { ServiceModal } from './components/modals/ServiceModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { ServiceItem, ProjectItem } from './data/siteData';

export const App: React.FC = () => {
  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState<string>('Construction de Bâtiments');
  
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }
    };
  }, []);

  const handleOpenQuoteModal = (initialService?: string) => {
    if (initialService) {
      setQuoteServicePrefill(initialService);
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500/20 selection:text-slate-900 overflow-x-hidden max-w-full">
      {/* Interactive Cursor Light Beam (Desktop) */}
      <CursorGlow />

      {/* Floating Blueprint Coordinates & Engineering Crosshairs */}
      <ArchitecturalFloatingDecorations />

      {/* Architectural Construction Preloader */}
      <Preloader />

      {/* Top Navbar with integrated precision laser progress line */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Page Sections */}
      <main>
        <HeroSection onOpenQuoteModal={handleOpenQuoteModal} />
        
        {/* Kinetic Ticker Ribbon */}
        <KineticTicker />

        <AboutSection />
        
        <ServicesSection
          onSelectServiceForQuote={(title) => handleOpenQuoteModal(title)}
          onOpenServiceDetails={(service) => setSelectedService(service)}
        />

        {/* Interactive BTP Cost Estimator */}
        <CostEstimator onTransferToQuote={(details) => handleOpenQuoteModal(details)} />

        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />

        <EngagementsSection />
        <TeamSection />
        <NewsSection onOpenQuoteModal={(service) => handleOpenQuoteModal(service)} />
        <ContactSection preselectedService={quoteServicePrefill} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Elements */}
      <WhatsAppButton />

      {/* Interactive Global Modals with strict Scroll-Lock & Lenis pause */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={quoteServicePrefill}
        lenis={lenisRef.current}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={(title) => handleOpenQuoteModal(title)}
        lenis={lenisRef.current}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={() => handleOpenQuoteModal()}
        lenis={lenisRef.current}
      />
    </div>
  );
};

export default App;
