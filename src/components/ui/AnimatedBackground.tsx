"use client";

import { useEffect, useRef } from "react";

interface MicroParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  pulse: number;
  pulseSpeed: number;
}

const PARTICLE_COUNT = 28; // Very sparse, calm, non-intrusive

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Dynamic Theme Color Reader
    const getThemeColors = () => {
      const docStyle = getComputedStyle(document.documentElement);
      const primary = docStyle.getPropertyValue("--theme-primary-rgb").trim() || "0, 77, 64";
      const secondary = docStyle.getPropertyValue("--theme-secondary-rgb").trim() || "0, 172, 193";
      return { primary, secondary };
    };

    // Soft Mouse Tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isActive: true };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isActive: false };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // Whisper-subtle micro particles
    const particles: MicroParticle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.15, // Gentle slow drift
      r: 0.7 + Math.random() * 0.8,      // Tiny micro dots
      baseAlpha: 0.03 + Math.random() * 0.04, // Ultra-low opacity: 3% - 7%
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.015,
    }));

    // Render Loop
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { primary, secondary } = getThemeColors();
      const mouse = mouseRef.current;

      // 1. Subtle, gentle cursor ambient illumination (whisper quiet: 3% opacity)
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const glowRadius = 380;
        const radial = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowRadius
        );
        radial.addColorStop(0, `rgba(${secondary}, 0.04)`);
        radial.addColorStop(0.5, `rgba(${primary}, 0.02)`);
        radial.addColorStop(1, "transparent");

        ctx.fillStyle = radial;
        ctx.fillRect(
          Math.max(0, mouse.x - glowRadius),
          Math.max(0, mouse.y - glowRadius),
          glowRadius * 2,
          glowRadius * 2
        );
      }

      // 2. Ultra-soft micro particles (no lines, no cluttered spiderwebs)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around viewport edges smoothly
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const currentAlpha = p.baseAlpha * (0.8 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${secondary}, ${currentAlpha})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
