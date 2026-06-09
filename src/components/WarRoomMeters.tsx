/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

export default function WarRoomMeters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  
  // States of ticker counters
  const [satisfaction, setSatisfaction] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [repeat, setRepeat] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate values up when visible
  useEffect(() => {
    if (!animate) return;

    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      
      setSatisfaction(Math.min(98, Math.round((98 / steps) * step)));
      setDelivery(Math.min(100, Math.round((100 / steps) * step)));
      setRepeat(Math.min(74, Math.round((74 / steps) * step)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [animate]);

  // Radial arc gauge drawing configurations
  const renderRadialGauge = (label: string, value: number, targetValue: number, colorClass: string) => {
    const radius = 50;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    // We only traverse an arc of 270 degrees (leaving bottom 90 degrees open)
    const arcLength = circumference * 0.75;
    const strokeDashoffset = arcLength - (value / 100) * arcLength;
    
    // Needle rotation calculation for the 270 deg span (starts at -135deg, ends at +135deg)
    const needleRot = -135 + (value / 100) * 270;

    return (
      <div className="flex flex-col items-center bg-void/40 border border-[#FF4500]/10 backdrop-blur-md rounded-2xl p-6 relative group hover:border-[#FF4500]/30 transition-all duration-500">
        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#C9A84C] opacity-40">TR-EFFECT // {label.toUpperCase().replace(/\s/g, "_")}</div>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circular track (270 degrees) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              className="transform rotate-[135deg]"
              style={{ transformOrigin: "50% 50%" }}
            />
            {/* Active gauge line */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#radialEmberGleam)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transform rotate-[135deg] transition-all duration-300 ease-out"
              style={{ transformOrigin: "50% 50%" }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="radialEmberGleam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="100%" stopColor="#C9A84C" />
              </linearGradient>
            </defs>
          </svg>



          {/* Center core numerical readout */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-black text-[#F5F0E8] tracking-tighter">
              {value}%
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#FF8C42]">
              TARGET
            </span>
          </div>
        </div>

        <h4 className="mt-4 font-display text-sm font-bold text-[#F5F0E8] tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
          {label}
        </h4>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[500px] w-full bg-[#0A0A0A] border-y border-white/[0.04] py-20 px-4 md:px-12 overflow-hidden z-20"
    >
      {/* Tactical Coordinate Radar Map Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #FF4500 1px, transparent 1px),
            linear-gradient(to bottom, #FF4500 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.06)_0%,transparent_70%)] pointer-events-none" />



      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Scrambling Glitch-like Title Grid */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#C9A84C] bg-[#FF4500]/10 px-3 py-1.5 rounded-full border border-[#FF4500]/20 mb-3 tracking-widest uppercase">
            <span>● DEPLOYMENT STATS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#F5F0E8] tracking-tight">
            THE NUMBERS <span className="text-[#FF4500]">DON'T LIE</span>
          </h2>
          <p className="mt-3 font-sans text-[#F5F0E8]/60 max-w-lg mx-auto text-sm">
            Audited performance telemetry compiled from 8 years of live campaign strategy and real system output.
          </p>
        </div>

        {/* Major Content Dual Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: 3 Radial Gauges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {renderRadialGauge("Client Satisfaction", satisfaction, 98, "text-[#FF4500]")}
            {renderRadialGauge("On-Time Delivery", delivery, 100, "text-emerald-500")}
            {renderRadialGauge("Repeat Clients", repeat, 74, "text-amber-500")}
          </div>

          {/* RIGHT: Horizontal Progress Bar Meters */}
          <div className="lg:col-span-5 bg-[#111118]/60 border border-[#FF4500]/10 rounded-2xl p-8 backdrop-blur-md relative">
            <h3 className="font-display text-lg font-bold text-[#F5F0E8] mb-6 tracking-tight flex items-center justify-between">
              <span>WAR ROOM TELEMETRY</span>
              <span className="font-mono text-[10px] text-[#C9A84C] font-normal uppercase tracking-widest">LIVE MULTIPLIER</span>
            </h3>

            <div className="space-y-6">
              
              {/* Meter 1: Brands Scaled */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-xs text-[#F5F0E8]/70 font-semibold uppercase tracking-wider">
                    Brands Scaled to 10K+ Followers
                  </span>
                  <span className="font-mono text-sm text-[#C9A84C] font-bold">
                    {animate ? "28 CLIENTS" : "0 CLIENTS"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#1C1C1C] rounded-full overflow-hidden relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF4500] to-[#FF8C42] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "88%" : "0%" }}
                  />
                </div>
              </div>

              {/* Meter 2: Avg Engagement Increase */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-xs text-[#F5F0E8]/70 font-semibold uppercase tracking-wider">
                    Avg Engagement Multiplying Force
                  </span>
                  <span className="font-mono text-sm text-[#FF4500] font-bold">
                    {animate ? "3.4X INCREASE" : "1.0X"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#1C1C1C] rounded-full overflow-hidden relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF4500] to-[#C9A84C] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "78%" : "0%" }}
                  />
                </div>
              </div>

              {/* Meter 3: Avg Monthly Content Creation */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-xs text-[#F5F0E8]/70 font-semibold uppercase tracking-wider">
                    Avg Content Pieces Built / Mo
                  </span>
                  <span className="font-mono text-sm text-[#F5F0E8] font-bold">
                    {animate ? "30+ PIECES" : "0"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#1C1C1C] rounded-full overflow-hidden relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF8C42] to-[#FF4500] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "62%" : "0%" }}
                  />
                </div>
              </div>

              {/* Meter 4: Platforms Managed */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-xs text-[#F5F0E8]/70 font-semibold uppercase tracking-wider">
                    Simultaneous Channels Orchestrated
                  </span>
                  <span className="font-mono text-sm text-[#C9A84C] font-bold">
                    {animate ? "6+ PLATFORMS" : "0"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#1C1C1C] rounded-full overflow-hidden relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9A84C] to-[#FF8C42] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "85%" : "0%" }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
