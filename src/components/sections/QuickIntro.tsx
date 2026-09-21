"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Monitor, Zap, GitMerge } from "lucide-react";

const services = [
  {
    icon: LayoutGrid,
    title: "ERP Systems",
    description: "Custom sales, inventory, purchasing & accounts software built directly around how your business operates.",
    highlight: "Sales & Stock Management",
    iconColor: "text-brand-cyan",
    glowColor: "bg-brand-cyan/10",
    borderHover: "group-hover:border-brand-cyan/50",
    glow: "hover:shadow-[0_20px_40px_-8px_rgba(0,112,243,0.25)]",
    titleHover: "group-hover:text-brand-cyan",
  },
  {
    icon: Monitor,
    title: "Web Applications",
    description: "Fast, modern business web applications and admin portals designed for daily team productivity.",
    highlight: "Custom Dashboards & Portals",
    iconColor: "text-brand-cyan",
    glowColor: "bg-brand-cyan/10",
    borderHover: "group-hover:border-brand-cyan/50",
    glow: "hover:shadow-[0_20px_40px_-8px_rgba(0,112,243,0.25)]",
    titleHover: "group-hover:text-brand-cyan",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Replace tedious Excel entry, manual calculations, and repetitive tasks with simple automated workflows.",
    highlight: "Process & Data Automation",
    iconColor: "text-brand-cyan",
    glowColor: "bg-brand-cyan/10",
    borderHover: "group-hover:border-brand-cyan/50",
    glow: "hover:shadow-[0_20px_40px_-8px_rgba(0,112,243,0.25)]",
    titleHover: "group-hover:text-brand-cyan",
  },
  {
    icon: GitMerge,
    title: "Custom Integrations",
    description: "Connect your existing software with third-party APIs, payment gateways, messaging tools & cloud databases.",
    highlight: "APIs & System Sync",
    iconColor: "text-brand-cyan",
    glowColor: "bg-brand-cyan/10",
    borderHover: "group-hover:border-brand-cyan/50",
    glow: "hover:shadow-[0_20px_40px_-8px_rgba(0,112,243,0.25)]",
    titleHover: "group-hover:text-brand-cyan",
  },
];

export default function QuickIntro() {
  return (
    <section className="py-10 md:py-12 bg-brand-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-brand-border/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan block mb-2">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight">
              Software Solutions <br className="hidden sm:block" />
              <span className="text-brand-text-muted font-normal">Built For Real Business Needs.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-brand-text-muted max-w-md leading-relaxed">
            We build practical, easy-to-use software that solves actual operational bottlenecks — no bloat, just performance.
          </p>
        </div>

        {/* 4 Cards with clean icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`group relative rounded-2xl bg-brand-card/90 border border-brand-border/80 ${item.borderHover} ${item.glow} transition-all duration-300 flex flex-col overflow-hidden`}
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-30 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Clean Icon Header */}
                <div className="relative w-full h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-cyan/5 via-brand-bg to-brand-purple/5 border-b border-brand-border/50">
                  {/* Dot grid background */}
                  <div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{
                      backgroundImage: "radial-gradient(circle, var(--theme-primary) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Soft glow behind icon */}
                  <div className={`absolute w-28 h-28 rounded-full ${item.glowColor} blur-2xl group-hover:opacity-150 transition-all duration-500`} />
                  {/* Icon container */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-card border border-brand-cyan/25 group-hover:border-brand-cyan/60 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(0,112,243,0.25)] transition-all duration-300">
                    <Icon className={`w-8 h-8 ${item.iconColor} stroke-[1.8]`} />
                  </div>
                  {/* Slide number */}
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-bg/80 backdrop-blur-md border border-brand-border text-brand-text-muted">
                    /0{index + 1}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className={`text-lg font-bold text-brand-text mb-2 ${item.titleHover} transition-colors`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-text-muted leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-text-muted group-hover:text-brand-text transition-colors">
                      {item.highlight}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-cyan group-hover:translate-x-1.5 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="flex justify-center">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-bold text-brand-text bg-brand-card border border-brand-border hover:border-brand-cyan hover:text-brand-cyan transition-all shadow-sm group"
          >
            Explore All Services & Technical Stack
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

