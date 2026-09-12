"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    // Floating orbs
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 300 + Math.random() * 250,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: i % 2 === 0 ? "0,229,255" : "139,92,246", // cyan or purple
      alpha: 0.04 + Math.random() * 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      orbs.forEach((orb) => {
        // Drift
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Bounce off edges softly
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        // Draw radial gradient
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.hue}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.hue}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
