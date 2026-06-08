import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles, Volume2, Quote, Flame } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HIGHLIGHTS = [
  {
    category: "GENEVA GLOBAL COHESION",
    title: "Sovereign Cognitive Command",
    quote: "If an administration is defensive, it has already surrendered. A leader's job is not to justify actions, but to establish the permanent baseline of their authority.",
    metric: "99.2% Retraction Rate",
    details: "Keynote delivered to 450+ technology founders and sovereign fund officers mapping conversational leverage to corporate prestige."
  },
  {
    category: "WORLD ECONOMIC ADVOCACY",
    title: "The Frictionless Corridor",
    quote: "Aligning executive focus bypasses any state regulatory bottleneck. Unified positioning turns standard regulatory compliance into a competitive market asset.",
    metric: "+$4.2B Capital Stabilized",
    details: "Addressing Closed-door committees on brand longevity, state risk dockets, and structural PR crisis defense formulas."
  },
  {
    category: "NATIONAL CONSENSUS CONGEN",
    title: "Architectural Voice Authority",
    quote: "In a digital era of sensory overload, silence is absolute leverage. Speak in the deliberate pauses, and let your brand occupy the competitor's vacuum.",
    metric: "2.5M+ Mindshares Managed",
    details: "A masterclass on high-contrast visual positioning, luxury gold & silver accents, and commanding media market share without ad-spend noise."
  }
];

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Catch Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // block background scrolls
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HIGHLIGHTS.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length);
  };

  const slide = HIGHLIGHTS[activeSlide];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-brand-gray border border-brand-border w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative z-10"
          >
            {/* Upper control header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-border bg-brand-black/60">
              <span className="text-[10px] font-mono tracking-widest text-royal-blue uppercase font-black flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                INTERACTIVE HIGHLIGHT REEL • THE SOVEREIGN FORUM
              </span>
              <button
                onClick={onClose}
                className="p-1 px-2.5 rounded bg-brand-border hover:bg-royal-blue hover:text-white transition-all text-slate-300 flex items-center gap-1.5 text-2xs font-mono font-bold cursor-pointer"
                aria-label="Close Showreel"
              >
                <span>ESC</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Showcase Panel in place of Youtube Iframe */}
            <div className="relative aspect-video bg-brand-black flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-brand-border overflow-hidden select-none">
              
              {/* Left Side: Presentation Slide Deck */}
              <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-royal-blue/5 pointer-events-none">
                  <Quote className="w-40 h-40" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col flex-1 justify-center z-10"
                  >
                    <span className="text-[9px] font-mono font-black text-royal-silver uppercase tracking-widest bg-royal-blue/10 border border-royal-blue/20 self-start px-2 py-0.5 rounded mb-4">
                      {slide.category}
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-black uppercase leading-tight mb-4 text-glow-blue">
                      {slide.title}
                    </h3>
                    <p className="font-serif italic text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed mb-5 border-l-2 border-royal-blue/50 pl-4">
                      "{slide.quote}"
                    </p>
                    <p className="font-sans text-xs text-slate-400 max-w-md">
                      {slide.details}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right controls inside presentation view */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#22222A]/50 z-20">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full border border-[#22222A] hover:bg-[#16161E] hover:border-royal-blue text-slate-400 hover:text-royal-blue flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full border border-[#22222A] hover:bg-[#16161E] hover:border-royal-blue text-slate-400 hover:text-royal-blue flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-1">
                    {HIGHLIGHTS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === activeSlide ? "bg-royal-blue w-3" : "bg-brand-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Vocal Resonance Waveform Graphic Simulator */}
              <div className="w-full md:w-[35%] bg-gradient-to-b from-brand-gray to-brand-black p-6 sm:p-10 flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-royal-blue/5 rounded-full blur-[45px] pointer-events-none" />

                <div className="z-10">
                  <div className="w-10 h-10 rounded-full border border-royal-blue/30 bg-royal-blue/5 flex items-center justify-center text-royal-blue mx-auto mb-3 animate-bounce">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif italic text-sm text-slate-200 uppercase tracking-wider font-bold">
                    Vocal Frequency Control
                  </h4>
                  <p className="font-mono text-[9px] text-royal-silver/70 mt-1 uppercase tracking-widest">
                    Live Acoustic Authority Mode
                  </p>
                </div>

                {/* Shimmer Wave Graphic */}
                <div className="w-full h-16 flex items-center justify-center gap-1.5 px-4 my-6">
                  {[0.4, 0.8, 0.5, 0.95, 0.6, 0.45, 0.85, 0.35, 0.7].map((scale, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [scale * 16, scale * 60, scale * 16],
                      }}
                      transition={{
                        duration: 0.9 + (i % 3) * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ width: "2.5px" }}
                      className="bg-gradient-to-t from-royal-blue to-royal-light rounded-full shadow-[0_0_12px_rgba(65,105,225,0.45)]"
                    />
                  ))}
                </div>

                <div className="z-10 w-full bg-brand-black/85 border border-brand-border p-4 rounded-xl text-left">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-royal-light font-black uppercase mb-1">
                    <Flame className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
                    <span>IMPACT COEFFICIENT</span>
                  </div>
                  <div className="font-display font-medium text-lg text-white">
                    {slide.metric}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom context caption */}
            <div className="p-4 bg-brand-black/40 border-t border-brand-border flex items-center justify-between text-2xs text-[#94A3B8] font-mono">
              <span>ACTIVE NARRATIVE BLUEPRINTING INDEX: 94.6%</span>
              <span>ESTABLISHED HARMONIC DOMINANCE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
