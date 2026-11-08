import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../data/siteData';
import { X, MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuote: () => void;
  lenis?: any;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestQuote,
  lenis,
}) => {
  useModalScrollLock(project !== null, lenis);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <AnimatePresence>
      {project && (
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
            className="relative w-full max-w-4xl max-h-[88vh] bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain p-5 sm:p-8 shadow-2xl z-10 custom-scrollbar text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-950 border border-slate-200 z-20 transition-colors shadow-sm"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Preview - PURE PHOTO, NO TEXT OVERLAY ON TOP */}
            <div className="space-y-3 mb-6">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={project.gallery[activeImageIndex] || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Status pill in corner */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-700 font-mono shadow-sm">
                    {project.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 backdrop-blur-md border border-emerald-300 text-xs text-emerald-800 font-bold shadow-sm">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {project.gallery.length > 1 && (
                <div className="flex gap-2">
                  {project.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Aperçu projet" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CLEAN TITLE BLOCK BELOW THE IMAGE */}
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                {project.title}
              </h3>
            </div>

            {/* Project Technical Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="block text-[11px] text-slate-500 font-mono">Localisation</span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {project.location}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-mono">Année d'exécution</span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {project.year}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-mono">Dimension / Surface</span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {project.surface || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-mono">Contrôle technique</span>
                  <span className="block text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
                    Certifié sans réserve
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Contexte &amp; Spécifications du Chantier
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Défis d'Ingénierie Relevés
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 text-center sm:text-left">
                  Besoin d'un accompagnement similaire pour votre ouvrage ?
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Demander un devis pour votre projet</span>
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
