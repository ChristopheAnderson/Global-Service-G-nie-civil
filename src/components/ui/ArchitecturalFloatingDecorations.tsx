import React from 'react';
import { motion } from 'framer-motion';

export const ArchitecturalFloatingDecorations: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating Precision Crosshair 1 (Top Left) */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-36 left-12 text-amber-600/30 font-mono text-2xl select-none"
      >
        +
      </motion.div>

      {/* Floating Blueprint Crosshair 2 (Mid Right) */}
      <motion.div
        animate={{
          y: [0, 22, 0],
          x: [0, -12, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-16 text-slate-400/40 font-mono text-3xl select-none"
      >
        +
      </motion.div>

      {/* Floating Elevation Level Marker (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-8 px-3 py-1 rounded-full border border-slate-300/80 bg-white/80 backdrop-blur-md shadow-sm text-[9px] font-mono text-slate-700 select-none hidden lg:block"
      >
        NIV. +0.00m · GBÉGAMÈ // LAT 6.3561° N
      </motion.div>

      {/* Ambient Pulsing Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-sky-400/10 blur-[160px]"
      />
    </div>
  );
};
