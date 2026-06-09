/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

interface StarParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
}

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const pointsRef = useRef<Point3D[]>([]);
  const starsRef = useRef<StarParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  // Handle scroll monitoring for exploding wireframe action
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = window.scrollY / docHeight;
      setScrollPercent(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize the 3D particles and globe points
  useEffect(() => {
    const points: Point3D[] = [];
    const stars: StarParticle[] = [];

    // Create 3D sphere globe points via math
    const latCount = 14;
    const lonCount = 18;
    const radius = 160;

    for (let i = 0; i < latCount; i++) {
      const lat = (Math.PI * i) / (latCount - 1) - Math.PI / 2;
      for (let j = 0; j < lonCount; j++) {
        const lon = (2 * Math.PI * j) / lonCount;

        // Spherical coordinate system to Cartesian 3D projection
        const x = radius * Math.cos(lat) * Math.cos(lon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(lon);

        points.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
        });
      }
    }

    // 500 Ambient random floating sparks
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 600 - 300,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    pointsRef.current = points;
    starsRef.current = stars;
  }, []);

  // Window sizing & Mouse listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Map to small parallax offset factor from -1 to 1
      mouseRef.current.targetX = x / (rect.width / 2);
      mouseRef.current.targetY = y / (rect.height / 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation draw loop (60 FPS projection matrix)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Interpolate mouse parallax coordinates beautifully for momentum scrolling
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Accelerate rotation of globe slightly
      const rot = rotationRef.current;
      rot.x += 0.005 + mouse.y * 0.002;
      rot.y += 0.004 + mouse.x * 0.002;

      // Camera focal length projection calculations
      const fov = 400;
      const cx = w / 2;
      const cy = h / 2;

      // Draw background ambient star sparks
      const stars = starsRef.current;
      ctx.fillStyle = "rgba(255, 69, 0, 0.45)";
      stars.forEach((star) => {
        // Drift sparks
        star.y -= star.speed;
        if (star.y < -h / 2) {
          star.y = h / 2;
        }

        // Project spark
        const sx = star.x + mouse.x * -20;
        const sy = star.y + mouse.y * -20;
        const scale = fov / (fov + star.z);
        const px = sx * scale + cx;
        const py = sy * scale + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render Globe wireframe points
      const points = pointsRef.current;
      const projected: { px: number; py: number; depth: number }[] = [];

      // Calculate translation matrices for sphere rotation & scroll explosion
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);

      // Determine 'splinter dispersion factor' based on current scroll depth
      // When scrollPercent exceeds 0, sphere explodes into separate drifting points
      const explodeFactor = scrollPercent * 4.5; // Scaling index

      points.forEach((pt) => {
        // 1. Initial coordinates with explosion factor shift
        let dx = pt.baseX;
        let dy = pt.baseY;
        let dz = pt.baseZ;

        if (explodeFactor > 0) {
          // Push outward along spherical vectors
          dx += (pt.baseX * explodeFactor);
          dy += (pt.baseY * explodeFactor);
          dz += (pt.baseZ * explodeFactor);
        }

        // 2. Rotate sphere around Y axis
        let x1 = dx * cosY - dz * sinY;
        let z1 = dx * sinY + dz * cosY;

        // Rotate sphere around X axis
        let y2 = dy * cosX - z1 * sinX;
        let z2 = dy * sinX + z1 * cosX;

        // Apply mouse parallax shift
        const projectedX = x1 + mouse.x * 35;
        const projectedY = y2 + mouse.y * 35;
        const projectedZ = z2 + 280; // Distance depth offset

        const scale = fov / (fov + projectedZ);
        const px = projectedX * scale + cx;
        const py = projectedY * scale + cy;

        projected.push({ px, py, depth: projectedZ });
      });

      // Clean drawing of lines and grids between points if not totally exploded
      if (explodeFactor < 2.5) {
        ctx.strokeStyle = `rgba(255, 140, 66, ${Math.max(0, 0.12 - explodeFactor * 0.05)})`;
        ctx.lineWidth = 0.5;

        const totalPoints = points.length;
        const lonCount = 18;

        for (let i = 0; i < totalPoints; i++) {
          const nextLon = i + 1;
          const nextLat = i + lonCount;

          // Connect latitude rings
          if (nextLon % lonCount !== 0 && nextLon < totalPoints) {
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[nextLon].px, projected[nextLon].py);
            ctx.stroke();
          }

          // Connect longitude bars
          if (nextLat < totalPoints) {
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[nextLat].px, projected[nextLat].py);
            ctx.stroke();
          }
        }
      }

      // Render actual dots with color glow
      projected.forEach((p, idx) => {
        // Size scales based on standard camera depth projection
        const radiusVal = Math.max(1, 3.2 - (p.depth / 200));
        const alpha = Math.max(0.1, 1 - (p.depth / 500));

        // Let color fade from blaze/gold to dark ember
        ctx.fillStyle = idx % 3 === 0 
          ? `rgba(201, 168, 76, ${alpha * (1 - scrollPercent)})` // Gold Highlights
          : `rgba(255, 69, 0, ${alpha * (1 - scrollPercent)})`;   // Ember Core

        ctx.beginPath();
        ctx.arc(p.px, p.py, radiusVal, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [scrollPercent]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden z-[2]"
    >
      <canvas 
        ref={canvasRef} 
        className="block h-full w-full opacity-[0.85]" 
      />
    </div>
  );
}
