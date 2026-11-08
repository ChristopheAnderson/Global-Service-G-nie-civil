import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete?.();
          }, 350);
          return 100;
        }
        // Accelerating progress curve
        const step = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + step);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 overflow-hidden"
        >
          {/* Blueprint background grid */}
          <div className="absolute inset-0 bg-blueprint opacity-30" />

          {/* Central Architectural Monogram Animation */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-28 h-28 rounded-2xl bg-white border border-amber-400/40 flex items-center justify-center p-3 shadow-xl"
            >
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="preloaderOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>

                {/* Animated G Path */}
                <motion.path
                  d="M 54 26 L 32 26 A 22 22 0 0 0 32 74 L 56 74 L 56 53 L 44 53"
                  stroke="url(#preloaderOrange)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                {/* Animated S Path */}
                <motion.path
                  d="M 74 36 C 74 27 60 25 54 32 C 46 42 75 49 75 64 C 75 78 57 80 46 75"
                  stroke="#0F172A"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                />

                <polygon points="50,13 55,22 45,22" fill="#D97706" />
              </svg>
            </motion.div>

            {/* Typography */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading font-extrabold text-slate-900 text-xl tracking-wider"
              >
                GLOBAL <span className="text-amber-600">SERVICE</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mt-1"
              >
                Génie Civil &amp; BTP · Bénin
              </motion.p>
            </div>

            {/* Progress Bar & Counter */}
            <div className="w-56 space-y-2">
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Calcul des structures...</span>
                <span className="text-amber-700 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
