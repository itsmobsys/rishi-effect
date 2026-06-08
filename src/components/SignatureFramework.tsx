import React, { useState } from "react";
import { motion } from "motion/react";
import { Link2, Zap, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import { FRAMEWORK_STEPS } from "../data";

export const SignatureFramework: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState("connect");

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "Link2":
        return <Link2 className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* List layout and custom connections */}
      <div className="col-span-1 lg:col-span-7 space-y-4 relative">
        {/* Animated drawing vertical vector line inside the layout */}
        <div className="absolute left-6.5 top-8 bottom-8 w-[2px] bg-brand-border hidden md:block">
          <motion.div
            className="w-full bg-gradient-to-b from-royal-blue to-royal-light rounded"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {FRAMEWORK_STEPS.map((step, idx) => {
          const isActive = activeStepId === step.id;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setActiveStepId(step.id)}
              className={`p-6.5 rounded-2xl border transition-all duration-500 flex gap-6 items-start cursor-pointer relative ${
                isActive
                  ? "bg-brand-gray border-royal-blue/40 shadow-[0_4px_30px_rgba(65,105,225,0.06)]"
                  : "bg-transparent border-brand-border/60 hover:border-slate-800"
              }`}
            >
              {/* Highlight pulser */}
              {isActive && (
                <span className="absolute -left-1 sm:-left-2 top-10 w-3 h-3 rounded-full bg-royal-blue animate-ping" />
              )}

              {/* Number and icon bubble */}
              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center shrink-0 transition-all shadow ${
                isActive 
                  ? "bg-gradient-to-b from-royal-blue to-royal-light text-white border-royal-blue" 
                  : "bg-brand-gray text-[#94A3B8] border-brand-border"
              }`}>
                {getStepIcon(step.iconName)}
              </div>

              {/* Step context details */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-mono tracking-widest font-bold ${isActive ? "text-royal-blue" : "text-slate-500"}`}>
                    {step.tagline}
                  </span>
                  <span className="text-2xs font-mono font-bold text-slate-500">[{step.stepNumber}]</span>
                </div>
                <h4 className="font-serif italic text-lg sm:text-xl font-extrabold text-white">
                  {step.title}
                </h4>
                <p className={`text-xs mt-2 leading-relaxed transition-colors ${
                  isActive ? "text-slate-200" : "text-[#94A3B8] line-clamp-2 md:line-clamp-none"
                }`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right side display details of selected Framework State */}
      <div className="col-span-1 lg:col-span-5 bg-brand-gray border border-brand-border rounded-xl p-8 shadow-xl relative overflow-hidden self-stretch flex flex-col justify-between">
        {/* Glow behind framework details */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-royal-blue/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-mono text-royal-blue tracking-widest font-extrabold uppercase bg-royal-blue/10 px-3 py-1.5 rounded-full border border-royal-blue/15">
            Operational Protocol Detail
          </span>

          <div className="mt-8">
            <span className="text-4xl font-serif font-black text-slate-700 block mb-2 leading-none">
              {FRAMEWORK_STEPS.find((s) => s.id === activeStepId)?.stepNumber}
            </span>
            <h3 className="text-2xl font-serif italic font-extrabold text-[#F8FAFC]">
              The {FRAMEWORK_STEPS.find((s) => s.id === activeStepId)?.title} Mandate
            </h3>
            
            <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mt-1 mb-4">
              Strategic Phase Directive
            </p>

            <div className="bg-brand-black p-5.5 rounded-xl border border-brand-border mb-6">
              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                During the <strong className="text-white">"{FRAMEWORK_STEPS.find((s) => s.id === activeStepId)?.title}"</strong> milestone, our agency aligns your operations with dynamic market forces. This ensures all branding, public relations, and social media channels operate in absolute synchronized harmony for category leadership.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-center text-2xs font-mono text-[#94A3B8] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                <span>Impact Assurance: 100%</span>
              </div>
              <div className="flex gap-2.5 items-center text-2xs font-mono text-[#94A3B8] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                <span>Execution Duration: Phase-Specific</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border/60 text-2xs text-[#94A3B8] font-mono flex justify-between items-center bg-brand-black/40 p-4 rounded-lg">
          <span>AGENCY CONFIDENTIAL • EST. 2015</span>
          <a
            href="#contact"
            className="text-royal-blue hover:underline flex items-center gap-1.5 font-bold"
          >
            <span>Run Mandate</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
