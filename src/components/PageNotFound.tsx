import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldAlert, Sparkles, Navigation, Globe } from "lucide-react";

interface PageNotFoundProps {
  onNavigateHome: () => void;
}

export const PageNotFound: React.FC<PageNotFoundProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-brand-black text-slate-100 font-sans relative overflow-hidden flex items-center justify-center p-6 md:p-12">
      {/* Background layer */}
      <div className="bg-grain" />
      
      {/* Glowing backdrop blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl wave pointer-events-none" />

      <div className="w-full max-w-xl relative p-8 md:p-12 bg-brand-gray/80 border border-brand-border rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-md text-center overflow-hidden">
        
        {/* Top visual graphic */}
        <div className="relative mb-8 flex justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-royal-blue/10 border border-royal-blue/25 flex items-center justify-center relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-royal-blue/5 animate-ping opacity-75" />
            <ShieldAlert className="w-9 h-9 text-royal-blue group-hover:rotate-12 transition-transform duration-300" />
          </motion.div>
        </div>

        {/* Brand context element */}
        <span className="inline-flex items-center gap-2 px-35 py-1.5 rounded-full bg-brand-black border border-brand-border text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-6">
          <Globe className="w-3 h-3 text-royal-blue animate-spin" />
          NARRATIVE BLOCK PREVENTED
        </span>

        {/* 404 Header */}
        <h1 className="text-6xl md:text-7xl font-serif italic font-black text-[#F8FAFC] tracking-normal mb-1.5 uppercase">
          404 SEC
        </h1>
        
        <p className="text-2xs font-mono text-royal-light uppercase tracking-widest mb-6">
          UNRESOLVED GRID LOCATION DETECTED
        </p>

        {/* Informative message */}
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-sm mx-auto mb-10">
          The tactical advisory address or asset directory requested does not exist or has been relocated under executive cryptographic guidelines. Discretion remains key.
        </p>

        {/* Interactive call-to-actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-royal-blue to-royal-light hover:from-royal-light hover:to-royal-blue text-white font-mono text-2xs font-extrabold uppercase tracking-widest rounded-xl border border-royal-blue/20 hover:shadow-[0_0_20px_rgba(65,105,225,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Safe Quadrant</span>
          </button>
          
          <a
            href="mailto:devisnoob61@gmail.com?subject=Broken%20Link%20Notification"
            className="w-full sm:w-auto px-6 py-3.5 bg-brand-black hover:bg-brand-gray border border-brand-border text-[#94A3B8] hover:text-white font-mono text-2xs font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Alert Administrator</span>
          </a>
        </div>

        {/* Footer info line */}
        <div className="mt-12 pt-6 border-t border-brand-border/45 text-[9.5px] font-mono text-slate-600 flex items-center justify-between">
          <span>COORDINATES: 25.4358° N, 81.8463° E</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PORTAL SECURE
          </span>
        </div>

      </div>
    </div>
  );
};
