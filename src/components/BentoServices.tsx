/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Layers, 
  Zap, 
  Plus 
} from "lucide-react";
import { ServiceCard } from "../types";

const SERVICE_WEAPONS: ServiceCard[] = [
  {
    id: "brand-strategy",
    title: "Brand Strategy & Identity",
    description: "Architecting unshakeable positioning. We define who you are, how you talk, and why the market cannot ignore you.",
    bullets: ["Competitor Gap Audits", "Brand Voice Profiles", "Visual DNA Manuals"],
    icon: "layers",
    isLarge: true,
  },
  {
    id: "content-strategy",
    title: "Content Marketing Strategy",
    description: "Designing frameworks that translate attention into concrete client pipeline hook acquisitions.",
    bullets: ["Scripting Blueprints", "Funnel Mapping", "Hook Psychology"],
    icon: "sparkles",
  },
  {
    id: "social-management",
    title: "Social Media Domination",
    description: "End-to-end management from ideation to post publishing across all social distribution hubs.",
    bullets: ["High-speed editing pipelines", "Distribution loops", "Vibrant community care"],
    icon: "users",
  },
  {
    id: "viral-consulting",
    title: "Viral Growth Consulting",
    description: "Surgical advisory audits aimed at scaling engagement ratios through viral compound loops.",
    bullets: ["Trend hijack scripting", "Rhythm pacing audits", "Algorithm triggers"],
    icon: "flame",
  },
  {
    id: "personal-brand",
    title: "Personal Branding Elite",
    description: "Transforming founders and creators into industry category-king absolute reference markers.",
    bullets: ["Executive ghostwriting", "PR spotlight placement", "Core expert positioning"],
    icon: "zap",
  },
  {
    id: "full-service",
    title: "Full-Service Marketing Plan",
    description: "The complete, relentless ecosystem setup. We handle strategy, execution, scale, and performance tracking.",
    bullets: ["All-inclusive visual production", "Paid ad channel support", "Direct fractional CMO support"],
    icon: "trending-up",
    isLarge: true,
  },
];

export default function BentoServices() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section 
      id="services-arsenal" 
      className="py-24 px-4 md:px-12 bg-[#0A0A0A] relative border-b border-white/[0.04] z-20"
    >
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#FF4500]/5 blur-[120px] rounded-full pointer-events-none select-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Header Block */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#FF4500] bg-[#FF4500]/10 px-3 py-1.5 rounded-full border border-[#FF4500]/20 mb-4 tracking-widest uppercase">
            <span>OFFERING // CORE ARSENAL</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#F5F0E8] tracking-tight leading-none uppercase">
            YOUR BRAND'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FF8C42]">ARSENAL</span>
          </h2>
          <p className="mt-3 font-sans text-sm md:text-base text-[#F5F0E8]/60 max-w-xl">
            Every elite weapon, distribution system, and growth framework required to dominate modern market attention.
          </p>
        </div>

        {/* Asymmetric Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_WEAPONS.map((service, index) => {
            const isLarge = service.isLarge;
            return (
              <BentoCard 
                key={service.id} 
                service={service} 
                index={index}
                isLarge={isLarge} 
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

interface BentoCardProps {
  service: ServiceCard;
  index: number;
  isLarge?: boolean;
  key?: string | number;
}

// 3D Tilting Bento Card Sub-component
function BentoCard({ service, index, isLarge }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalizing tilt factor (maximum 10 degrees)
    const tiltX = (y / (rect.height / 2)) * -10;
    const tiltY = (x / (rect.width / 2)) * 10;

    setCoords({ x: tiltY, y: tiltX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Render proper icon based on string map
  const renderIcon = (iconName: string) => {
    const props = { 
      className: `w-8 h-8 transition-transform duration-500 text-[#FF4500] group-hover:text-[#FF8C42] group-hover:scale-110 ${isHovered ? 'rotate-12' : ''}` 
    };

    switch (iconName) {
      case "layers": return <Layers {...props} />;
      case "sparkles": return <Sparkles {...props} />;
      case "users": return <Users {...props} />;
      case "flame": return <Flame {...props} />;
      case "zap": return <Zap {...props} />;
      case "trending-up": return <TrendingUp {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-magnetic
      style={{
        transform: `perspective(800px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: isHovered ? "none" : "transform 0.5s ease, box-shadow 0.5s ease",
      }}
      className={`relative rounded-2xl bg-[#111118]/80 border ${isHovered ? 'border-[#FF4500] shadow-[0_0_24px_rgba(255,69,0,0.25)]' : 'border-white/[0.04]'} p-8 flex flex-col justify-between overflow-hidden cursor-pointer group transition-all duration-300 ${
        isLarge ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Dynamic Background Ember Glow on Hover */}
      <div 
        className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-[#FF4500]/20 to-[#FF8C42]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none"
      />

      <div>
        {/* Icon & ID */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-void/60 border border-white/[0.04] rounded-xl relative">
            {renderIcon(service.icon)}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4500]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-mono text-xs text-[#C9A84C]/50 font-bold tracking-widest group-hover:text-[#C9A84C] transition-colors duration-300">
            WEAPON_0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-[#F5F0E8] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FF8C42] transition-colors duration-300 mb-3 tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-[#F5F0E8]/60 group-hover:text-[#F5F0E8]/85 transition-colors duration-300 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Detail Bullet Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/[0.03]">
          {service.bullets.map((b, i) => (
            <div key={i} className="flex items-center space-x-2 text-[11px] font-mono text-[#F5F0E8]/40 group-hover:text-[#F5F0E8]/70 transition-colors duration-300">
              <Plus className="w-3 h-3 text-[#FF4500]/60 shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Explore anchor */}
      <div className="mt-8 flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-[#FF4500] group-hover:text-[#FF8C42] transition-colors duration-300 self-start">
        <span>GET DEPLOYED</span>
        <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
      </div>
    </div>
  );
}
