import React, { useEffect, useRef } from "react";

export const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200,
    };

    // Handle mouse move
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Dynamic Golden Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
      depth: number; // 0: Deep background stars, 1: Medium constellations, 2: Responsive foreground nodes
      baseX: number;
      angle: number;
      swingSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.angle = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.015 + 0.005;

        // Assign depth layers randomly
        const rand = Math.random();
        if (rand < 0.55) {
          this.depth = 0; // Twinkling ambient micro-stars (55%)
        } else if (rand < 0.90) {
          this.depth = 1; // Interactive constellation nodes (35%)
        } else {
          this.depth = 2; // Energetic floating dust embers (10%)
        }

        if (this.depth === 0) {
          this.vx = (Math.random() - 0.5) * 0.08;
          this.vy = -(Math.random() * 0.06 + 0.02); // Ultralight upwards drift
          this.size = Math.random() * 0.8 + 0.4;
          this.alpha = Math.random() * 0.3 + 0.05;
          this.alphaSpeed = Math.random() * 0.003 + 0.001;
        } else if (this.depth === 1) {
          this.vx = (Math.random() - 0.5) * 0.35;
          this.vy = -(Math.random() * 0.18 + 0.05); // Balanced Drift
          this.size = Math.random() * 1.5 + 0.8;
          this.alpha = Math.random() * 0.45 + 0.15;
          this.alphaSpeed = Math.random() * 0.008 + 0.003;
        } else {
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = -(Math.random() * 0.4 + 0.15); // Faster Drift
          this.size = Math.random() * 2.2 + 1.4;
          this.alpha = Math.random() * 0.6 + 0.25;
          this.alphaSpeed = Math.random() * 0.012 + 0.005;
        }

        // Radiant rich royal blue & silver-blue shades
        const royalBlueTones = [
          `rgba(65, 105, 225, ${this.alpha})`, // Royal Blue
          `rgba(100, 149, 237, ${this.alpha})`, // Soft Royal Light
          `rgba(147, 197, 253, ${this.alpha})`, // Powder Sky glow
          `rgba(240, 244, 255, ${this.alpha * 0.4})` // Shimmering slate-white
        ];
        this.color = royalBlueTones[Math.floor(Math.random() * royalBlueTones.length)];
      }

      update() {
        // Natural swaying motion using sine wave
        this.angle += this.swingSpeed;
        const sway = Math.sin(this.angle) * (this.depth === 0 ? 0.05 : this.depth === 1 ? 0.15 : 0.45);

        this.x += this.vx + sway;
        this.y += this.vy;

        // Reset if particles go off-screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.y > height) {
          this.y = 0;
          this.x = Math.random() * width;
        }

        // Slowly cycle opacity for shimmer twinkle
        this.alpha += this.alphaSpeed;
        const maxAlpha = this.depth === 0 ? 0.35 : this.depth === 1 ? 0.6 : 0.8;
        const minAlpha = this.depth === 0 ? 0.03 : this.depth === 1 ? 0.08 : 0.15;
        if (this.alpha > maxAlpha || this.alpha < minAlpha) {
          this.alphaSpeed = -this.alphaSpeed;
        }

        // Particle mouse reaction
        if (mouse.x > -500) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          // Deep stars are unaffected (background static), others react based on layer weight
          if (this.depth > 0 && distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const multiplier = this.depth === 1 ? 0.8 : 2.5; // Foreground reacts faster
            // Gently glide away from cursor
            this.x -= Math.cos(angle) * force * multiplier;
            this.y -= Math.sin(angle) * force * multiplier;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Replace current alpha in string to match updated state
        const colorWithUpdatedAlpha = this.color.replace(/[\d.]+\)$/, `${Math.max(0.01, this.alpha)})`);
        context.fillStyle = colorWithUpdatedAlpha;

        // Add soft blur glow for larger foreground embers
        if (this.depth === 2) {
          context.shadowBlur = 8;
          context.shadowColor = "rgba(65, 105, 225, 0.4)";
        } else {
          context.shadowBlur = 0;
        }

        context.fill();
      }
    }

    // High Density quantity - boosted for ultimate cinematic look
    const particleCount = Math.min(width < 768 ? 450 : 1150, 1600);
    const particlesArray: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
       particlesArray.push(new Particle());
    }

    // Connect particles very subtly (Only layer 1 constellation lines to keep rendering extremely high speed)
    const drawLines = (context: CanvasRenderingContext2D) => {
      // Clear shadow properties for line drawings to keep them crisp
      context.shadowBlur = 0;
      const maxDistance = 110;
      for (let i = 0; i < particlesArray.length; i++) {
        const p1 = particlesArray[i];
        if (p1.depth !== 1) continue; // Only constellation nodes connect

        for (let j = i + 1; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          if (p2.depth !== 1) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            // Draw luxury royal blue spider-web lines
            const lineAlpha = (1 - distance / maxDistance) * 0.085;
            context.strokeStyle = `rgba(65, 105, 225, ${lineAlpha})`;
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.x > -500) {
        // Subtle ambient gold glow around custom cursor or hover
        const glowRad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        glowRad.addColorStop(0, "rgba(65, 105, 225, 0.04)");
        glowRad.addColorStop(1, "rgba(65, 105, 225, 0)");
        ctx.fillStyle = glowRad;
        ctx.fillRect(mouse.x - mouse.radius, mouse.y - mouse.radius, mouse.radius * 2, mouse.radius * 2);
      }

      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      drawLines(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full bg-transparent"
      aria-hidden="true"
    />
  );
};
