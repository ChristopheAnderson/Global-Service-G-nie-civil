import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../data/siteData';
import { BorderBeam } from '../ui/BorderBeam';
import { 
  Calculator, 
  Building, 
  Maximize, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Clock,
  Info
} from 'lucide-react';

interface CostEstimatorProps {
  onTransferToQuote: (details: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onTransferToQuote }) => {
  const [projectType, setProjectType] = useState<'villa' | 'immeuble' | 'bureau' | 'entrepot' | 'vrd' | 'dalot'>('villa');
  const [surface, setSurface] = useState<number>(250);
  const [finishingLevel, setFinishingLevel] = useState<'gros-oeuvre' | 'standard' | 'prestige'>('standard');
  const [soilType, setSoilType] = useState<'ferme' | 'littoral' | 'lagunaire'>('littoral');

  const projectTypes = [
    { id: 'villa', label: 'Villa Moderne (R+1 / R+2)', baseCost: 210000, minSurface: 100, maxSurface: 800, step: 20 },
    { id: 'immeuble', label: 'Immeuble Résidentiel (R+3 à R+6)', baseCost: 260000, minSurface: 300, maxSurface: 3000, step: 50 },
    { id: 'bureau', label: 'Complexe Tertiaire / Bureaux', baseCost: 295000, minSurface: 200, maxSurface: 4000, step: 50 },
    { id: 'entrepot', label: 'Entrepôt & Hangar Industriel', baseCost: 155000, minSurface: 300, maxSurface: 5000, step: 100 },
    { id: 'vrd', label: 'Voie Pavée & Assainissement (m²)', baseCost: 48000, minSurface: 200, maxSurface: 10000, step: 100 },
    { id: 'dalot', label: "Ouvrage d'Art / Dalot Armé (ml)", baseCost: 350000, minSurface: 10, maxSurface: 150, step: 5 },
  ];

  const currentTypeInfo = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  // Calculation
  const calculation = useMemo(() => {
    let costPerUnit = currentTypeInfo.baseCost;

    if (finishingLevel === 'gros-oeuvre') costPerUnit *= 0.62;
    if (finishingLevel === 'prestige') costPerUnit *= 1.35;

    if (soilType === 'littoral') costPerUnit *= 1.12;
    if (soilType === 'lagunaire') costPerUnit *= 1.22;

    const totalCost = Math.round(costPerUnit * surface);

    let months = Math.ceil(surface / 80) + 2;
    if (projectType === 'dalot' || projectType === 'vrd') {
      months = Math.ceil(surface / 150) + 1;
    }
    months = Math.max(2, Math.min(24, months));

    return {
      totalCost,
      grosOeuvre: Math.round(totalCost * 0.48),
      secondOeuvre: Math.round(totalCost * 0.38),
      etudesBim: Math.round(totalCost * 0.08),
      suiviControle: Math.round(totalCost * 0.06),
      estimatedMonths: months,
    };
  }, [currentTypeInfo, surface, finishingLevel, soilType, projectType]);

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  const getWhatsAppEstimateUrl = () => {
    const text = `Bonjour Global Service,
Voici mon estimation personnalisée réalisée sur votre simulateur web :
• Type d'ouvrage : ${currentTypeInfo.label}
• Dimension : ${surface} ${projectType === 'dalot' ? 'mètres linéaires' : 'm²'}
• Niveau de finition : ${
      finishingLevel === 'gros-oeuvre' ? 'Gros Œuvre seul' : finishingLevel === 'standard' ? 'Finition Soignée' : 'Haut Standing / Prestige'
    }
• Zone de sol au Bénin : ${
      soilType === 'ferme' ? 'Terre ferme' : soilType === 'littoral' ? 'Zone côtière (radier étanche)' : 'Zone meuble / lagunaire'
    }
• Budget indicatif calculé : ${formatFCFA(calculation.totalCost)}
• Durée prévisionnelle : ~${calculation.estimatedMonths} mois

Je souhaite affiner cette estimation avec vos ingénieurs.`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="simulateur" className="relative py-24 bg-white border-t border-slate-200">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>Outil d'Ingénierie Financière</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Simulateur de Budget BTP au <span className="text-amber-600">Bénin</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-4 mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            Estimez instantanément l'enveloppe budgétaire et le calendrier d'exécution 
            de votre chantier en fonction des spécificités du sol et de vos ambitions architecturales.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive Parameters (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-slate-50/90 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md backdrop-blur-xl">
            
            {/* Step 1: Type d'ouvrage */}
            <div>
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-600" />
                <span>1. Nature de l'Ouvrage à Réaliser</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((pt) => (
                  <motion.button
                    key={pt.id}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setProjectType(pt.id as any);
                      setSurface(pt.minSurface * 1.5);
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      projectType === pt.id
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <span className="block font-bold text-sm text-slate-900 mb-0.5">{pt.label.split('(')[0]}</span>
                    <span className="text-[11px] text-slate-500">{pt.label.includes('(') ? '(' + pt.label.split('(')[1] : ''}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 2: Surface Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Maximize className="w-4 h-4 text-amber-600" />
                  <span>2. Dimension / Surface Prévue</span>
                </label>
                <span className="text-sm sm:text-base font-heading font-bold text-amber-700 bg-white px-2.5 sm:px-3 py-1 rounded-lg border border-slate-200 font-mono shadow-sm">
                  {surface} {projectType === 'dalot' ? 'mètres linéaires (ml)' : 'm²'}
                </span>
              </div>
              <input
                type="range"
                min={currentTypeInfo.minSurface}
                max={currentTypeInfo.maxSurface}
                step={currentTypeInfo.step}
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>{currentTypeInfo.minSurface} {projectType === 'dalot' ? 'ml' : 'm²'}</span>
                <span>{currentTypeInfo.maxSurface} {projectType === 'dalot' ? 'ml' : 'm²'}</span>
              </div>
            </div>

            {/* Step 3: Niveau de Finition */}
            <div>
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>3. Degré de Finition &amp; Prestations</span>
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'gros-oeuvre', label: 'Gros Œuvre Seul', desc: 'Structure, radier & maçonnerie' },
                  { id: 'standard', label: 'Finition Soignée', desc: 'Carrelage, peinture, sanitaires' },
                  { id: 'prestige', label: 'Prestige Clé en Main', desc: 'Domotique, marbre, climatisation' },
                ].map((fn) => (
                  <motion.button
                    key={fn.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFinishingLevel(fn.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      finishingLevel === fn.id
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <span className="block font-bold text-xs text-slate-900 mb-0.5">{fn.label}</span>
                    <span className="text-[10px] text-slate-500 hidden sm:block">{fn.desc}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 4: Sol au Bénin */}
            <div>
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>4. Typologie du Sol / Localisation</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'ferme', title: 'Terre Ferme / Plateau', sub: 'Calavi Nord, Allada, Parakou' },
                  { id: 'littoral', title: 'Zone Côtière Sablonneuse', sub: 'Cotonou, Haie Vive, Fidjrossè' },
                  { id: 'lagunaire', title: 'Zone Bas-Fond / Meuble', sub: 'Nappe affleurante, berges' },
                ].map((sl) => (
                  <motion.button
                    key={sl.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSoilType(sl.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      soilType === sl.id
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <span className="block font-bold text-xs text-slate-900 mb-0.5">{sl.title}</span>
                    <span className="text-[10px] text-slate-500">{sl.sub}</span>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Results & CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-amber-400/40 shadow-xl space-y-6 overflow-hidden backdrop-blur-xl">
              <BorderBeam size={200} duration={10} colorFrom="#D97706" colorTo="#F59E0B" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 font-bold block mb-1">
                  Budget Prévisionnel Estimé
                </span>
                <motion.h3 
                  key={calculation.totalCost}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight"
                >
                  {formatFCFA(calculation.totalCost)}
                </motion.h3>
                <div className="flex items-center gap-2 text-xs text-emerald-700 mt-2 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Délai estimé : ~{calculation.estimatedMonths} mois d'exécution</span>
                </div>
              </div>

              {/* Breakdown Bars with Dynamic Motion */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider block">
                  Décomposition Prévisionnelle :
                </span>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Gros Œuvre &amp; Fondations (48%)</span>
                    <span className="text-slate-900 font-mono font-bold">{formatFCFA(calculation.grosOeuvre)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      key={`go-${calculation.grosOeuvre}`}
                      initial={{ width: 0 }}
                      animate={{ width: '48%' }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-amber-500 rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Second Œuvre &amp; Équipements (38%)</span>
                    <span className="text-slate-900 font-mono font-bold">{formatFCFA(calculation.secondOeuvre)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      key={`so-${calculation.secondOeuvre}`}
                      initial={{ width: 0 }}
                      animate={{ width: '38%' }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-amber-400 rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Études BIM &amp; Calculs Structures (8%)</span>
                    <span className="text-slate-900 font-mono font-bold">{formatFCFA(calculation.etudesBim)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      key={`eb-${calculation.etudesBim}`}
                      initial={{ width: 0 }}
                      animate={{ width: '8%' }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      className="h-full bg-sky-500 rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Suivi &amp; Contrôle Géotechnique (6%)</span>
                    <span className="text-slate-900 font-mono font-bold">{formatFCFA(calculation.suiviControle)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      key={`sc-${calculation.suiviControle}`}
                      initial={{ width: 0 }}
                      animate={{ width: '6%' }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-emerald-500 rounded-full" 
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => {
                    const desc = `Projet simulé : ${currentTypeInfo.label} de ${surface} ${projectType === 'dalot' ? 'ml' : 'm²'}, finition ${finishingLevel}, sol ${soilType}. Estimation : ${formatFCFA(calculation.totalCost)}.`;
                    onTransferToQuote(desc);
                  }}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Valider &amp; Demander le Devis Officiel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppEstimateUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Envoyer cette estimation sur WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulation indicative hors coût d'acquisition de terrain</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
