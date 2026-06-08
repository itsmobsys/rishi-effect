import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Check, Play, TrendingUp } from "lucide-react";
import { Offering } from "../data";

interface OfferingModalProps {
  offering: Offering | null;
  onClose: () => void;
}

export const OfferingModal: React.FC<OfferingModalProps> = ({ offering, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (offering) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [offering, onClose]);

  return (
    <AnimatePresence>
      {offering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Circular wipe / fluid Backdrop layer */}
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            animate={{ 
              opacity: 1, 
              clipPath: "circle(150% at 50% 50%)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            exit={{ 
              opacity: 0, 
              clipPath: "circle(0% at 50% 50%)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/96 backdrop-blur-xl cursor-pointer"
          />

          {/* Core Card layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.94, 
              y: 30,
              transition: { duration: 0.4 }
            }}
            className="bg-brand-gray border border-brand-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Visual Header / Brand Accents for mobile */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-brand-black border border-brand-border hover:bg-royal-blue hover:text-white text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left side: Premium Cinematic Content Details */}
            <div className="w-full p-6 sm:p-9 md:p-12 overflow-y-auto custom-scroll">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 px-2.5 rounded bg-royal-blue/15 border border-royal-blue/25 text-royal-blue font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin duration-1000" />
                  SIGNATURE PROGRAM
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  REV_0{offering.id}
                </span>
              </div>

              <h3 className="font-serif italic text-3xl sm:text-4xl text-white font-extrabold pb-2 leading-tight">
                {offering.title}
              </h3>
              
              <p className="text-royal-blue font-mono text-xs sm:text-sm tracking-wide mb-6">
                {offering.tagline}
              </p>

              <div className="border-t border-[#22222A] pt-6 mb-8 text-sm text-slate-350 leading-relaxed space-y-4 font-sans">
                <p>{offering.longDesc}</p>
              </div>

              {/* Outcomes Checklist area */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase text-white tracking-widest mb-4 font-bold">
                  KEY CONCRETE OUTCOMES:
                </h4>
                <ul className="space-y-3.5">
                  {offering.keyOutcomes.map((out, oIdx) => (
                    <li key={oIdx} className="flex gap-3 text-xs text-slate-350 leading-relaxed font-sans items-start">
                      <span className="w-5 h-5 rounded-full bg-royal-blue/10 border border-royal-blue/20 flex items-center justify-center text-royal-blue shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed counter metrics */}
              <div className="grid grid-cols-3 gap-3 border-t border-[#22222A] pt-6 pb-8">
                {offering.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="text-center p-3.5 bg-brand-black/40 rounded-xl border border-brand-border/60">
                    <span className="block text-lg sm:text-2xl font-serif text-royal-blue font-black leading-none mb-1 text-glow-blue">
                      {met.value}
                    </span>
                    <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                      {met.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action buttons at bottom of single column */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-brand-border">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 text-center bg-gradient-to-r from-royal-blue to-royal-light text-white font-mono text-xs font-black uppercase tracking-widest py-3.5 rounded-lg border border-royal-blue/30 hover:shadow-[0_0_20px_rgba(65,105,225,0.3)] transition-all cursor-pointer focus:outline-none"
                >
                  Request Program Alignment
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 hover:bg-brand-black border border-brand-border text-[#94A3B8] hover:text-white font-mono text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer animate-shimmer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
