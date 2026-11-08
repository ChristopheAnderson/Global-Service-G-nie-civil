import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData, ServiceItem } from '../../data/siteData';
import { TiltCard } from '../ui/TiltCard';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Compass, 
  HardHat, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  Info
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
  onOpenServiceDetails,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Toutes nos expertises' },
    { id: 'gros-oeuvre', label: 'Bâtiment & Gros Œuvre' },
    { id: 'infrastructures', label: 'Génie Civil & VRD' },
    { id: 'etudes', label: 'Études & Contrôle' },
  ];

  const filteredServices = servicesData.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'gros-oeuvre') return s.id === 'batiment' || s.id === 'renovation';
    if (filter === 'infrastructures') return s.id === 'genie-civil' || s.id === 'travaux-publics';
    if (filter === 'etudes') return s.id === 'etudes-techniques' || s.id === 'suivi-controle';
    return true;
  });

  return (
    <section id="services" className="relative py-24 bg-slate-50/80 border-t border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Nos Domaines d'Intervention</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Des expertises techniques complètes pour bâtir vos projets
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-4 mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            De la phase de conception numérique jusqu'à la livraison finale des clés, 
            découvrez nos solutions de construction adaptées aux exigences structurelles du Bénin.
          </p>

          <div className="mt-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-sm">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Catalogue modulaire d'ingénierie · Devis sur mesure établi selon votre cahier des charges</span>
          </div>
        </motion.div>

        {/* Filter Tabs with Prompt-Motion Sliding Pill */}
        <div className="flex items-center gap-2 mb-12 p-1.5 rounded-2xl sm:rounded-full bg-white border border-slate-200 shadow-sm w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar sm:justify-center mx-auto backdrop-blur-xl">
          {categories.map((c) => {
            const isSelected = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 z-10 whitespace-nowrap shrink-0 ${
                  isSelected ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeServiceCategory"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 shadow-md -z-10"
                  />
                )}
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid with Clean Image Separation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TiltCard
                  tiltMaxAngle={5}
                  className="group rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 h-full backdrop-blur-md"
                >
                  {/* PURE PHOTO HEADER - Completely unobstructed, sharp and clear */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Small discrete category tag in corner */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-mono uppercase tracking-wider text-slate-700 shadow-sm">
                      {service.category}
                    </div>
                  </div>

                  {/* ALL TEXT AND TITLES IN THE CLEAN SOLID BODY - 100% Readable */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      {/* Icon + Title block */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-amber-600 shadow-inner shrink-0 group-hover:border-amber-400 transition-colors">
                          {getIcon(service.iconName)}
                        </div>
                        <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>

                      {/* Key Features List */}
                      <ul className="space-y-2 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technical Specs Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {service.specs.slice(0, 2).map((sp, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-mono"
                          >
                            {sp.label}: <strong className="text-slate-900">{sp.value}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServiceForQuote(service.title);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md"
                      >
                        <span>Devis gratuit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenServiceDetails(service)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
                        title="Voir les détails complets de la prestation"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
