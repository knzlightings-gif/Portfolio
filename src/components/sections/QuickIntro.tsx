"use client";

import { Database, LayoutDashboard, Settings, Cpu, Zap, Shield, Code2, Globe } from "lucide-react";

const features = [
  { icon: Database,       label: "ERP Development" },
  { icon: LayoutDashboard,label: "Business Applications" },
  { icon: Settings,       label: "Custom Software" },
  { icon: Cpu,            label: "AI-Assisted Development" },
  { icon: Zap,            label: "Workflow Automation" },
  { icon: Shield,         label: "Secure & Scalable" },
  { icon: Code2,          label: "API Integrations" },
  { icon: Globe,          label: "Web Portals" },
];

export default function QuickIntro() {
  // Duplicate 4 times to ensure an uninterrupted, seamless infinite continuous ticker loop
  const items = [...features, ...features, ...features, ...features];

  return (
    <section className="py-7 bg-brand-card/90 backdrop-blur-md relative overflow-hidden border-y border-brand-border/60">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent" />

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-r from-brand-card via-brand-card/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-l from-brand-card via-brand-card/80 to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex overflow-hidden select-none">
        <div className="marquee-track-pills flex gap-5 shrink-0">
          {items.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-bg/95 border border-brand-border/90 hover:border-brand-cyan/60 hover:shadow-[0_4px_16px_var(--theme-primary-glow,rgba(0,112,243,0.2))] hover:scale-105 transition-all duration-300 shrink-0 cursor-default"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center group-hover:scale-110 group-hover:border-brand-cyan/50 group-hover:shadow-[0_0_10px_rgba(0,112,243,0.3)] transition-all duration-300">
                <feature.icon className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <span className="font-semibold text-brand-text-muted group-hover:text-brand-text text-sm whitespace-nowrap transition-colors duration-300">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
