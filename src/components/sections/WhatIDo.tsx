"use client";

import { motion } from "framer-motion";
import { whatIDo } from "@/data/content";
import { Database, LayoutDashboard, Workflow, Cpu, Link as LinkIcon, BarChart } from "lucide-react";

const iconMap: Record<string, any> = {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link: LinkIcon,
  BarChart,
};

// Alternate accent colors per card for visual variety
const accentColors = [
  { text: "text-brand-cyan", border: "border-brand-cyan/40", glow: "from-brand-cyan/15 to-transparent", shadow: "rgba(0,229,255,0.25)" },
  { text: "text-brand-purple", border: "border-brand-purple/40", glow: "from-brand-purple/15 to-transparent", shadow: "rgba(139,92,246,0.25)" },
  { text: "text-brand-cyan", border: "border-brand-cyan/40", glow: "from-brand-cyan/15 to-transparent", shadow: "rgba(0,229,255,0.25)" },
  { text: "text-brand-purple", border: "border-brand-purple/40", glow: "from-brand-purple/15 to-transparent", shadow: "rgba(139,92,246,0.25)" },
  { text: "text-brand-cyan", border: "border-brand-cyan/40", glow: "from-brand-cyan/15 to-transparent", shadow: "rgba(0,229,255,0.25)" },
  { text: "text-brand-purple", border: "border-brand-purple/40", glow: "from-brand-purple/15 to-transparent", shadow: "rgba(139,92,246,0.25)" },
];

// Feature tags for each card to provide rich, informative context
const serviceTags: Record<string, string[]> = {
  erp: ["Inventory & Stock", "Sales & Billing", "Ledgers & Accounts"],
  "web-apps": ["Custom Dashboards", "Role-Based Access", "High Performance"],
  automation: ["Auto Notifications", "Smart Triggers", "Zero Manual Errors"],
  ai: ["Fast Delivery", "Quality Architecture", "AI Automation"],
  api: ["Payment Gateways", "WhatsApp & SMS", "Custom Webhooks"],
  analytics: ["Real-time Charts", "Business KPIs", "Excel / PDF Export"],
};

export default function WhatIDo() {
  return (
    <section id="services" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background ambient gradient orbs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-cyan/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            What I Do
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-4 tracking-tight">
            Software Built Around<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">
              Your Business
            </span>
          </h2>
          <p className="text-base md:text-lg text-brand-text-muted max-w-2xl leading-relaxed">
            Every business works differently. I build software around your actual workflow instead of forcing your business into a complicated system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {whatIDo.map((service, index) => {
            const Icon = iconMap[service.icon];
            const num = String(index + 1).padStart(2, "0");
            const tags = serviceTags[service.id] || ["Reliable", "Scalable", "Custom"];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.025 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-brand-card/95 border border-brand-border/80 shadow-md hover:shadow-[0_20px_40px_-10px_var(--theme-primary-glow,rgba(0,112,243,0.3))] hover:border-brand-cyan/60 transition-all duration-300 p-7 cursor-pointer select-none backdrop-blur-md"
              >
                {/* Top decorative gradient accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple opacity-40 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300"
                />

                {/* Soft ambient corner glow aura on hover */}
                <div
                  className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-brand-cyan/30 to-brand-purple/20"
                />

                {/* Main content */}
                <div className="relative z-10">
                  {/* Header Row: Icon + Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-brand-cyan/15 to-brand-purple/15 border border-brand-cyan/30 text-brand-cyan shadow-sm group-hover:shadow-[0_0_20px_var(--theme-primary-glow,rgba(0,112,243,0.4))]"
                    >
                      {Icon && <Icon className="w-6 h-6 stroke-[2.2]" />}
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-bg text-brand-text-muted border border-brand-border font-mono tracking-wider group-hover:border-brand-cyan/40 group-hover:text-brand-cyan group-hover:scale-105 transition-all">
                      /{num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-brand-text mb-2.5 tracking-tight group-hover:text-brand-cyan transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Tags / Pills with hover zoom */}
                  <div className="flex flex-wrap gap-2 pt-1 mb-6">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-bg text-brand-text-muted border border-brand-border/80 group-hover:bg-brand-card group-hover:border-brand-cyan/40 group-hover:text-brand-text group-hover:scale-105 transition-all duration-300 shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Footer Row */}
                <div className="relative z-10 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-text-muted group-hover:text-brand-cyan transition-colors duration-200">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for projects
                  </span>
                  <div className="flex items-center gap-1.5 font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>Learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
