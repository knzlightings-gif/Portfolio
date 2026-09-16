"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link as LinkIcon,
  BarChart,
  ArrowUpRight,
  Sparkles,
  Layers,
  LucideIcon,
} from "lucide-react";
import { defaultServices, ServiceItem } from "@/data/servicesData";

const iconMap: Record<string, LucideIcon> = {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link: LinkIcon,
  BarChart,
};

// Gradient transitions tailored to the site theme for 3 cards
const cardThemeStyles = [
  {
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    badgeBg: "#10B981",
  },
  {
    gradient: "from-cyan-600 via-sky-600 to-blue-700",
    badgeBg: "#0284C7",
  },
  {
    gradient: "from-blue-600 via-indigo-700 to-slate-900",
    badgeBg: "#1E3A8A",
  },
];

// Ribbon clip-paths creating continuous slanted sequence for 3 wide landscape cards
const ribbonClipPaths = [
  "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)", // Card 1
  "polygon(0% 0%, 100% 5%, 100% 100%, 0% 95%)", // Card 2
  "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)", // Card 3
];

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const targetIds = ["ai", "erp", "web-apps"];
            const filtered = data.filter((s) => targetIds.includes(s.id));
            setServices(filtered.length === 3 ? filtered : data.slice(0, 3));
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch home services:", err);
      }
      const targetIds = ["ai", "erp", "web-apps"];
      const filtered = defaultServices.filter((s) => targetIds.includes(s.id));
      setServices(filtered.length === 3 ? filtered : defaultServices.slice(0, 3));
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="py-16 md:py-20 bg-brand-bg relative overflow-hidden">
      {/* Background ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Full width container spanning across page edges */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-brand-border/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">Services & Solutions</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm md:text-base text-brand-text-muted max-w-md leading-relaxed"
          >
            Practical, scalable software built around your exact business workflow to drive real operational performance.
          </motion.p>
        </div>

        {/* Desktop View: Wide Landscape Slanted Ribbon Cards (Shorter Height + Spans Across Screen) */}
        <div className="hidden lg:flex items-stretch justify-center relative pt-10 pb-4 min-h-[310px] w-full mx-auto">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Layers;
            const num = `/${String(index + 1).padStart(2, "0")}`;
            const theme = cardThemeStyles[index % cardThemeStyles.length];
            const clipPathStyle = ribbonClipPaths[index % ribbonClipPaths.length];
            const firstFeature = service.features?.[0] || "";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative flex-1 min-w-[320px] max-w-[480px] -mr-4 first:mr-0 z-10 hover:z-30 transition-all duration-300"
              >
                {/* Numbered Stem Pin at Top */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                  <div
                    className="h-7 px-3 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white shadow-md border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: theme.badgeBg }}
                  >
                    {num}
                  </div>
                  {/* Stem connector */}
                  <div
                    className="w-0.5 h-3.5 opacity-80"
                    style={{ backgroundColor: theme.badgeBg }}
                  />
                </div>

                {/* Main Card with Slanted Polygon Clip-Path */}
                <Link
                  href={`/services/${service.id}`}
                  className="block h-full cursor-pointer select-none"
                >
                  <div
                    className="h-full pt-6 pb-6 px-4 flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:brightness-110 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
                    style={{ clipPath: clipPathStyle }}
                  >
                    <div
                      className={`w-full h-full bg-gradient-to-b ${theme.gradient} flex flex-col justify-between p-5 rounded-xl text-white shadow-xl`}
                    >
                      {/* Top Row: Icon Circle + Title + Arrow Link */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                            <IconComp className="w-5 h-5 text-slate-800" />
                          </div>
                          <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-amber-200 transition-colors leading-snug">
                            {service.title}
                          </h3>
                        </div>

                        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:text-slate-900 transition-all shrink-0">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <p className="text-xs leading-relaxed text-white/90 font-normal line-clamp-1 mb-3">
                        {service.description}
                      </p>

                      {/* Bottom Row: Feature Tag & Action Footer */}
                      <div className="pt-2.5 border-t border-white/20 mt-auto flex items-center justify-between text-xs font-bold text-white/90 gap-2">
                        {firstFeature ? (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/15 text-white/95 border border-white/20 truncate max-w-[200px]">
                            {firstFeature}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Available
                          </span>
                        )}

                        <span className="text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                          <span>Learn more</span>
                          <span>&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet View: 3 Responsive Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Layers;
            const num = `/${String(index + 1).padStart(2, "0")}`;
            const theme = cardThemeStyles[index % cardThemeStyles.length];
            const firstFeature = service.features?.[0] || "";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block h-full"
                >
                  <div className={`bg-gradient-to-br ${theme.gradient} p-5 flex flex-col justify-between h-full text-white`}>
                    <div>
                      {/* Header Row: Icon + Number Badge + Arrow */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5 text-slate-800" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-mono font-bold px-3 py-0.5 rounded-full text-white border border-white/20 shadow-xs"
                            style={{ backgroundColor: theme.badgeBg }}
                          >
                            {num}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white mb-1.5">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-white/90 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Features & Footer */}
                    <div className="pt-3 border-t border-white/20 mt-auto flex items-center justify-between text-xs font-bold text-white/90">
                      {firstFeature && (
                        <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded bg-white/15 text-white/95 border border-white/20">
                          {firstFeature}
                        </span>
                      )}

                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform ml-auto">
                        <span>Learn more</span>
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
