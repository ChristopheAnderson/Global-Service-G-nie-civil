import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  HardHat, 
  Microscope, 
  Clock, 
  CheckCircle2, 
  Scale, 
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const EngagementsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Scale className="w-6 h-6 text-amber-600" />,
      title: "Rigueur Technique & Dimensionnement",
      description: "Chaque composant structural (semelles, radiers, poteaux, poutres) est calculé aux états limites ultimes (ELU) et de service (ELS) avec modélisation aux éléments finis.",
      points: [
        "Conformité Eurocodes 2 et BAEL 91 révisé 99",
        "Calculs de résistance aux séismes et vents côtiers",
        "Optimisation du ratio acier/béton sans concessions"
      ]
    },
    {
      icon: <HardHat className="w-6 h-6 text-amber-600" />,
      title: "Sécurité & Zéro Accident (HSE)",
      description: "La vie humaine est notre priorité absolue. Nous déployons un plan d'hygiène, sécurité et environnement strict sur l'intégralité de nos chantiers au Bénin.",
      points: [
        "Port obligatoire des EPI (casques, gilets, chaussures)",
        "Balisage des fouilles et sécurisation des travaux en hauteur",
        "Formations continues aux premiers secours sur site"
      ]
    },
    {
      icon: <Microscope className="w-6 h-6 text-amber-600" />,
      title: "Contrôle Qualité & Essais Laboratoire",
      description: "Rien n'est laissé au hasard. Tous les agrégats, ciments et armatures font l'objet de prélèvements et d'essais d'écrasement standardisés.",
      points: [
        "Prélèvements d'éprouvettes de béton à 7 et 28 jours",
        "Essais de traction sur les aciers haute adhérence (FeE500)",
        "Contrôle de compacité OPM sur remblais et chaussées"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Respect Absolu des Délais Contractuels",
      description: "Nous tenons nos promesses de livraison. Notre méthode de gestion par chemin critique et ordonnancement BIM évite les goulets d'étranglement.",
      points: [
        "Planning d'exécution GANTT partagé en temps réel",
        "Journal de chantier numérique avec photographies drone",
        "Réunions hebdomadaires contradictoires de chantier"
      ]
    }
  ];

  return (
    <section id="engagements" className="relative py-24 bg-slate-50/80 border-t border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Assurance Qualité &amp; Normes</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Nos 4 Piliers d'Exigence Opérationnelle
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-amber-500 rounded-full mt-4 mb-6"
          />
          <p className="text-slate-600 text-base sm:text-lg">
            La réputation de Global Service s'est forgée sur la discipline, la maîtrise des matériaux 
            et la transparence totale envers nos partenaires et clients.
          </p>
        </motion.div>

        {/* 4 Pillars Grid with Staggered Motion and SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-shadow h-full">
                <div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit mb-6 shadow-inner">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
