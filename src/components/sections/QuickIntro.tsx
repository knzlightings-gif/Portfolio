"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Database, 
  Terminal, 
  Workflow, 
  GitBranch 
} from "lucide-react";

const services = [
  {
    title: "ERP Systems",
    icon: Database,
    shortDesc: "Centralize stock levels, supplier orders & double-entry financial books.",
    highlight: "⚡ Real-Time Ledger",
  },
  {
    title: "Web Applications",
    icon: Terminal,
    shortDesc: "Cloud dashboards, secure admin portals & responsive team workspaces.",
    highlight: "⚡ Sub-Second UI",
  },
  {
    title: "Workflow Automation",
    icon: Workflow,
    shortDesc: "Automate WhatsApp/Email alerts, auto-invoicing & zero-touch Excel jobs.",
    highlight: "🤖 0% Human Error",
  },
  {
    title: "Custom Integrations",
    icon: GitBranch,
    shortDesc: "Bridge your core software with external APIs, payment rails & webhooks.",
    highlight: "🔗 REST & Webhooks",
  },
];

export default function QuickIntro() {
  return (
    <section className="py-10 md:py-12 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-brand-border/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan block mb-2">
              Architecture & Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight">
              Software Solutions <br className="hidden sm:block" />
              <span className="text-brand-text-muted font-normal">Engineered For Modern Business.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-brand-text-muted max-w-md leading-relaxed">
            Scalable digital solutions engineered to automate operational bottlenecks and deliver measurable productivity gains.
          </p>
        </div>

        {/* 4 Compact Cards with centered IT icons matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
          {services.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="h-full"
              >
                <Link href="/services" className="block h-full group">
                  <div className="relative overflow-hidden flex flex-col items-center text-center justify-between h-full p-6 sm:p-7 rounded-2xl bg-brand-card border border-brand-border/80 shadow-xs hover:shadow-[0_24px_50px_-10px_rgba(0,77,64,0.36),0_12px_24px_-6px_rgba(0,77,64,0.22)] hover:border-[#004D40] dark:hover:border-brand-cyan hover:-translate-y-1.5 hover:bg-[#C2E3DC] dark:hover:bg-[#14332D] transition-all duration-300">
                    
                    {/* Prominent hover shade overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-[#004D40]/[0.03] to-[#004D40]/[0.10] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Centered IT Icon */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/95 dark:bg-teal-950/80 border border-[#004D40]/25 text-[#004D40] dark:text-brand-cyan mb-3.5 shadow-2xs group-hover:scale-110 group-hover:bg-[#004D40] group-hover:text-white group-hover:shadow-md transition-all duration-300 relative z-10">
                      <IconComponent className="w-8 h-8" strokeWidth={1.8} />
                    </div>

                    {/* Centered Title */}
                    <h3 className="text-base sm:text-lg font-bold text-brand-text mb-1 group-hover:text-[#004D40] dark:group-hover:text-brand-cyan transition-colors relative z-10">
                      {item.title}
                    </h3>

                    {/* Short, compact description with high-contrast text */}
                    <p className="text-xs text-brand-text-muted font-medium leading-relaxed mb-3 max-w-[220px] line-clamp-2 relative z-10">
                      {item.shortDesc}
                    </p>

                    {/* Centered IT Metric / Highlight */}
                    <div className="text-sm sm:text-base font-extrabold text-[#004D40] dark:text-brand-cyan mb-3.5 tracking-tight relative z-10">
                      {item.highlight}
                    </div>

                    {/* Centered Pill Button */}
                    <span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold bg-[#004D40] hover:bg-[#00382E] text-white shadow-xs group-hover:shadow-lg group-hover:scale-105 transition-all relative z-10">
                      Explore Stack
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
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

