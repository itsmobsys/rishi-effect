/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { AudioEngine } from "./AudioEngine";

interface FirstVisitGreetingProps {
  onNameSubmitted: (name: string) => void;
}

export default function FirstVisitGreeting({ onNameSubmitted }: FirstVisitGreetingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check localStorage for prior submission
    const stored = localStorage.getItem("rishi_visitor_name");
    if (!stored) {
      // Small reveal timer delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      onNameSubmitted(stored);
    }
  }, [onNameSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    AudioEngine.playTick();
    const finalName = userName.trim();
    localStorage.setItem("rishi_visitor_name", finalName);
    onNameSubmitted(finalName);
    AudioEngine.playChimeChord();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4">
      {/* Blurred Back Canvas Backdrop */}
      <div 
        className="absolute inset-0 bg-void/90 backdrop-blur-md animate-fadeIn" 
        onClick={() => setIsOpen(false)}
      />

      {/* Greeting Modal Screen */}
      <div className="relative w-full max-w-md bg-[#111118]/80 border border-[#0062FF]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,98,255,0.3)] animate-scaleIn select-none z-10">
        <div className="p-1 bg-gradient-to-r from-[#0062FF] to-[#00D5FF]" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[#F5F0E8]/40 hover:text-[#F5F0E8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#0062FF]/10 border border-[#0062FF]/35 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-5 h-5 text-[#0062FF]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-black text-[#F5F0E8] tracking-tight uppercase">
              GRID VISITOR IDENTIFICATION
            </h3>
            <p className="font-sans text-xs text-[#F5F0E8]/50 uppercase tracking-widest font-bold">
              Before we talk brand growth metrics... What should we call you?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1.5 font-bold">YOUR NAME OR COMPANY BRAND</label>
              <input 
                type="text" 
                required
                maxLength={25}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Captain Stark / Tesla Co"
                className="w-full bg-void border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[#0062FF] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(0,98,255,0.25)]"
            >
              INITIALIZE WORKSPACE CONNECTION
            </button>
          </form>

          <p className="font-mono text-[8px] text-[#F5F0E8]/30 uppercase tracking-widest">
            Identity credentials preserved locally inside your client session state.
          </p>
        </div>
      </div>
    </div>
  );
}
