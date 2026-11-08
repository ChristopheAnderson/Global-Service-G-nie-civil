import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsData, NewsArticle, siteConfig } from '../../data/siteData';
import { Newspaper, Calendar, Clock, ArrowRight, X, CheckCircle, MessageSquare } from 'lucide-react';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';
import { BorderBeam } from '../ui/BorderBeam';

interface NewsSectionProps {
  onOpenQuoteModal?: (serviceTitle?: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Lock background scroll when article modal is opened
  useModalScrollLock(Boolean(selectedArticle));

  return (
    <section id="actualites" className="relative py-24 bg-slate-50/80 border-t border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Veille Technique &amp; Perspectives BTP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Actualités &amp; Ingénierie au Bénin
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-4 mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            Retrouvez les analyses de nos ingénieurs sur l'évolution des techniques de construction, 
            les défis des sols béninois et les innovations durables.
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsData.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between backdrop-blur-md"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] text-slate-700 font-mono shadow-sm">
                  {article.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal with Full Isolated Smooth Scroll */}
      <AnimatePresence>
        {selectedArticle && (
          <div 
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              data-lenis-prevent="true"
              className="relative w-full max-w-3xl max-h-[88vh] bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain p-5 sm:p-8 shadow-2xl z-10 custom-scrollbar text-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <BorderBeam size={220} duration={9} colorFrom="#D97706" colorTo="#F59E0B" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-950 border border-slate-200 transition-colors z-20 shadow-sm"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag & Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-mono border border-amber-200 font-semibold">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4 pr-8 leading-tight">
                {selectedArticle.title}
              </h3>

              {/* Unobstructed Clean Image */}
              <div className="relative h-60 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-slate-100">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                {selectedArticle.content}
              </div>

              {/* Technical Sections */}
              {selectedArticle.sections && selectedArticle.sections.length > 0 && (
                <div className="space-y-6 mb-8">
                  {selectedArticle.sections.map((section, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                      <h4 className="text-base sm:text-lg font-heading font-semibold text-amber-700">
                        {section.heading}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {section.text}
                      </p>
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {section.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaways */}
              {selectedArticle.takeaways && selectedArticle.takeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 mb-8 space-y-3">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-amber-800 flex items-center gap-2 font-bold">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    <span>Points Clés Retenus par l'Ingénierie</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedArticle.takeaways.map((item, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <span className="text-amber-600 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to action footer */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-heading font-bold text-slate-900">
                    Vous développez un projet similaire au Bénin ?
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Consultez nos ingénieurs pour une étude de faisabilité et un dimensionnement sur mesure.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Bonjour Global Service, j'ai lu votre article technique '" + selectedArticle.title + "' et je souhaite échanger avec vos ingénieurs.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  {onOpenQuoteModal && (
                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        onOpenQuoteModal("Bureau d'Études & Ingénierie");
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Devis Express
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
