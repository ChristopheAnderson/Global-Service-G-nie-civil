import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, ProjectItem } from '../../data/siteData';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  Maximize2,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuoteModal: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenQuoteModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'batiment', label: 'Bâtiments & Résidences' },
    { id: 'genie-civil', label: "Génie Civil & Ouvrages d'Art" },
    { id: 'travaux-publics', label: 'Travaux Publics & VRD' },
    { id: 'etudes', label: 'Études & Ingénierie BIM' },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="realisations" className="relative py-24 bg-white border-t border-slate-200">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>Portfolio &amp; Chantiers Réalisés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Des réalisations qui forgent le paysage urbain
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-4 mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            Découvrez une sélection de projets menés avec la plus grande rigueur d'exécution 
            au Bénin : de la modélisation à la livraison définitive.
          </p>

          <div className="mt-3 text-xs text-slate-500 font-mono">
            * Données de démonstration et références architecturales illustrant notre savoir-faire d'ingénierie BTP.
          </div>
        </motion.div>

        {/* Filter Navigation Tabs with Sliding Pill */}
        <div className="flex items-center gap-2 mb-12 p-1.5 rounded-2xl sm:rounded-full bg-white border border-slate-200 shadow-sm w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar sm:justify-center mx-auto backdrop-blur-xl">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 z-10 whitespace-nowrap shrink-0 ${
                  isSelected ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectCategory"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 shadow-md -z-10"
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                {/* Image & Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${
                        project.status.includes('Livré')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : project.status.includes('En cours')
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-sky-50 text-sky-800 border-sky-300'
                      }`}
                    >
                      {project.status.includes('Livré') ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      {project.status}
                    </span>
                  </div>

                  {/* Category label */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] text-slate-700 font-mono shadow-sm">
                    {project.categoryLabel}
                  </div>

                  {/* Hover Maximize Button */}
                  <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-amber-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Information Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location & Year */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Highlights */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {project.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Link */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                    <span>Consulter la fiche technique</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner for custom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Vous avez un projet de construction ou d'ouvrage au Bénin ?
            </h4>
            <p className="text-slate-600 text-sm">
              Étudions ensemble votre cahier des charges, vos contraintes de sol et vos impératifs de calendrier.
            </p>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold uppercase tracking-wider text-xs shadow-md shrink-0 transition-transform transform hover:-translate-y-0.5"
          >
            Discuter de votre projet
          </button>
        </motion.div>

      </div>
    </section>
  );
};
