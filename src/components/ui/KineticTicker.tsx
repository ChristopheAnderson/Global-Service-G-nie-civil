import React from 'react';
import { ShieldCheck, Compass, Layers, Building2, CheckCircle2 } from 'lucide-react';

export const KineticTicker: React.FC = () => {
  const items = [
    { label: "BÉTON HAUTE PERFORMANCE C35/45", tag: "EUROCODE 2", icon: Layers },
    { label: "FONDATIONS SPÉCIALES & RADIERS NERVURÉS", tag: "LITTORAL BÉNIN", icon: Building2 },
    { label: "MODÉLISATION BIM & CALCUL STRUCTURAL", tag: "ÉTUDES 3D", icon: Compass },
    { label: "POLITIQUE HSE ZÉRO ACCIDENT", tag: "CERTIFIÉ", icon: ShieldCheck },
    { label: "TRAVAUX PUBLICS & INFRASTRUCTURES URBAINES", tag: "COTONOU", icon: CheckCircle2 },
    { label: "ESSAIS GÉOTECHNIQUES & ÉPROUVETTES 28 JOURS", tag: "LABORATOIRE", icon: Layers },
  ];

  return (
    <div className="relative py-3.5 bg-white/90 backdrop-blur-md overflow-hidden border-y border-slate-200/80 select-none z-20 shadow-sm">
      {/* Left and Right Edge Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex w-max animate-ticker">
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-10 shrink-0 px-6">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-heading font-semibold text-slate-800 text-xs sm:text-sm tracking-wider uppercase transition-colors group-hover:text-amber-600">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    {item.tag}
                  </span>
                  <span className="text-slate-300 ml-4">✦</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
