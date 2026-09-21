"use client";

import { useEffect, useRef } from "react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface TwinkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface GlyphParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
}

interface Shockwave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

const GLYPH_CHARS = ["</>", "{ }", "//", "01", "λ", "⚡", "⌘", "✦", "+", "■", "&&", "=>", "::", "/>"];
const NODE_COUNT = 85;
const TWINKLE_COUNT = 45;
const GLYPH_COUNT = 18;
const CONNECTION_DISTANCE = 135;
const MOUSE_CONNECTION_DISTANCE = 160;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isActive: false });
  const shockwavesRef = useRef<Shockwave[]>([]);

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
      const primary = docStyle.getPropertyValue("--theme-primary-rgb").trim() || "0, 112, 243";
      const secondary = docStyle.getPropertyValue("--theme-secondary-rgb").trim() || "0, 153, 255";
      return { primary, secondary };
    };

    // Mouse Tracking in Viewport Coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isActive: true };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isActive: false };
    };
    const onClick = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 10,
        maxR: 160,
        alpha: 0.6,
      });
      // Cap max shockwaves
      if (shockwavesRef.current.length > 5) {
        shockwavesRef.current.shift();
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("click", onClick);

    // 1. Constellation Nodes
    const nodes: NodeParticle[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: 1.4 + Math.random() * 2.2,
      alpha: 0.35 + Math.random() * 0.45,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02,
    }));

    // 2. Ambient Floating Twinkle Dust
    const twinkles: TwinkleParticle[] = Array.from({ length: TWINKLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -0.15 - Math.random() * 0.3, // Gentle upward float
      r: 0.8 + Math.random() * 1.5,
      baseAlpha: 0.2 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    // 3. Floating Tech Code Glyphs
    const glyphs: GlyphParticle[] = Array.from({ length: GLYPH_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      char: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
      size: 11 + Math.random() * 4,
      alpha: 0.16 + Math.random() * 0.2,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.006,
    }));

    // Render Loop
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { primary, secondary } = getThemeColors();
      const mouse = mouseRef.current;

      // Update & render shockwaves
      for (let sIdx = shockwavesRef.current.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwavesRef.current[sIdx];
        sw.r += 3.5;
        sw.alpha *= 0.94;

        if (sw.alpha < 0.02 || sw.r > sw.maxR) {
          shockwavesRef.current.splice(sIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${secondary}, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Repel nearby nodes
        nodes.forEach((n) => {
          const dx = n.x - sw.x;
          const dy = n.y - sw.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(d - sw.r) < 30 && d > 0) {
            const push = (1 - Math.abs(d - sw.r) / 30) * 1.5;
            n.vx += (dx / d) * push;
            n.vy += (dy / d) * push;
          }
        });
      }

      // ─── 1. Draw Twinkling Dust ─────────────────────────────
      twinkles.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;
        t.pulse += t.pulseSpeed;

        // Wrap edges
        if (t.x < 0) t.x = W;
        if (t.x > W) t.x = 0;
        if (t.y < 0) t.y = H;
        if (t.y > H) t.y = 0;

        const currentAlpha = t.baseAlpha * (0.6 + 0.4 * Math.sin(t.pulse));
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${secondary}, ${currentAlpha * 0.6})`;
        ctx.fill();
      });

      // ─── 2. Draw Floating Code Glyphs ───────────────────────
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      glyphs.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        g.rotation += g.vRot;

        if (g.x < -30) g.x = W + 30;
        if (g.x > W + 30) g.x = -30;
        if (g.y < -30) g.y = H + 30;
        if (g.y > H + 30) g.y = -30;

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);
        ctx.font = `bold ${g.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = `rgba(${primary}, ${g.alpha})`;
        ctx.fillText(g.char, 0, 0);
        ctx.restore();
      });

      // ─── 3. Update & Draw Constellation Nodes ───────────────
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        // Wrap edges
        if (n.x < 0) n.x = W;
        if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H;
        if (n.y > H) n.y = 0;

        // Gentle mouse repulsion
        if (mouse.isActive) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 130 && mdist > 0) {
            const force = (130 - mdist) / 130;
            n.vx += (mdx / mdist) * force * 0.18;
            n.vy += (mdy / mdist) * force * 0.18;
          }
        }

        // Speed cap & drag
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.4) {
          n.vx = (n.vx / speed) * 1.4;
          n.vy = (n.vy / speed) * 1.4;
        }
        n.vx *= 0.995;
        n.vy *= 0.995;

        // Dynamic pulsing
        const pulsedR = n.r + Math.sin(n.pulse) * 0.6;
        const pulsedA = n.alpha * (0.75 + Math.sin(n.pulse) * 0.25);

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.8, pulsedR), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primary}, ${pulsedA * 0.85})`;
        ctx.fill();

        // Soft outer glow
        const glowRadius = Math.max(2, pulsedR * 3.5);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        glow.addColorStop(0, `rgba(${secondary}, ${pulsedA * 0.22})`);
        glow.addColorStop(1, `rgba(${secondary}, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      // ─── 4. Draw Connecting Lines (Node to Node) ───────────
      const nodeLen = nodes.length;
      for (let i = 0; i < nodeLen; i++) {
        for (let j = i + 1; j < nodeLen; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${primary}, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Lines from mouse to nearby particles
        if (mouse.isActive) {
          const n = nodes[i];
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < MOUSE_CONNECTION_DISTANCE) {
            const lineAlpha = (1 - mdist / MOUSE_CONNECTION_DISTANCE) * 0.45;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${secondary}, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Cursor subtle ambient glow aura
      if (mouse.isActive) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        mouseGlow.addColorStop(0, `rgba(${secondary}, 0.08)`);
        mouseGlow.addColorStop(1, `rgba(${secondary}, 0)`);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
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
      window.removeEventListener("click", onClick);
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
