import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";

export const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotation sequence
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto py-10 px-4 select-none group"
    >
      {/* Absolute Faint floating quotes in the background */}
      <div className="absolute top-0 left-12 opacity-[0.03] text-royal-blue pointer-events-none">
        <Quote className="w-48 h-48 rotate-180" />
      </div>

      {/* Carousel Core Card viewport */}
      <div className="relative overflow-hidden min-h-[290px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-brand-gray/65 backdrop-blur-md border-l-4 border-royal-blue border-y border-r border-brand-border/80 rounded-r-3xl rounded-l-md p-6 sm:p-9.5 md:p-11 flex flex-col md:flex-row gap-6 sm:gap-9 items-center sm:items-start"
          >
            {/* Typographic monogram badge instead of a photo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-royal-blue/35 bg-[#16161E] flex items-center justify-center shrink-0 shadow-lg shadow-royal-blue/10 select-none">
              <span className="font-mono text-base sm:text-lg font-black text-royal-light tracking-wider">
                {current.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            {/* Testimonial texts */}
            <div className="flex-1 text-center sm:text-left">
              <Quote className="w-8 h-8 text-royal-blue/20 mb-3.5 mx-auto sm:mx-0 shrink-0" />
              <p className="font-serif italic text-[#F8FAFC] text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-medium">
                "{current.quote}"
              </p>

              <div>
                <h4 className="font-display font-medium text-xs sm:text-sm text-white uppercase tracking-wider">
                  {current.name}
                </h4>
                <p className="font-mono text-[10px] text-royal-silver/70 mt-1 uppercase tracking-widest">
                  {current.role} <span className="text-royal-blue/50">•</span> {current.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Indicator Controls */}
      <div className="flex items-center justify-between mt-8 relative z-10 px-4">
        {/* Navigation buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-brand-gray border border-brand-border hover:border-royal-blue hover:text-royal-blue text-slate-400 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-brand-gray border border-brand-border hover:border-royal-blue hover:text-royal-blue text-slate-400 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? "bg-royal-blue w-4" : "bg-brand-border hover:bg-slate-700"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
