"use client";

import { motion } from "framer-motion";
import { Code2, Database, Terminal, Cpu, GitBranch, Binary, Server, ShieldCheck, Workflow } from "lucide-react";

// Software development floating elements distributed across screen sides & margins
const techElements = [
  { icon: Code2, label: "<AppBuilder />", x: "1.5%", y: "15%", duration: 12, delay: 0 },
  { icon: Terminal, label: "git commit -m 'deploy'", x: "82%", y: "12%", duration: 15, delay: 1 },
  { icon: Database, label: "POST /api/erp/sync", x: "83%", y: "42%", duration: 14, delay: 2 },
  { icon: Cpu, label: "{ status: 200 OK }", x: "2%", y: "48%", duration: 16, delay: 0.5 },
  { icon: GitBranch, label: "main --v2.4", x: "84%", y: "78%", duration: 13, delay: 3 },
  { icon: Binary, label: "01010011 01100001", x: "2.5%", y: "82%", duration: 17, delay: 1.5 },
  { icon: Server, label: "cloud.render()", x: "80%", y: "26%", duration: 14, delay: 2.5 },
  { icon: ShieldCheck, label: "auth.verify(JWT)", x: "2%", y: "30%", duration: 18, delay: 4 },
  { icon: Workflow, label: "pipeline.run()", x: "81%", y: "60%", duration: 15, delay: 3.5 },
];

export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-20"
      aria-hidden="true"
    >
      {/* 1. Ambient Tech Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(var(--theme-primary, #3f65c0) 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* 2. Soft Ambient Color Blur Orbs */}
      <div
        className="blob-1 absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="blob-2 absolute -top-24 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="blob-3 absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* 3. Clearly Visible Floating Software Development Badges */}
      {techElements.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0.3, y: 0 }}
            animate={{
              opacity: [0.45, 0.85, 0.45],
              y: [-16, 16, -16],
              x: [-8, 8, -8],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card/90 border border-brand-cyan/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,112,243,0.15)] text-brand-text font-mono text-[11px] select-none pointer-events-none transition-all"
            style={{
              left: item.x,
              top: item.y,
            }}
          >
            <div className="w-5 h-5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
              <Icon className="w-3 h-3" />
            </div>
            <span className="tracking-tight font-semibold text-brand-cyan">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
