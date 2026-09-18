"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Database, LayoutDashboard, Workflow, Link2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "ERP Systems",
    description: "Custom sales, inventory, purchasing & accounts software built directly around how your business operates.",
    highlight: "Sales & Stock Management",
    accent: "group-hover:text-brand-cyan",
    border: "group-hover:border-brand-cyan/40",
    bgIcon: "bg-brand-cyan/10 text-brand-cyan",
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    description: "Fast, modern business web applications and admin portals designed for daily team productivity.",
    highlight: "Custom Dashboards & Portals",
    accent: "group-hover:text-brand-purple",
    border: "group-hover:border-brand-purple/40",
    bgIcon: "bg-brand-purple/10 text-brand-purple",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Replace tedious Excel entry, manual calculations, and repetitive tasks with simple automated workflows.",
    highlight: "Process & Data Automation",
    accent: "group-hover:text-amber-400",
    border: "group-hover:border-amber-400/40",
    bgIcon: "bg-amber-400/10 text-amber-400",
  },
  {
    icon: Link2,
    title: "Custom Integrations",
    description: "Connect your existing software with third-party APIs, payment gateways, messaging tools & cloud databases.",
    highlight: "APIs & System Sync",
    accent: "group-hover:text-emerald-400",
    border: "group-hover:border-emerald-400/40",
    bgIcon: "bg-emerald-400/10 text-emerald-400",
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

        {/* 4 Sleek Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative p-7 rounded-2xl bg-brand-card/90 border border-brand-border/80 ${item.border} transition-all duration-300 flex flex-col justify-between hover:shadow-xl`}
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${item.bgIcon} flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-brand-text-muted/80 tracking-wide">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold text-brand-text mb-3 ${item.accent} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-text-muted group-hover:text-brand-text transition-colors">
                    {item.highlight}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
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
