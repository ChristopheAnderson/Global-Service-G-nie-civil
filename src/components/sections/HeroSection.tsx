import React from 'react';
import { motion } from 'framer-motion';
import { ArchitecturalHero3D } from '../three/ArchitecturalHero3D';
import { siteConfig } from '../../data/siteData';
import { MagneticButton } from '../ui/MagneticButton';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { BorderBeam } from '../ui/BorderBeam';
import { 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-amber-50/20 text-slate-900 border-b border-slate-200/70"
    >
      {/* Background Architectural Blueprint Grid & Atmospheric Glows */}
      <div className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Kinetic Text & Engineering Pitch (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* National Authority Badge with Precision Laser Ping */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-amber-400/40 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 font-mono">
                BÂTIMENT &amp; GÉNIE CIVIL · BÉNIN
              </span>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Normes Eurocodes &amp; BAEL 91
              </span>
            </motion.div>

            {/* Kinetic Typography Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 leading-[1.12] sm:leading-[1.08] tracking-tight">
                CONSTRUIRE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 drop-shadow-sm">
                  AUJOURD'HUI
                </span>
                ,<br />
                BÂTIR LE{' '}
                <span className="relative inline-block text-slate-900">
                  FUTUR.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-1.5 left-0 h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                  />
                </span>
              </h1>
            </div>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            {/* Key Quality Checkpoints with Tactile Motion */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full py-1"
            >
              <motion.div 
                whileHover={{ y: -2, scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-white px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Béton armé certifié</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2, scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-white px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Contrôle labo 28 jours</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2, scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-white px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all xs:col-span-2 sm:col-span-1 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Maîtrise d'œuvre CCTP</span>
              </motion.div>
            </motion.div>

            {/* Magnetic Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <MagneticButton>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg border border-amber-400/40 transition-all duration-300 transform active:scale-95"
                >
                  <span>DEMANDER UN DEVIS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-heading font-semibold text-xs sm:text-sm border border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>NOS SERVICES</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Photographic Teaser of West African Civil Engineers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2 flex items-center gap-4 bg-white/95 p-3.5 rounded-2xl border border-slate-200/90 max-w-xl backdrop-blur-md shadow-sm"
            >
              <div className="flex -space-x-3 overflow-hidden shrink-0">
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-amber-500 object-cover"
                  src="/images/btp-asset-26.jpg"
                  alt="Ingénieur BTP Bénin"
                />
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-slate-300 object-cover"
                  src="/images/btp-asset-27.jpg"
                  alt="Ingénieure structure"
                />
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-amber-500 object-cover"
                  src="/images/btp-asset-28.jpg"
                  alt="Chef de chantier"
                />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">
                  Équipe d'ingénieurs et techniciens béninois
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Direction technique basée à Cotonou · Suivi de chantiers certifié
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Realistic Architectural Canvas with BorderBeam (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full h-[360px] xs:h-[400px] sm:h-[480px] lg:h-[540px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 bg-slate-950 shadow-2xl backdrop-blur-md"
          >
            {/* BorderBeam Animated Perimeter Glow */}
            <BorderBeam size={250} duration={14} colorFrom="#D97706" colorTo="#F59E0B" />

            {/* Architectural corner precision brackets */}
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-br" />

            {/* 3D Realistic Architectural Canvas */}
            <ArchitecturalHero3D />
          </motion.div>

        </div>
      </div>

      {/* Bottom Floating Stats Bar with Animated Count-up Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-lg">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col border-l-2 border-amber-500 pl-3 sm:pl-4 py-1">
              <span className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <div className="relative z-10 flex justify-center mt-6">
        <a
          href="#a-propos"
          className="group flex flex-col items-center gap-1 text-slate-500 hover:text-amber-600 transition-colors"
          aria-label="Faire défiler vers la section à propos"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">Explorer</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-600" />
        </a>
      </div>
    </section>
  );
};
