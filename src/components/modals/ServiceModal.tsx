import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../../data/siteData';
import { X, CheckCircle2, ArrowRight, Shield, Layers, FileText } from 'lucide-react';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
  lenis?: any;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestQuote,
  lenis,
}) => {
  useModalScrollLock(service !== null, lenis);

  return (
    <AnimatePresence>
      {service && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-3xl max-h-[88vh] bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain p-5 sm:p-8 shadow-2xl z-10 custom-scrollbar text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-950 border border-slate-200 transition-colors z-20 shadow-sm"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* PURE IMAGE - 100% CLEAR AND UNOBSTRUCTED */}
            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-slate-100">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CLEAN TITLE & BADGE BLOCK BELOW THE IMAGE */}
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono font-bold mb-2">
                {service.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                {service.title}
              </h3>
            </div>

            {/* Description & Technical Sections */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Présentation de la prestation</span>
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Périmètre des travaux &amp; interventions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs */}
              <div>
                <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Normes &amp; Paramètres techniques appliqués</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {service.specs.map((sp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="block text-[11px] text-slate-500 font-mono">{sp.label}</span>
                      <span className="block text-xs font-bold text-slate-900 mt-1">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Chiffrage personnalisé basé sur votre avant-projet sommaire (APS) ou définitif (APD).
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote(service.title);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Demander un devis pour ce service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
