"use client";

import { motion } from "framer-motion";
import { Code2, Database, Terminal, Cpu, GitBranch, Binary, Layers, Server, ShieldCheck } from "lucide-react";

// Subtle floating dev elements with positions & slow ambient floating animation speeds
const techElements = [
  { icon: Code2, label: "<div />", x: "6%", y: "14%", duration: 18, delay: 0 },
  { icon: Terminal, label: "git commit", x: "86%", y: "12%", duration: 22, delay: 2 },
  { icon: Database, label: "POST /api/v1", x: "88%", y: "45%", duration: 20, delay: 1 },
  { icon: Cpu, label: "{ status: 200 }", x: "5%", y: "52%", duration: 24, delay: 3 },
  { icon: GitBranch, label: "main --deploy", x: "90%", y: "76%", duration: 19, delay: 2 },
  { icon: Binary, label: "01010011", x: "8%", y: "82%", duration: 21, delay: 4 },
  { icon: Server, label: "cloud.render()", x: "78%", y: "28%", duration: 23, delay: 1 },
  { icon: ShieldCheck, label: "auth.verify()", x: "12%", y: "36%", duration: 25, delay: 3 },
  { icon: Layers, label: "ERP.sync()", x: "82%", y: "62%", duration: 20, delay: 5 },
];

export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Subtle Ambient Tech Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(var(--theme-primary, #3f65c0) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* 2. Soft Ambient Color Blur Orbs */}
      <div
        className="blob-1 absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="blob-2 absolute -top-24 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="blob-3 absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="blob-4 absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* 3. Floating Low-Density Software Development Animations */}
      {techElements.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0.1, 0.22, 0.1],
              y: [-12, 12, -12],
              x: [-6, 6, -6],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-card/30 border border-brand-border/40 backdrop-blur-[2px] shadow-xs text-brand-cyan/80 font-mono text-[11px] select-none pointer-events-none"
            style={{
              left: item.x,
              top: item.y,
            }}
          >
            <Icon className="w-3.5 h-3.5 text-brand-cyan/70 shrink-0" />
            <span className="tracking-tight font-medium opacity-80">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
