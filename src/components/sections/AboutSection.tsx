import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Target, 
  Eye, 
  Award, 
  Check, 
  Compass, 
  Sliders
} from 'lucide-react';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { SpotlightCard } from '../ui/SpotlightCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="a-propos" className="relative py-24 bg-white border-t border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm"
          >
            <Building className="w-3.5 h-3.5" />
            <span>À Propos de Global Service</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            L'excellence du BTP et du génie civil au service du <span className="text-amber-600">Bénin</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-amber-500 rounded-full mt-4 mb-6"
          />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Fondée sur des principes de rigueur géotechnique et d'ingénierie d'avant-garde, 
            <strong className="text-slate-900 font-semibold"> Global Service – Génie Civil</strong> s'affirme comme un partenaire d'envergure pour 
            les maîtres d'ouvrage publics, institutionnels et privés à la recherche d'une exécution irréprochable.
          </p>
        </motion.div>

        {/* 2-Column Editorial Grid: Image Composition + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Photographic Collage with Motion */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative space-y-4"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-white">
              <img
                src="/images/btp-asset-02.jpg"
                alt="Ingénieurs BTP béninois en réunion de chantier"
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Clean callout block BELOW the image */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm backdrop-blur-md"
            >
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-amber-600 shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 font-heading font-bold text-sm">Bureau d'Études &amp; Maîtrise d'Œuvre</h4>
                <p className="text-slate-500 text-xs mt-0.5">Calculs aux états limites, modélisations 3D et supervision continue</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Narrative: Mission, Vision, Valeurs with Staggered Motion */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                Une démarche d'ingénierie intégrée et pérenne
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Le secteur de la construction au Bénin connaît une mutation sans précédent. 
                Chez Global Service, nous conjuguons la maîtrise des sols lagunaires et sablonneux du littoral avec 
                des procédés de coffrage et ferraillage répondant aux normes internationales les plus exigeantes.
              </p>
            </div>

            {/* 3 Pillars with SpotlightCard and micro-interaction */}
            <div className="space-y-4">
              
              {/* Mission */}
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.99 }}>
                <SpotlightCard className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 shrink-0 mt-1">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-base mb-1">Notre Mission</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Concevoir et ériger des édifices et ouvrages d'art sûrs, pérennes et optimisés sur le plan budgétaire, en assurant une sécurité absolue sur chaque mètre carré de chantier.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Vision */}
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.99 }}>
                <SpotlightCard className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 shrink-0 mt-1">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-base mb-1">Notre Vision</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Devenir la référence technique incontournable du génie civil et du bâtiment en République du Bénin et dans la sous-région ouest-africaine.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Valeurs */}
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.99 }}>
                <SpotlightCard className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 shrink-0 mt-1">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-base mb-1">Nos Valeurs Cardinales</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        <strong className="text-slate-900">Rigueur technique</strong>, <strong className="text-slate-900">Transparence contractuelle</strong>, <strong className="text-slate-900">Sécurité des hommes (Zéro accident)</strong> et <strong className="text-slate-900">Respect des engagements</strong>.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

            </div>

            {/* Checklist of guarantees */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                Garantie décennale sur le gros œuvre
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                Essais laboratoire systématiques
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                Traçabilité totale des fournitures
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                Équipes formées aux règles HSE
              </span>
            </div>

          </motion.div>

        </div>

        {/* Interactive Before / After Engineering Showcase Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-400/40 text-amber-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-2 shadow-sm">
                <Sliders className="w-3.5 h-3.5" />
                <span>Cas Concret de Chantier</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                Rénovation &amp; Réhabilitation Lourde
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                D'une structure dégradée par l'air marin et les affouillements à un complexe réhabilité conforme aux Eurocodes.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Chantier pilote Cotonou Littoral
            </span>
          </div>

          <BeforeAfterSlider
            beforeImage="/images/btp-asset-06.jpg"
            afterImage="/images/btp-asset-08.jpg"
            beforeLabel="Avant : Dégradation & Fissures Béton"
            afterLabel="Après : Confortement & Finition Prestige"
          />
        </motion.div>

      </div>
    </section>
  );
};
