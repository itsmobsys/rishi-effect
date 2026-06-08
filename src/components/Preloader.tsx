import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Shimmering Cinematic background glow */}
          <div className="absolute w-[400px] h-[400px] bg-royal-blue/10 rounded-full blur-[140px] animate-pulse" />

          {/* Magnetic Brand text */}
          <div className="relative text-center select-none px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xs font-mono uppercase tracking-[0.4em] text-royal-silver/60 mb-3"
            >
              PR • BRANDING • STRATEGY • SOCIAL MEDIA
            </motion.div>
            
            <motion.h1
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.25em", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-serif italic text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-royal-blue to-royal-light font-extrabold uppercase py-2 leading-none"
            >
              The Rishi Effect
            </motion.h1>

            {/* Glowing blue loading line segment */}
            <div className="mt-6 w-40 h-[1.5px] bg-brand-border mx-auto relative overflow-hidden rounded-full">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-24 h-full bg-gradient-to-r from-transparent via-royal-blue to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
