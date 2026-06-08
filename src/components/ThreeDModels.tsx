import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * 3D Camera Component
 * Features: Multi-faced camera body, cylindrical layered lens barrel, glass lens face, top dials
 */
export const ThreeDCamera: React.FC = () => {
  return (
    <div
      className="relative w-44 h-44 flex items-center justify-center select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: "rotateX(12deg) rotateY(15deg) rotateZ(0deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-36 h-24 duration-700 ease-out transition-all"
      >
        {/* Continuous Auto-Rotate base element (Disabled as requested, purely static base) */}
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* CAMERA BODY (CUBE) */}
          {/* Front */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#1E2025] to-[#2B2E36] border border-[#3A3F4B] rounded-lg shadow-[inset_0_1px_4px_rgba(255,255,255,0.15)] flex items-center justify-center"
            style={{
              transform: "translate3d(0, 0, 25px)",
              transformStyle: "preserve-3d",
              boxShadow: "0 0 1px #1E2025",
            }}
          >
            {/* Grip Leatherette texture */}
            <div className="absolute inset-1.5 bg-[#141518] rounded-md opacity-90 border border-black/20" />
            
            {/* Red recording LED indicator */}
            <span className="absolute top-3 left-4 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-3 left-4 w-1.5 h-1.5 bg-red-500 rounded-full" />
            
            {/* Elegant luxury visual badge grid (Zero-text) */}
            <div className="absolute top-3 right-4 flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full blur-[1px]" />
              <div className="w-2.5 h-1 bg-royal-silver/40 rounded-xs" />
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-[#16171B] border border-[#2B2E36] rounded-lg flex items-center justify-center"
            style={{
              transform: "translate3d(0, 0, -25px) rotateY(180deg)",
              boxShadow: "0 0 1px #16171B"
            }}
          >
            {/* LCD Screen representation containing only vectors, zero text */}
            <div className="w-[85%] h-[75%] bg-[#08080A] rounded border border-slate-850/80 relative flex items-center justify-center overflow-hidden">
              {/* Corner focus ticks */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-royal-blue/60" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-royal-blue/60" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-royal-blue/60" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-royal-blue/60" />
              
              {/* Audio/Status Levels Bar block */}
              <div className="absolute bottom-1.5 left-2 right-2 h-1.5 flex gap-0.5 items-end">
                <div className="h-1 w-1 bg-emerald-500/80" />
                <div className="h-2 w-1 bg-emerald-500/80" />
                <div className="h-1.5 w-1 bg-emerald-500/80" />
                <div className="h-0.5 w-1 bg-yellow-500/80" />
              </div>

              {/* Glowing circular reticle */}
              <div className="w-6 h-6 rounded-full border border-dashed border-royal-blue/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-royal-blue/10 border border-royal-blue/40" />
              </div>
            </div>
          </div>

          {/* Top Face */}
          <div
            className="absolute left-0 right-0 h-[50px] bg-gradient-to-b from-[#333742] to-[#1E2025] border-x border-[#3A3F4B] flex items-center justify-around px-3"
            style={{
              transform: "rotateX(90deg) translate3d(0, 0, 48px)",
              top: "23px",
              transformStyle: "preserve-3d",
              boxShadow: "0 0 1px #1E2025",
            }}
          >
            {/* Mode Dial 3D Wheel representation */}
            <div
              className="w-5 h-4 bg-[#141518] rounded-sm border border-[#444] flex flex-col justify-between"
              style={{ transform: "translateZ(8px) rotateX(15deg)" }}
            >
              <div className="h-0.5 bg-royal-silver/30 w-full" />
              <div className="h-0.5 bg-royal-silver/30 w-full" />
              <div className="h-0.5 bg-royal-silver/30 w-full" />
            </div>

            {/* Shutter Button */}
            <div
              className="w-4 h-4 rounded-full bg-gradient-to-b from-royal-silver to-[#666] border border-black shadow-md cursor-pointer hover:brightness-110 active:translate-y-0.5 transition-all"
              style={{ transform: "translateZ(12px)" }}
            />

            {/* Hot shoe mount */}
            <div className="w-6 h-1.5 bg-[#4B5263] border border-black rounded-xs" />
          </div>

          {/* Bottom Face */}
          <div
            className="absolute left-0 right-0 h-[50px] bg-[#141518] border-x border-[#2B2E36]"
            style={{
              transform: "rotateX(-90deg) translate3d(0, 0, 48px)",
              top: "23px",
              boxShadow: "0 0 1px #141518",
            }}
          />

          {/* Left Face */}
          <div
            className="absolute top-0 bottom-0 w-[50px] bg-[#1A1C21] border-y border-[#2B2E36]"
            style={{
              transform: "rotateY(-90deg) translate3d(0, 0, 72px)",
              left: "47px",
              boxShadow: "0 0 1px #1A1C21",
            }}
          />

          {/* Right Face */}
          <div
            className="absolute top-0 bottom-0 w-[50px] bg-[#1A1C21] border-y border-[#2B2E36]"
            style={{
              transform: "rotateY(90deg) translate3d(0, 0, 72px)",
              left: "47px",
              transformStyle: "preserve-3d",
              boxShadow: "0 0 1px #1A1C21",
            }}
          >
            {/* Cover slot flap (Zero text) */}
            <div className="absolute inset-2 bg-[#121316] border border-slate-700 rounded-sm flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <div className="w-3 h-1 bg-slate-600 rounded-xs" />
            </div>
          </div>

          {/* CYLINDRICAL CAMERA LENS (Protruding from front face) */}
          <div
            className="absolute left-[28px] top-[12px] w-20 h-20 origin-center"
            style={{
              transform: "translateZ(26px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Outer Lens Barrel Segment 1 */}
            <div
              className="absolute inset-0 rounded-full border-2 border-slate-600 bg-gradient-to-tr from-[#141518] to-[#202228] shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              style={{ transform: "translateZ(8px)", transformStyle: "preserve-3d" }}
            >
              {/* Ridged focus ring texture */}
              <div className="absolute inset-1.5 rounded-full border border-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-[#121315]">
                
                {/* Secondary Protrusion Stage 2 */}
                <div
                  className="absolute inset-1.5 rounded-full border border-slate-700 bg-gradient-to-br from-[#101113] to-[#25282E]"
                  style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}
                >
                  
                  {/* Glass Shimmer Reflection & Lens Aperture */}
                  <div
                    className="absolute inset-2 rounded-full bg-[#050608] border border-black flex items-center justify-center overflow-hidden"
                    style={{ transform: "translateZ(6px)" }}
                  >
                    {/* Glass glare effect lines */}
                    <div className="absolute inset-0 bg-[#020514]" />
                    
                    {/* Aperture iris lines */}
                    <div className="w-7 h-7 rounded-full border border-teal-500/30 relative flex items-center justify-center bg-[#070F1F]">
                      <div className="absolute w-5 h-5 rounded-full bg-radial-gradient from-teal-500/20 to-blue-500/40 opacity-75" />
                      {/* Reflection shine */}
                      <div className="absolute top-1 left-1.5 w-4 h-1 bg-white/40 rounded-full rotate-[35deg] blur-[0.5px]" />
                      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px] opacity-80" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Floating Ambient Floor Shadow */}
      <motion.div
        animate={{ scale: [1, 0.78, 1], opacity: [0.3, 0.14, 0.3], filter: ["blur(4.5px)", "blur(7px)", "blur(4.5px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 w-28 h-2 bg-[#00F0FF]/25 rounded-full select-none pointer-events-none"
      />
    </div>
  );
};

/**
 * 3D Script Book Component
 * Features: Realistic 3D book cover, detailed sheets/pages edge, spine print, elegant slow rotation
 */
export const ThreeDBook: React.FC = () => {
  return (
    <div
      className="relative w-44 h-52 flex items-center justify-center select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: "rotateX(15deg) rotateY(-20deg) rotateZ(0deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-28 h-40 duration-700 ease-out transition-all"
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* BOOK FRONT COVER */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#0F3523] to-[#1D5E3F] border border-emerald-500/30 rounded-r-md shadow-[5px_5px_15px_rgba(0,0,0,0.5)] flex flex-col justify-between p-3.5 z-10"
            style={{
              transform: "translate3d(0, 0, 14px)",
              transformStyle: "preserve-3d",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 3px 0 10px rgba(0,0,0,0.4), 0 0 1px #1D5E3F"
            }}
          >
            {/* Gold Filigree Border */}
            <div className="absolute inset-1.5 border border-royal-gold/45 rounded-sm opacity-60 pointer-events-none" />
            
            {/* Book Header (Ornamental instead of text) */}
            <div className="flex justify-between items-center text-[7px] font-mono text-royal-gold/80 tracking-widest font-black uppercase">
              <span>✦</span>
              <span>✦ ✦</span>
              <span>✦</span>
            </div>

            {/* Book Title & Icon Representation */}
            <div className="my-auto text-center flex flex-col items-center gap-1.5" style={{ transform: "translateZ(6px)" }}>
              <div className="w-5 h-5 text-royal-gold/90 border border-royal-gold/30 rounded flex items-center justify-center bg-emerald-950/40 text-[9px]">
                ✦
              </div>
              <h4 className="text-[10px] font-sans font-medium text-white/95 tracking-widest leading-none mt-1">
                CAMPAIGN
              </h4>
              <h5 className="text-[12px] font-serif font-black text-royal-gold tracking-widest leading-none">
                SCRIPT
              </h5>
              <div className="w-8 h-[1px] bg-royal-gold/40 mt-1" />
            </div>

            {/* Book Footer tag */}
            <div className="text-[6px] font-mono text-center text-[#94A3B8]/85 uppercase tracking-[0.2em]">
              THE PLAYBOOK
            </div>
          </div>

          {/* BOOK BACK COVER */}
          <div
            className="absolute inset-0 bg-gradient-to-bl from-[#0A2619] to-[#12412B] border border-emerald-500/20 rounded-l-md"
            style={{
              transform: "translate3d(0, 0, -14px) rotateY(180deg)",
              boxShadow: "-3px 0 10px rgba(0,0,0,0.4), 0 0 1px #0A2619"
            }}
          >
            <div className="absolute inset-1.5 border border-royal-gold/25 rounded-sm opacity-35" />
            <div className="absolute inset-4 flex items-center justify-center">
              <span className="text-[9px] font-mono text-royal-gold/40">✦</span>
            </div>
          </div>

          {/* BOOK SPINE (Left edge) */}
          <div
            className="absolute top-0 bottom-0 w-[28px] bg-gradient-to-r from-[#0B2A1C] to-[#1C5B3D] border-y border-emerald-600/30 flex flex-col justify-between py-4 items-center"
            style={{
              transform: "rotateY(-90deg) translate3d(0, 0, 56px)",
              left: "42px",
              boxShadow: "0 0 1px #0B2A1C",
            }}
          >
            {/* Text running vertically along spine */}
            <span className="text-[6px] font-serif font-bold text-royal-gold/75 uppercase tracking-widest rotate-90 my-auto whitespace-nowrap">
              * THE SCRIPT *
            </span>
            <span className="text-[5px] font-mono text-royal-gold/40">✦</span>
          </div>

          {/* BOOK TOP PAGES (Sheet texture) */}
          <div
            className="absolute left-0 right-0 h-[28px] bg-[#EFEFE9] border border-slate-300 flex flex-col justify-between"
            style={{
              transform: "rotateX(90deg) translate3d(0, 0, 80px)",
              top: "66px",
              boxShadow: "0 0 1px #EFEFE9",
            }}
          >
            {/* Layered page texture lines */}
            <div className="h-px bg-slate-300/40 w-full" />
            <div className="h-px bg-slate-300/40 w-full" />
            <div className="h-px bg-slate-300/40 w-full" />
            <div className="h-px bg-slate-300/40 w-full" />
            <div className="h-px bg-slate-300/45 w-full" />
          </div>

          {/* BOOK BOTTOM PAGES */}
          <div
            className="absolute left-0 right-0 h-[28px] bg-[#EFEFE9] border border-slate-300"
            style={{
              transform: "rotateX(-90deg) translate3d(0, 0, 80px)",
              top: "66px",
              boxShadow: "0 0 1px #EFEFE9",
            }}
          />

          {/* BOOK RIGHT PAGE EDGES (Serrated textured layered sheets) */}
          <div
            className="absolute top-0 bottom-0 w-[28px] bg-gradient-to-r from-[#ECECE6] to-[#FFF] border-y border-r border-[#D2D2CA] flex justify-center items-center overflow-hidden"
            style={{
              transform: "rotateY(90deg) translate3d(0, 0, 56px)",
              left: "42px",
              boxShadow: "0 0 1px #ECECE6",
            }}
          >
            {/* Generates hundreds of minute sheet lines via linear-gradient */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(to bottom, #CCC 1px, transparent 1px)",
                backgroundSize: "100% 3px",
              }}
            />
            {/* Golden Ribbon Page Marker dangling out from the sheets bottom */}
            <div
              className="absolute bottom-[-10px] left-3 w-2.5 h-10 bg-[#BC2F2F] rounded-b-xs shadow-md border-r border-black/10 origin-top"
              style={{ transform: "rotateX(25deg) translateZ(2px)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Ambient Floor Shadow */}
      <motion.div
        animate={{ scale: [1, 0.78, 1], opacity: [0.28, 0.12, 0.28], filter: ["blur(4.5px)", "blur(7px)", "blur(4.5px)"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 w-28 h-2 bg-[#D4AF37]/20 rounded-full select-none pointer-events-none"
      />
    </div>
  );
};

/**
 * 3D Adobe Premiere Pro Component
 * Features: High-intensity glowing hologram model, floating, custom colored edges, true "Pr" branding
 */
export const ThreeDPremierePro: React.FC = () => {
  return (
    <div
      className="relative w-44 h-44 flex items-center justify-center select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: "rotateX(15deg) rotateY(25deg) rotateZ(0deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-26 h-26 duration-700 ease-out transition-all"
      >
        {/* Cube base element (No continuous auto-rotation) */}
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* ADOBE CUBE FACES */}
          {/* Front Face with illuminated "Pr" Logo */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#100121] to-[#250346] border-2 border-[#BC70FF] rounded-lg shadow-[0_0_25px_rgba(188,112,255,0.45)] flex flex-col justify-center items-center z-10"
            style={{
              transform: "translate3d(0, 0, 52px)",
              transformStyle: "preserve-3d",
              boxShadow: "inset 0 0 15px rgba(188,112,255,0.3), 0 0 25px rgba(188,112,255,0.4), 0 0 1px #BC70FF"
            }}
          >
            {/* Internal nested layout representation */}
            <div className="absolute inset-1.5 border border-[#BC70FF]/40 rounded-xs pointer-events-none" />
            
            {/* "Pr" Typography with dynamic drop shadow */}
            <span
              className="text-4xl font-sans font-black text-[#BC70FF] tracking-tighter select-none filter drop-shadow-[0_0_12px_rgba(188,112,255,0.7)]"
              style={{ textShadow: "0 0 20px rgba(188,112,255,0.95)" }}
            >
              Pr
            </span>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 bg-gradient-to-tl from-[#100121] to-[#1E023A] border border-[#BC70FF]/70 rounded-lg flex flex-col items-center justify-center"
            style={{
              transform: "translate3d(0, 0, -52px) rotateY(180deg)",
              boxShadow: "0 0 1px #BC70FF",
            }}
          >
            {/* Minimalist brand engraving on the back side */}
            <div className="absolute inset-1.5 border border-[#BC70FF]/25 rounded-xs" />
            <span className="text-[12px] font-sans font-black text-[#BC70FF]/70 uppercase tracking-widest">
              ADOBE
            </span>
            <span className="text-[8px] font-mono text-white/50 tracking-wide mt-1">
              PREMIERE PRO
            </span>
          </div>

          {/* Top Face */}
          <div
            className="absolute left-0 right-0 h-[104px] bg-gradient-to-b from-[#140228] to-[#0A0115] border-x border-[#BC70FF]/30 flex items-center justify-center"
            style={{
              transform: "rotateX(90deg) translate3d(0, 0, 52px)",
              top: 0,
              boxShadow: "0 0 1px #BC70FF",
            }}
          >
            <div className="w-16 h-px bg-[#BC70FF]/30 shadow-sm" />
          </div>

          {/* Bottom Face */}
          <div
            className="absolute left-0 right-0 h-[104px] bg-[#040008] border-x border-[#BC70FF]/25"
            style={{
              transform: "rotateX(-90deg) translate3d(0, 0, 52px)",
              top: 0,
              boxShadow: "0 0 1px #BC70FF",
            }}
          />

          {/* Left Face */}
          <div
            className="absolute top-0 bottom-0 w-[104px] bg-[#0E011E] border-y border-[#BC70FF]/30"
            style={{
              transform: "rotateY(-90deg) translate3d(0, 0, 52px)",
              left: 0,
              boxShadow: "0 0 1px #BC70FF",
            }}
          />

          {/* Right Face */}
          <div
            className="absolute top-0 bottom-0 w-[104px] bg-[#0E011E] border-y border-[#BC70FF]/30"
            style={{
              transform: "rotateY(90deg) translate3d(0, 0, 52px)",
              left: 0,
              boxShadow: "0 0 1px #BC70FF",
            }}
          />
        </div>
      </motion.div>

      {/* Floating Ambient Floor Shadow */}
      <motion.div
        animate={{ scale: [1, 0.78, 1], opacity: [0.35, 0.15, 0.35], filter: ["blur(4.5px)", "blur(7px)", "blur(4.5px)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 w-28 h-2 bg-[#BC70FF]/25 rounded-full select-none pointer-events-none"
      />
    </div>
  );
};

/**
 * Solid 3D Cuboid Helper for constructing solid structures with closed 3D sides.
 */
interface PoliticianCuboidProps {
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  z: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  colors: {
    front: string;
    back?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  children?: React.ReactNode;
}

const PoliticianCuboid: React.FC<PoliticianCuboidProps> = ({
  width,
  height,
  depth,
  x,
  y,
  z,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  colors,
  children,
}) => {
  const fColor = colors.front;
  const bColor = colors.back || colors.front;
  const lColor = colors.left || colors.front;
  const rColor = colors.right || colors.front;
  const tColor = colors.top || colors.front;
  const botColor = colors.bottom || colors.front;

  const hWidth = width / 2;
  const hHeight = height / 2;
  const hDepth = depth / 2;

  return (
    <div
      className="absolute"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate3d(0, 0, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front */}
      <div
        className="absolute"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: 0,
          top: 0,
          transform: `translate3d(0, 0, ${hDepth}px)`,
          backgroundColor: fColor,
          boxShadow: `0 0 1px ${fColor}`,
        }}
      >
        {children}
      </div>

      {/* Back */}
      <div
        className="absolute"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: 0,
          top: 0,
          transform: `translate3d(0, 0, ${-hDepth}px) rotateY(180deg)`,
          backgroundColor: bColor,
          boxShadow: `0 0 1px ${bColor}`,
        }}
      />

      {/* Left */}
      <div
        className="absolute"
        style={{
          width: `${depth}px`,
          height: `${height}px`,
          left: `${hWidth - hDepth}px`,
          top: 0,
          transform: `rotateY(-90deg) translate3d(0, 0, ${hWidth}px)`,
          backgroundColor: lColor,
          boxShadow: `0 0 1px ${lColor}`,
        }}
      />

      {/* Right */}
      <div
        className="absolute"
        style={{
          width: `${depth}px`,
          height: `${height}px`,
          left: `${hWidth - hDepth}px`,
          top: 0,
          transform: `rotateY(90deg) translate3d(0, 0, ${hWidth}px)`,
          backgroundColor: rColor,
          boxShadow: `0 0 1px ${rColor}`,
        }}
      />

      {/* Top */}
      <div
        className="absolute"
        style={{
          width: `${width}px`,
          height: `${depth}px`,
          left: 0,
          top: `${hHeight - hDepth}px`,
          transform: `rotateX(90deg) translate3d(0, 0, ${hHeight}px)`,
          backgroundColor: tColor,
          boxShadow: `0 0 1px ${tColor}`,
        }}
      />

      {/* Bottom */}
      <div
        className="absolute"
        style={{
          width: `${width}px`,
          height: `${depth}px`,
          left: 0,
          top: `${hHeight - hDepth}px`,
          transform: `rotateX(-90deg) translate3d(0, 0, ${hHeight}px)`,
          backgroundColor: botColor,
          boxShadow: `0 0 1px ${botColor}`,
        }}
      />
    </div>
  );
};

/**
 * 3D Politician Cartoon Style Component
 * Features: Pure solid 3D Indian Politician wearing Gandhi Cap, Nehru Vest & light-gray Kurta.
 * Hands folded in respectful "Namaste" Mudra. Fully enclosed solid cuboids prevent thin edges.
 * Stays 100% still without any rotation movement.
 */
export const ThreeDPolitician: React.FC = () => {
  return (
    <div
      className="relative w-44 h-44 flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(12deg) rotateY(15deg) rotateZ(0deg)", // Clean, high-impact static 3D perspective angle
        }}
        className="relative w-24 h-36 flex items-center justify-center transition-transform duration-300"
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* BACKGROUND LIGHT DISK (Provides beautiful contrasting glow behind the character) */}
          <div
            className="absolute left-[8px] top-8 w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500/10 to-royal-blue/15 blur-md"
            style={{ transform: "translateZ(-30px)" }}
          />

          {/* 3D SOLID POLITICIAN MODEL ASSEMBLY */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateY(-4px) scale(0.85)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. GANDHI CAP (Triangular Wedge shape on top of the head) */}
            {/* White Base band of cap */}
            <PoliticianCuboid
              width={26}
              height={8}
              depth={26}
              x={35}
              y={2}
              z={0}
              colors={{
                front: "#F8FAFC",
                back: "#E2E8F0",
                left: "#F1F5F9",
                right: "#F1F5F9",
                top: "#FFFFFF",
                bottom: "#E2E8F0",
              }}
            />
            {/* Left peaked fold */}
            <PoliticianCuboid
              width={14}
              height={10}
              depth={26}
              x={34}
              y={-5}
              z={0}
              rotateZ={-22}
              colors={{
                front: "#FFFFFF",
                back: "#DFE5ED",
                left: "#F8FAFC",
                right: "#E2E8F0",
                top: "#FFFFFF",
              }}
            />
            {/* Right peaked fold */}
            <PoliticianCuboid
              width={14}
              height={10}
              depth={26}
              x={48}
              y={-5}
              z={0}
              rotateZ={22}
              colors={{
                front: "#FFFFFF",
                back: "#DFE5ED",
                left: "#E2E8F0",
                right: "#F8FAFC",
                top: "#FFFFFF",
              }}
            />

            {/* 2. THE HEAD (Skin-tone block with black hair details & highly detailed facial vector features) */}
            <PoliticianCuboid
              width={26}
              height={26}
              depth={24}
              x={35}
              y={9}
              z={0}
              colors={{
                front: "#F5BE7F", // Face skin tone
                back: "#1E1E24",  // Hair back
                left: "#1E1E24",  // Hair side left
                right: "#1E1E24", // Hair side right
                top: "#F6C186",
                bottom: "#DF9E5B",
              }}
            >
              {/* Ears */}
              <div className="absolute top-[8px] -left-1.5 w-1.5 h-3 bg-[#F5BE7F] rounded-l-full border-r border-[#DF9E5B]/40" />
              <div className="absolute top-[8px] -right-1.5 w-1.5 h-3 bg-[#F5BE7F] rounded-r-full border-l border-[#DF9E5B]/40" />

              {/* Eyes */}
              <div className="absolute top-[7px] left-[4.5px] w-1.5 h-2 bg-[#121316] rounded-sm flex items-center justify-center">
                {/* Pupil Light Glint */}
                <div className="w-[1px] h-[1px] bg-white rounded-full absolute top-[0.5px] left-[0.5px]" />
              </div>
              <div className="absolute top-[7px] right-[4.5px] w-1.5 h-2 bg-[#121316] rounded-sm flex items-center justify-center">
                {/* Pupil Light Glint */}
                <div className="w-[1px] h-[1px] bg-white rounded-full absolute top-[0.5px] left-[0.5px]" />
              </div>

              {/* Eyebrows */}
              <div className="absolute top-[4.5px] left-[3.5px] w-2 h-[1px] bg-[#1E1E24] rounded-sm -rotate-6" />
              <div className="absolute top-[4.5px] right-[3.5px] w-2 h-[1px] bg-[#1E1E24] rounded-sm rotate-6" />

              {/* Nose */}
              <div className="absolute top-[10.5px] left-[10px] w-1.5 h-2 bg-[#DF9E5B] rounded-xs" />

              {/* Traditional Curved Mustache (Neat Indian Politician Style) */}
              <div className="absolute top-[13.5px] left-[4px] right-[4px] h-2 flex items-center justify-center" style={{ transform: "translateZ(1px)" }}>
                {/* Left wing */}
                <div className="w-[8px] h-1.5 bg-[#121316] rounded-l-full rotate-[12deg] -mr-[1px]" />
                {/* Center bridge */}
                <div className="w-[1.5px] h-[1px] bg-[#121316]" />
                {/* Right wing */}
                <div className="w-[8px] h-1.5 bg-[#121316] rounded-r-full -rotate-[12deg] -ml-[1px]" />
              </div>

              {/* Confidence Smile / Mouth */}
              <div className="absolute top-[17px] left-1/2 -translate-x-1/2 w-4 h-1 px-[0.5px] border-b-[1.5px] border-[#8A2121] rounded-b-full" />
            </PoliticianCuboid>

            {/* 3. NECK & WHITE KURTA COLLAR */}
            <PoliticianCuboid
              width={14}
              height={6}
              depth={14}
              x={41}
              y={34}
              z={0}
              colors={{
                front: "#FFFFFF",
                back: "#E2E8F0",
                left: "#F1F5F9",
                right: "#F1F5F9",
                top: "#DF9E5B",
              }}
            />

            {/* 4. THE NEHRU JACKET (Dark navy blue over tunic) */}
            <PoliticianCuboid
              width={34}
              height={38}
              depth={22}
              x={31}
              y={39}
              z={0}
              colors={{
                front: "#162B55", // Premium deep Navy
                back: "#0D1B36",
                left: "#102143",
                right: "#102143",
                top: "#233F75",
                bottom: "#0A1224",
              }}
            >
              {/* Shiny Gold buttons on jacket front */}
              <div className="absolute inset-y-1.5 left-1/2 -translate-x-1/2 flex flex-col justify-around items-center">
                <div className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full shadow-[0_0_4px_rgba(255,191,0,0.6)]" />
                <div className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full shadow-[0_0_4px_rgba(255,191,0,0.6)]" />
                <div className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full shadow-[0_0_4px_rgba(255,191,0,0.6)]" />
                <div className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full shadow-[0_0_4px_rgba(255,191,0,0.6)]" />
              </div>
            </PoliticianCuboid>

            {/* 5. KURTA TUNIC BODY SKIRT (Peeking below the vest) */}
            <PoliticianCuboid
              width={32}
              height={26}
              depth={20}
              x={32}
              y={76}
              z={0}
              colors={{
                front: "#E2E8F0", // Clean light-gray
                back: "#CBD5E1",
                left: "#D8DFE7",
                right: "#D8DFE7",
                top: "#FFFFFF",
                bottom: "#94A3B8",
              }}
            />

            {/* 6. FOLDED HANDS IN GREETING (Respectful "Namaste" prayer position) */}
            {/* Kurta Left Sleeve (Angled inwards) */}
            <PoliticianCuboid
              width={8}
              height={20}
              depth={8}
              x={25}
              y={44}
              z={6}
              rotateZ={38}
              rotateY={15}
              colors={{
                front: "#E2E8F0",
                back: "#CBD5E1",
                left: "#94A3B8",
                right: "#F1F5F9",
              }}
            />
            {/* Kurta Right Sleeve (Angled inwards) */}
            <PoliticianCuboid
              width={8}
              height={20}
              depth={8}
              x={63}
              y={44}
              z={6}
              rotateZ={-38}
              rotateY={-15}
              colors={{
                front: "#E2E8F0",
                back: "#CBD5E1",
                left: "#F1F5F9",
                right: "#94A3B8",
              }}
            />
            {/* Bare Left Hand (Pressed in Namaste mudra, meeting at center) */}
            <PoliticianCuboid
              width={6}
              height={15}
              depth={6}
              x={43}
              y={45}
              z={14}
              rotateZ={15}
              rotateY={12}
              colors={{
                front: "#F5BE7F",
                back: "#DF9E5B",
                left: "#DF9E5B",
                right: "#EAA86C",
              }}
            />
            {/* Bare Right Hand (Pressed in Namaste mudra, meeting at center) */}
            <PoliticianCuboid
              width={6}
              height={15}
              depth={6}
              x={47}
              y={45}
              z={14}
              rotateZ={-15}
              rotateY={-12}
              colors={{
                front: "#F5BE7F",
                back: "#DF9E5B",
                left: "#EAA86C",
                right: "#DF9E5B",
              }}
            />

            {/* 7. LEGS (Traditional light beige cream tight pants/churidar) */}
            {/* Left Leg */}
            <PoliticianCuboid
              width={8}
              height={30}
              depth={8}
              x={35}
              y={101}
              z={0}
              colors={{
                front: "#ECE8DF",
                back: "#DAD5C9",
                left: "#E1DCD0",
                right: "#ECE8DF",
                bottom: "#9E9889",
              }}
            />
            {/* Right Leg */}
            <PoliticianCuboid
              width={8}
              height={30}
              depth={8}
              x={53}
              y={101}
              z={0}
              colors={{
                front: "#ECE8DF",
                back: "#DAD5C9",
                left: "#ECE8DF",
                right: "#E1DCD0",
                bottom: "#9E9889",
              }}
            />

            {/* 8. BLACK SLIP-ON SHOES / MOJRIS */}
            {/* Left Shoe */}
            <PoliticianCuboid
              width={10}
              height={6}
              depth={15}
              x={34}
              y={130}
              z={3}
              colors={{
                front: "#1A1A1A",
                back: "#090909",
                left: "#111111",
                right: "#111111",
                top: "#2D2D2D",
              }}
            />
            {/* Right Shoe */}
            <PoliticianCuboid
              width={10}
              height={6}
              depth={15}
              x={52}
              y={130}
              z={3}
              colors={{
                front: "#1A1A1A",
                back: "#090909",
                left: "#111111",
                right: "#111111",
                top: "#2D2D2D",
              }}
            />
          </div>
        </div>
      </div>

      {/* Solid Static Ambient Floor Shadow */}
      <div
        className="absolute bottom-1 w-24 h-2 bg-royal-blue/20 rounded-full blur-[4px] select-none pointer-events-none"
      />
    </div>
  );
};

/**
 * 3D Ring Light Component
 * Features: High-glow LED hollow circle, center smartphone preview, tripod mount stand, and warm background floor illumination.
 */
export const ThreeDRingLight: React.FC = () => {
  return (
    <div
      className="relative w-44 h-44 flex items-center justify-center select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: "rotateX(15deg) rotateY(-15deg) rotateZ(0deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-32 h-32 duration-700 ease-out transition-all flex items-center justify-center"
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* THE RING LIGHT (Tilt angle) */}
          <div
            className="absolute left-[24px] top-[12px] w-[80px] h-[80px] rounded-full bg-neutral-900 border border-neutral-750 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),_0_5px_15px_rgba(0,0,0,0.8)]"
            style={{
              transform: "translateZ(10px) rotateX(15deg)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* The actual Glowing Led Light Ring */}
            <div
              className="w-[66px] h-[66px] rounded-full border-[8px] border-white flex items-center justify-center relative shadow-[0_0_25px_#FFFFFF,0_0_50px_#FFAE19,inset_0_0_15px_#FFFFFF]"
              style={{
                transform: "translateZ(8px)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Subtle glass glare arc overlay */}
              <div className="absolute inset-[1px] rounded-full border border-orange-200/50 opacity-60 animate-pulse" />

              {/* CENTER MOBILE PHONE HOLDER */}
              <div
                className="absolute w-[18px] h-[30px] bg-gradient-to-b from-[#15171E] to-[#0A0B0E] border border-neutral-700 rounded shadow-md flex flex-col justify-between p-0.5"
                style={{
                  transform: "translateZ(4px)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Simulated colorful screen glow */}
                <div className="w-full h-full bg-[#051E12] border border-[#10B981]/40 rounded-xs relative overflow-hidden flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-gradient-to-tr from-emerald-500/20 to-teal-500/15 rounded-full animate-ping" />
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                </div>
              </div>

              {/* Swivel stand connection block behind phone */}
              <div className="absolute bottom-[-18px] w-2 h-[18px] bg-neutral-800 border border-neutral-700" style={{ transform: "rotateX(-30deg) translateZ(-4px)" }} />
            </div>
          </div>

          {/* LIGHT RAY GLOW FILTER (Stands behind the stand but in front of body) */}
          <div
            className="absolute left-[30px] top-[18px] w-[68px] h-[68px] rounded-full bg-orange-500/5 filter blur-[12px] animate-pulsepointer-events-none"
            style={{ transform: "translateZ(1px)" }}
          />

          {/* TRIPOD HEADSTAND NECK AND CONTROLLERS (Supports the ring light) */}
          <div
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[35px] bg-gradient-to-b from-[#1E2026] to-[#0E0F12] border border-neutral-700 rounded-sm flex flex-col items-center justify-around py-1"
            style={{
              transform: "translateZ(-2px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Tiny adjustive dial knobs */}
            <div className="w-5 h-1.5 bg-[#D4AF37] rounded-full border border-black/30" />
            <div className="w-1.5 h-1.5 bg-neutral-900 border border-neutral-600 rounded-xs" />
          </div>

          {/* Circular bottom support bracket */}
          <div
            className="absolute bottom-1 left-[40px] w-12 h-1.5 bg-neutral-850 border border-neutral-700 rounded-full"
            style={{ transform: "translateZ(-14px)" }}
          />
        </div>
      </motion.div>

      {/* Floating Ambient Floor Shadow */}
      <motion.div
        animate={{ scale: [1, 0.78, 1], opacity: [0.38, 0.16, 0.38], filter: ["blur(4.5px)", "blur(7px)", "blur(4.5px)"] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 w-28 h-2 bg-amber-500/20 rounded-full select-none pointer-events-none"
      />
    </div>
  );
};

