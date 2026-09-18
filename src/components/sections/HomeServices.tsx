"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link as LinkIcon,
  BarChart,
  Sparkles,
  Layers,
  LucideIcon,
  ArrowUpRight,
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

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch home services:", err);
      }
      setServices(defaultServices);
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="py-10 md:py-14 bg-brand-bg relative overflow-hidden">
      {/* Background ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-brand-border/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple">Services & Solutions</span>
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

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Layers;
            const firstFeature = service.features?.[0] || "";
            const num = `/${String(index + 1).padStart(2, "0")}`;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="h-full"
              >
                <div
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 shadow-md hover:shadow-[0_20px_40px_-8px_var(--theme-primary-glow,rgba(0,112,243,0.3))] hover:border-brand-cyan/60 transition-all duration-300 p-6 md:p-7 h-full"
                >
                  {/* Top Ambient Gradient Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header Row: Icon + Number Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shadow-xs group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-cyan group-hover:text-white transition-all duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-brand-bg border border-brand-border text-brand-text-muted group-hover:border-brand-cyan/40 group-hover:text-brand-cyan transition-colors">
                        {num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-brand-text mb-2 tracking-tight group-hover:text-brand-cyan transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-brand-text-muted leading-relaxed mb-6 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Tag & Footer */}
                  <div className="pt-4 border-t border-brand-border/50 mt-auto space-y-3">
                    {firstFeature && (
                      <span className="inline-block text-xs font-medium px-3 py-1 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/70 group-hover:border-brand-cyan/30 group-hover:text-brand-text transition-colors truncate max-w-full">
                        {firstFeature}
                      </span>
                    )}

                    <div className="flex items-center justify-between text-xs font-bold text-brand-text-muted">
                      <span className="flex items-center gap-1.5 text-xs text-brand-text">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active Service
                      </span>
                      <span className="flex items-center gap-1 text-brand-cyan font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
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
