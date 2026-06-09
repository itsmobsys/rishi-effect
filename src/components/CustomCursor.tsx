/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { AudioEngine } from "./AudioEngine";

interface GhostDot {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ghosts, setGhosts] = useState<GhostDot[]>([]);
  const [hoverType, setHoverType] = useState<"none" | "click" | "view">("none");
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ghostListRef = useRef<GhostDot[]>([]);
  const rippleCount = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = 
        window.matchMedia("(max-width: 768px)").matches || 
        ("ontouchstart" in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track position & manage magnetic pull & hover states
  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Find magnetic elements near mouse pointer (within 60px)
      const magnetics = document.querySelectorAll("[data-magnetic]");
      let nearestDist = 60; // 60px threshold
      let pullX = 0;
      let pullY = 0;

      magnetics.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < nearestDist) {
          nearestDist = dist;
          // Shifting toward center of the button (magnetic attraction formula)
          pullX = (centerX - targetX) * 0.45;
          pullY = (centerY - targetY) * 0.45;
        }
      });

      cursorRef.current = { x: targetX + pullX, y: targetY + pullY };
      setPosition({ x: targetX + pullX, y: targetY + pullY });

      // Detect hovering tags
      const path = e.composedPath() as HTMLElement[];
      let foundHover: "none" | "click" | "view" = "none";
      
      for (const node of path) {
        if (!node.tagName) continue;
        const cursorAttr = node.getAttribute?.("data-cursor");
        if (cursorAttr === "click" || node.tagName === "BUTTON" || node.tagName === "A" || node.closest("a") || node.closest("button")) {
          foundHover = "click";
        }
        if (cursorAttr === "view" || node.getAttribute?.("role") === "img" || node.tagName === "IMG") {
          foundHover = "view";
        }
        if (foundHover !== "none") break;
      }
      setHoverType(foundHover);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isMobile) return;
      
      // Play a high precision cursor click sound
      AudioEngine.playTick();

      const newId = rippleCount.current++;
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id: newId }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newId));
      }, 600);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isMobile]);

  // Handle high quality particle trail frame iterations
  useEffect(() => {
    if (isMobile) return;

    let animId: number;
    let ghostIdCounter = 0;

    const updateGhosts = () => {
      // Direct deep reference updates for smooth performance
      const currentPos = cursorRef.current;
      let currentGhosts = [...ghostListRef.current];

      // Insert new point representing current position
      currentGhosts.unshift({ x: currentPos.x, y: currentPos.y, id: ghostIdCounter++ });
      // Keep exactly 6 points
      if (currentGhosts.length > 6) {
        currentGhosts.pop();
      }

      ghostListRef.current = currentGhosts;
      setGhosts([...currentGhosts]);
      animId = requestAnimationFrame(updateGhosts);
    };

    animId = requestAnimationFrame(updateGhosts);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Click burst ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/80 bg-orange-500/10 pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "50px",
            height: "50px",
            animationDuration: "400ms",
          }}
        />
      ))}

      {/* Comet trail fading ghost dots */}
      {ghosts.map((ghost, index) => {
        if (index === 0) return null; // Root dot is covered below
        const opacity = (1 - index / ghosts.length) * 0.4;
        const size = Math.max(3, 8 - index);
        return (
          <div
            key={ghost.id}
            className="pointer-events-none fixed z-[9998] rounded-full bg-orange-600 blur-[0.5px] transition-all duration-150 ease-out"
            style={{
              left: ghost.x,
              top: ghost.y,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Root Glowing Dot or Expanded Interactive Ring */}
      <div
        id="custom-main-cursor"
        className="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          width: hoverType !== "none" ? "64px" : "10px",
          height: hoverType !== "none" ? "64px" : "10px",
          backgroundColor: hoverType !== "none" ? "rgba(255, 69, 0, 0.08)" : "#FF4500",
          border: hoverType !== "none" ? "2px solid #FF4500" : "none",
          boxShadow: hoverType === "none" ? "0 0 12px 2px rgba(255, 69, 0, 0.6)" : "0 0 16px rgba(255, 69, 0, 0.3)",
        }}
      >
        {hoverType !== "none" && (
          <span className="font-mono text-[9px] font-black tracking-widest text-[#F5F0E8] animate-pulse">
            {hoverType === "click" ? "CLICK" : "VIEW"}
          </span>
        )}
      </div>
    </>
  );
}
