import React from "react";
import { motion } from "motion/react";
import { Sparkles, Trophy, Award, Landmark, Globe, CheckCircle } from "lucide-react";

export const CredibilityMarquee: React.FC = () => {
  const credibilityMarkers = [
    { name: "FORBES ADVISORY", icon: <Award className="w-4 h-4 text-royal-blue" /> },
    { name: "TEDx SPEAKER", icon: <Globe className="w-4 h-4 text-royal-blue" /> },
    { name: "HARVARD B-SCHOOL", icon: <Landmark className="w-4 h-4 text-royal-blue" /> },
    { name: "INC CATEGORY LEADER", icon: <Trophy className="w-4 h-4 text-royal-blue" /> },
    { name: "CNBC LEADERSHIP BRIEF", icon: <CheckCircle className="w-4 h-4 text-royal-blue" /> },
    { name: "TECHCRUNCH DISRUPT", icon: <Sparkles className="w-4 h-4 text-royal-blue" /> },
    { name: "GQ EXECUTIVE EXCELLENCE", icon: <Award className="w-4 h-4 text-royal-blue" /> },
  ];

  // Double list to ensure smooth infinite loop
  const scrollItems = [...credibilityMarkers, ...credibilityMarkers, ...credibilityMarkers];

  return (
    <div className="w-full border-y border-brand-border bg-brand-black/85 py-6.5 overflow-hidden relative z-10">
      {/* Cinematic dark vignettes on sides to fade elements into edges */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-brand-black to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-brand-black to-transparent z-20 pointer-events-none" />

      {/* Marquee scroll container */}
      <div className="w-full flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-slate-100 font-mono tracking-widest text-[11px] font-bold">
          {scrollItems.map((mark, mIdx) => (
            <div key={mIdx} className="flex items-center gap-3 select-none">
              <span className="p-1 px-1.5 bg-royal-blue/10 rounded-md border border-royal-blue/20 flex items-center justify-center">
                {mark.icon}
              </span>
              <span className="uppercase text-slate-300 font-display tracking-[0.25em]">{mark.name}</span>
              <span className="text-royal-blue/30 ml-3">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
