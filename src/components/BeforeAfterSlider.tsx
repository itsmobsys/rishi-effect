/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle slide updates
  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Drag Stage */}
      <div 
        ref={containerRef}
        className="w-full h-[320px] md:h-[450px] bg-void rounded-2xl relative border border-white/[0.04] overflow-hidden select-none cursor-ew-resize touch-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        
        {/* BEFORE CONTAINER (De-saturated Grayscale Layer) */}
        <div className="absolute inset-0 w-full h-full bg-[#111118]">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-45 grayscale blur-[0.5px]">
            {/* Visual Grid Mockup representing desaturated state */}
            <div className="w-full max-w-md bg-[#1C1C1C] rounded-xl p-6 border border-white/5 space-y-4">
              <div className="h-4 w-1/3 bg-white/10 rounded" />
              <div className="h-24 bg-white/5 rounded flex items-center justify-center">
                <span className="font-mono text-xs opacity-50">STAGNANT PERFORMANCE TELEMETRY</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 bg-white/5 rounded" />
                <div className="h-10 bg-white/5 rounded" />
                <div className="h-10 bg-white/5 rounded" />
              </div>
            </div>

          </div>
        </div>

        {/* AFTER CONTAINER (Vibrant Glowing Amber layer) */}
        <div 
          className="absolute inset-y-0 left-0 h-full overflow-hidden transition-all duration-75 ease-out"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Inner container must retain full width of container to align perfectly */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/15 to-transparent bg-[#111118] border-r border-[#FF4500]"
            style={{ width: containerRef.current?.getBoundingClientRect().width || "100vw" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Vibrant active dashboard representing standard Rishi Effect performance metrics */}
              <div className="w-full max-w-md bg-void/80 rounded-xl p-6 border border-[#FF4500]/30 space-y-4 shadow-[0_0_30px_rgba(255,69,0,0.15)] relative">
                <div className="absolute top-2 right-2 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-[#FF8C42]">VIRAL TRAFFIC BURST</span>
                </div>
                
                <div className="h-4 w-1/3 bg-[#FF4500]/20 rounded border border-[#FF4500]/20 animate-pulse" />
                
                {/* Visual Chart diagram */}
                <div className="h-24 bg-gradient-to-t from-[#FF4500]/20 via-[#FF8C42]/5 to-transparent rounded border border-[#FF4500]/10 flex flex-col justify-end p-2 overflow-hidden">
                  <div className="flex items-end justify-between h-16 space-x-1">
                    <div className="w-full bg-[#1C1C1C] h-[10%] rounded-t" />
                    <div className="w-full bg-[#1C1C1C] h-[20%] rounded-t" />
                    <div className="w-full bg-[#1C1C1C] h-[15%] rounded-t" />
                    <div className="w-full bg-[#FF4500]/50 h-[45%] rounded-t" />
                    <div className="w-full bg-[#FF4500]/70 h-[70%] rounded-t animate-pulse" />
                    <div className="w-full bg-[#C9A84C] h-[95%] rounded-t animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-void border border-[#FF4500]/20 rounded">
                    <div className="text-[10px] font-mono text-[#F5F0E8]/40">REACH</div>
                    <div className="text-sm font-mono font-bold text-[#FF4500]">+240%</div>
                  </div>
                  <div className="p-2 bg-void border border-[#FF4500]/20 rounded">
                    <div className="text-[10px] font-mono text-[#F5F0E8]/40">LEADS</div>
                    <div className="text-sm font-mono font-bold text-[#C9A84C]">3.8X</div>
                  </div>
                  <div className="p-2 bg-void border border-[#FF4500]/20 rounded">
                    <div className="text-[10px] font-mono text-[#F5F0E8]/40">REVENUE</div>
                    <div className="text-sm font-mono font-bold text-white">GOLD ZONE</div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div 
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-[#C9A84C] via-[#0062FF] to-[#C9A84C] cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Circular dial pointer node */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-void border-2 border-[#0062FF] shadow-[0_0_15px_rgba(0,98,255,0.5)] flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-[#0062FF] animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
            </svg>
          </div>
        </div>

      </div>


    </div>
  );
}
