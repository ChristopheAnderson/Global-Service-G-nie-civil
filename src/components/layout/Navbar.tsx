import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../brand/Logo';
import { siteConfig } from '../../data/siteData';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  ArrowRight,
  MapPin,
} from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: (initialService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['accueil', 'a-propos', 'services', 'simulateur', 'realisations', 'engagements', 'equipe', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil', id: 'accueil' },
    { label: 'À Propos', href: '#a-propos', id: 'a-propos' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Simulateur', href: '#simulateur', id: 'simulateur' },
    { label: 'Réalisations', href: '#realisations', id: 'realisations' },
    { label: 'Engagements', href: '#engagements', id: 'engagements' },
    { label: 'Équipe', href: '#equipe', id: 'equipe' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Micro Bar - Light Corporate with responsive layout & high contrast */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-slate-100 border-b border-slate-300/80 backdrop-blur-md ${
          scrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-12 opacity-100 py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-800 font-semibold">
          <div className="flex items-center gap-2 sm:gap-5 truncate">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-slate-900 font-bold truncate">Rue des Missions, Gbégamè · Cotonou</span>
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-emerald-800 font-mono text-[11px] uppercase tracking-wider font-bold">Chantiers &amp; Bureau d'études</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-700 transition-colors text-slate-950 font-mono font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="hidden xs:inline">{siteConfig.phoneDisplay}</span>
              <span className="xs:hidden">Appel</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Bonjour Global Service, je souhaite des informations sur vos prestations BTP."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Light Architectural Glass with High Contrast */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-2 sm:py-2.5 border-b border-slate-300'
            : 'bg-white/95 backdrop-blur-xl py-2.5 sm:py-3.5 border-b border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#accueil" 
            className="flex items-center group"
          >
            <Logo variant="horizontal" size="md" theme="light" />
          </a>

          {/* Desktop Navigation Links with High Contrast & Framer Motion Animated Layout Pill */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100 px-2 py-1.5 rounded-full border border-slate-300 shadow-inner relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-bold tracking-tight xl:tracking-normal transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-white drop-shadow-sm font-extrabold'
                      : 'text-slate-900 hover:text-amber-700 hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 shadow-md -z-10"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demander un Devis CTA Button */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-xs sm:text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg border border-amber-400/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 text-slate-900 hover:text-amber-700 hover:bg-slate-200 border border-slate-300 lg:hidden focus:outline-none transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-b border-slate-300 px-4 sm:px-6 py-5 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-sm'
                      : 'text-slate-900 hover:bg-slate-100 hover:text-amber-700'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-amber-600 font-bold">→</span>
                </a>
              ))}
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="mt-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
              >
                <span>Demander un devis personnalisé</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
