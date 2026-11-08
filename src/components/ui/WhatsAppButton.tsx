import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../data/siteData';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = encodeURIComponent(
    "Bonjour Global Service Génie Civil, je visite votre site internet et j'aimerais échanger au sujet d'un projet de construction au Bénin."
  );

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-end flex-col gap-2">
      {/* Tooltip prompt */}
      {showTooltip && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="hidden sm:flex items-center gap-2 p-3 pr-2 bg-white/98 backdrop-blur-md border border-emerald-300 rounded-2xl shadow-xl text-xs text-slate-800 max-w-xs"
        >
          <div className="flex-1">
            <p className="font-bold text-emerald-800">Une question technique ?</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Échangez directement avec un ingénieur sur WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800"
            aria-label="Fermer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Floating Button with Tactile Motion */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-colors"
        aria-label="Contacter sur WhatsApp"
      >
        {/* Radar ping ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-35 pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

        {/* Small live notification badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
          1
        </span>
      </motion.a>
    </div>
  );
};

