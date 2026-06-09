/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Calculator, TrendingUp } from "lucide-react";

const INDUSTRIES = [
  { id: "e-com", name: "E-Commerce", multiplier: 3.8, baseCpa: 450, tag: "RETAIL" },
  { id: "b2b", name: "B2B SaaS / Services", multiplier: 4.5, baseCpa: 2200, tag: "HIGH-TICKET" },
  { id: "personal", name: "Creator / Personal Brand", multiplier: 5.2, baseCpa: 350, tag: "ORGANIC-VIRAL" },
  { id: "local", name: "Local Enterprise / Retail", multiplier: 3.2, baseCpa: 600, tag: "GEOTARGETED" },
];

export default function RoiCalculator() {
  const [budget, setBudget] = useState<number>(50000); // 50,000 INR
  const [industryId, setIndustryId] = useState<string>("personal");
  
  // Results
  const [reach, setReach] = useState(0);
  const [leads, setLeads] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  useEffect(() => {
    const selected = INDUSTRIES.find((i) => i.id === industryId) || INDUSTRIES[0];
    
    // Core marketing formulas for calculations:
    // 1. Organic Virality Reach scales with ad budget and industry viral multipliers
    const calculatedReach = Math.round(budget * (selected.multiplier * 0.45) * 12);
    // 2. Leads count scales via budget divided by Cost-Per-Acquisition base metrics
    const calculatedLeads = Math.round((budget / selected.baseCpa) * selected.multiplier);
    // 3. Simulated compound ROI multiplier
    const calculatedMultiplier = selected.multiplier;

    // Smooth count animations
    let startReach = 0;
    let startLeads = 0;
    let startMult = 0;
    
    const steps = 25;
    const stepTime = 15;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setReach(Math.round(startReach + ((calculatedReach - startReach) / steps) * stepCount));
      setLeads(Math.round(startLeads + ((calculatedLeads - startLeads) / steps) * stepCount));
      setMultiplier(Number((startMult + ((calculatedMultiplier - startMult) / steps) * stepCount).toFixed(1)));

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [budget, industryId]);

  return (
    <div className="w-full bg-[#111118]/70 border border-[#0062FF]/15 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden group hover:border-[#0062FF]/30 transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0062FF]/5 blur-2xl rounded-full pointer-events-none" />
      
      {/* Visual Header */}
      <h3 className="font-display text-2xl font-black text-[#F5F0E8] tracking-tight mb-2 flex items-center space-x-2">
        <Calculator className="w-6 h-6 text-[#0062FF] animate-pulse" />
        <span>GROWTH ROI ESTIMATOR</span>
      </h3>
      <p className="font-sans text-xs text-[#F5F0E8]/50 mb-6 uppercase tracking-wider">
        Model your theoretical growth multiplier under active agency stewardship
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* INPUTS SIDE */}
        <div className="space-y-6">
          {/* Slider input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-mono text-xs text-[#F5F0E8]/70 font-semibold tracking-wide">
                MONTHLY TEST BUDGET (INR)
              </label>
              <span className="font-mono text-base text-[#C9A84C] font-bold">
                ₹{budget.toLocaleString("en-IN")}
              </span>
            </div>
            
            <input 
              type="range" 
              min="10000" 
              max="1000000" 
              step="10000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1C1C1C] rounded-lg appearance-none cursor-pointer accent-[#0062FF] border-none"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#F5F0E8]/35 mt-1">
              <span>₹10,000</span>
              <span>₹1,000,000+</span>
            </div>
          </div>

          {/* Selector input */}
          <div>
            <label className="block font-mono text-xs text-[#F5F0E8]/70 font-semibold tracking-wide mb-2.5">
              TARGET INDUSTRY VERTICAL
            </label>
            <div className="grid grid-cols-2 gap-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setIndustryId(ind.id)}
                  className={`p-3 text-left rounded-xl transition-all duration-300 border font-sans text-xs flex flex-col justify-between ${
                    industryId === ind.id 
                      ? "bg-[#0062FF]/15 border-[#0062FF] text-[#F5F0E8]" 
                      : "bg-[#0A0A0A]/40 border-white/[0.04] text-[#F5F0E8]/60 hover:border-white/10 hover:text-[#F5F0E8]"
                  }`}
                >
                  <span className="font-bold tracking-tight text-sm mb-1">{ind.name}</span>
                  <span className="font-mono text-[9px] text-[#C9A84C]/80 tracking-widest">{ind.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* OUTPUTS OUTPUT SIDE */}
        <div className="bg-void/60 border border-white/[0.04] rounded-xl p-5 md:p-6 space-y-4 flex flex-col justify-between h-full min-h-[220px]">
          <div className="space-y-4">
            {/* Reach indicator */}
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-3">
              <span className="font-sans text-xs text-[#F5F0E8]/50">EST. ORGANIC REACH / MO</span>
              <span className="font-mono text-base md:text-lg text-[#F5F0E8] font-bold tracking-tight">
                ~{reach.toLocaleString("en-IN")} Views
              </span>
            </div>

            {/* Inbound leads */}
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-3">
              <span className="font-sans text-xs text-[#F5F0E8]/50">EST. INBOUND LEADS / MO</span>
              <span className="font-mono text-base md:text-lg text-[#00D5FF] font-bold tracking-tight">
                ~{leads} Leads
              </span>
            </div>

            {/* ROI multiplication factor */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-sans text-xs text-[#F5F0E8]/50">MULTIPLIER HARVEST</span>
              <div className="flex items-center space-x-1 font-mono text-xl md:text-2xl text-[#C9A84C] font-black tracking-tighter">
                <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
                <span>{multiplier}x ROI</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04] text-center">
            <span className="block font-sans text-[11px] text-[#F5F0E8]/40 mb-2">Estimations generated via active brand alignment models.</span>
            <a 
              href="#contact"
              style={{ contentVisibility: "auto" }}
              className="inline-block text-xs font-mono font-extrabold uppercase tracking-widest text-[#0062FF] hover:text-[#00D5FF] transition-colors duration-300 animate-pulse"
            >
              WANT TO SECURE THESE NUMBERS? BOOK CALL →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
