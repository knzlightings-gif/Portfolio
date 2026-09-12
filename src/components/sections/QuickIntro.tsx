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
  // Duplicate to create seamless loop
  const items = [...features, ...features];

  return (
    <section className="py-8 bg-brand-card relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent" />

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-card to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex overflow-hidden select-none">
        <div
          className="flex gap-6 shrink-0"
          style={{
            animation: "marquee-left 30s linear infinite",
            willChange: "transform",
          }}
        >
          {items.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-bg border border-brand-border hover:border-brand-cyan/50 hover:bg-brand-bg transition-all duration-300 shrink-0 cursor-default"
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
