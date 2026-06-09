/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Copy, Mail, MessageSquare, Phone, CheckCircle2, Globe } from "lucide-react";
import { AudioEngine } from "./AudioEngine";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    goal: "",
    budget: "50-100k",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // States for particle burst
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handling email copy
  const handleCopyEmail = () => {
    AudioEngine.playTick();
    navigator.clipboard.writeText("rishi@therishieffect.com");
    setCopied(true);
    showToast("Copied email! Now actually send the mail.");
    setTimeout(() => setCopied(false), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Rotating Globe Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    // Client nodes coordinates (India, Dubai, London, New York)
    const clientNodes = [
      { lat: 20.5937, lon: 78.9629, label: "India Base" }, // India
      { lat: 25.2048, lon: 55.2708, label: "Dubai Hub" }, // Dubai
      { lat: 51.5074, lon: -0.1278, label: "London Hub" }, // London
      { lat: 40.7128, lon: -74.0060, label: "New York Hub" }, // US
    ];

    const resizeGlobe = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight || 300;
    };

    resizeGlobe();
    window.addEventListener("resize", resizeGlobe);

    const drawGlobe = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.4;

      angle += 0.006; // Rotation speed

      // 1. Draw outer glowing outline
      ctx.strokeStyle = "rgba(255, 69, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Atmospheric glow around globe
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.05);
      glowGrad.addColorStop(0, "rgba(255, 69, 0, 0)");
      glowGrad.addColorStop(1, "rgba(255, 69, 0, 0.08)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Latitude & Longitude wires
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 0.5;

      // Draw horizontal parallels
      for (let i = -4; i <= 4; i++) {
        const yOffset = (i / 5) * radius;
        const parallelRad = Math.sqrt(radius * radius - yOffset * yOffset);
        
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, parallelRad, parallelRad * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw vertical meridians
      for (let i = 0; i < 4; i++) {
        // Rotate meridians by active angle
        const currentMeridianAngle = angle + (i * Math.PI) / 4;
        const ellipseWidth = radius * Math.sin(currentMeridianAngle);

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(ellipseWidth), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Draw client node spots with blinking amber glows
      clientNodes.forEach((node, idx) => {
        // Translate node coordinates to rotating sphere representation
        // We use simple trig projection mapping based on latitude and longitude
        const nodeAngle = (node.lon * Math.PI) / 180 + angle;
        const cosLat = Math.cos((node.lat * Math.PI) / 180);
        const sinLat = Math.sin((node.lat * Math.PI) / 180);

        // Map relative 3D coordinate point depth
        const x3d = radius * cosLat * Math.sin(nodeAngle);
        const z3d = radius * cosLat * Math.cos(nodeAngle);
        const y3d = radius * -sinLat; // Negative lat maps up on 2D screen coordinate

        // Only draw node index if it's on the front-facing hemisphere (z3d > 0)
        if (z3d > 0) {
          const px = cx + x3d;
          const py = cy + y3d;

          // Blinking glowing ripple size
          const pulseFactor = Math.abs(Math.sin(Date.now() / 250 - idx));
          const ringRad = 6 + pulseFactor * 12;

          ctx.fillStyle = "rgba(0, 98, 255, 0.12)";
          ctx.beginPath();
          ctx.arc(px, py, ringRad, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(0, 98, 255, ${0.4 + pulseFactor * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#00D5FF";
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();

          // Anchor label text
          ctx.fillStyle = "rgba(245, 240, 248, 0.45)";
          ctx.font = "8px monospace";
          ctx.fillText(node.label, px + 8, py - 4);
        }
      });

      animId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      window.removeEventListener("resize", resizeGlobe);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    AudioEngine.playTick();
    setSubmitting(true);

    // Save lead details to localStorage
    const newLead = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      goal: formData.goal,
      budget: formData.budget,
      message: formData.message,
      createdAt: new Date().toISOString()
    };
    try {
      const existingLeads = JSON.parse(localStorage.getItem("rishi_leads") || "[]");
      existingLeads.unshift(newLead);
      localStorage.setItem("rishi_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.error("Failed to save lead record", err);
    }

    // Simulate server dispatch latency
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      AudioEngine.playChimeChord();
      showToast("SYSTEM ENGAGED. Deploying campaign strategy coordinates!");
    }, 1500);
  };

  return (
    <section 
      id="contact"
      className="py-24 px-4 md:px-12 bg-void relative border-t border-white/[0.04] z-20 min-h-screen flex items-center"
    >
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#0062FF]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C9A84C]/5 blur-[120px] rounded-full" />

      {/* Floating Toast Notification Popups */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-[#111118] border border-[#0062FF] text-white px-5 py-4 rounded-xl shadow-[0_4px_30px_rgba(0,98,255,0.3)] animate-fadeIn flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full relative">
        <div>
          
          {/* DIRECT CALLS & CONTACT INPUTS */}
          <div className="space-y-8">
            
            {/* Direct Connect Quick options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Message WhatsApp direct button */}
              <a 
                href="https://wa.me/917043206427?text=Hey%20Rishi!%20I'm%20ready%20to%20grow%20my%20brand.%20Let's%20go."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => AudioEngine.playTick()}
                data-magnetic
                className="bg-[#111118]/80 hover:bg-[#111118] border border-emerald-500/25 p-5 rounded-2xl flex items-center justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl relative">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-emerald-500 font-bold block uppercase tracking-wider mb-0.5">💬 Message WhatsApp</span>
                    <span className="font-sans text-xs text-[#F5F0E8]/60 group-hover:text-white transition-colors duration-300">+91 70432 06427</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse shrink-0 hidden sm:block">
                  ● RESPONDS &lt; 1HR
                </div>
              </a>

              {/* Copy email direct click button */}
              <button 
                onClick={handleCopyEmail}
                data-magnetic
                className="bg-[#111118]/80 hover:bg-[#111118] border border-[#C9A84C]/25 p-5 rounded-2xl flex items-center justify-between group cursor-pointer transition-all duration-300 text-left w-full"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#C9A84C]/10 rounded-xl">
                    <Mail className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#C9A84C] font-bold block uppercase tracking-wider mb-0.5">📋 CLICK TO COPY EMAIL</span>
                    <span className="font-sans text-xs text-[#F5F0E8]/60 group-hover:text-white transition-colors duration-300">rishi@therishieffect.com</span>
                  </div>
                </div>
                <Copy className="w-4 h-4 text-[#C9A84C]/40 group-hover:text-[#C9A84C] transition-colors duration-300" />
              </button>

            </div>



            {/* MAIN CONTACT SUBMISSION INPUT */}
            <div className="bg-[#111118]/80 border border-white/[0.04] rounded-2xl p-6 md:p-8 relative">
              <h4 className="font-display text-lg font-bold text-[#F5F0E8] mb-6 tracking-tight select-none">
                SECURE CAMPAIGN DEPLOYMENT TELEPATHY
              </h4>

              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1">YOUR NAME</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ristunjay Rao"
                        className="w-full bg-void/50 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[#0062FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1">BRAND / CORPORATE ID</label>
                      <input 
                        type="text" 
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g. Cosmic Slayers LLC"
                        className="w-full bg-void/50 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[#0062FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1">PRIMARY CONVERSION GOAL</label>
                      <input 
                        type="text" 
                        required
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        placeholder="e.g. Scale organic follower leads"
                        className="w-full bg-void/50 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[#0062FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1">BUDGET RANGE (INR / MO)</label>
                      <select 
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-void/50 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8]/80 focus:outline-none focus:border-[#0062FF] transition-colors"
                      >
                        <option value="Under 50k">Under ₹50,000</option>
                        <option value="50-100k">₹50,000 - ₹100,000</option>
                        <option value="100-250k">₹100,000 - ₹250,000</option>
                        <option value="250k+">₹250,000+ // ULTIMATE INTENSITY</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1">WAR ROOM DISPATCH (BRIEF NOTES)</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline any key performance friction blocks..."
                      className="w-full bg-void/50 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[#0062FF] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    data-magnetic
                    disabled={submitting}
                    className="w-full py-4 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,98,255,0.3)] disabled:opacity-50 transform hover:scale-[1.01]"
                  >
                    {submitting ? "ENCRYPTING COGNITIVE DISPATCH..." : "DEPLOY CAMPAIGN SPECIFICATIONS SYSTEM →"}
                  </button>

                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-scaleIn">
                  <CheckCircle2 className="w-16 h-16 text-[#C9A84C] mx-auto animate-pulse" />
                  <h5 className="font-display text-xl font-bold text-[#F5F0E8] tracking-tight">COGNITIVE ENGAGEMENT SUCCESSFUL</h5>
                  <p className="font-sans text-xs text-[#F5F0E8]/60 max-w-sm mx-auto leading-relaxed">
                    Greetings, <strong className="text-white">{formData.name}</strong> of <strong className="text-white">{formData.brand}</strong>. Your performance metrics dispatch has updated the local host telemetry. Rishi's strategist circle will review shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 font-mono text-[10px] text-[#0062FF] uppercase tracking-widest underline decoration-dotted decoration-1"
                  >
                    RE-DEPLOY DISPATCH GRID
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
