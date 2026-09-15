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
  Server,
  ShieldCheck,
  Code,
  Globe,
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

const iconMap: Record<string, any> = {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link: LinkIcon,
  BarChart,
  Server,
  ShieldCheck,
  Code,
  Globe,
};

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch home services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  if (!loading && services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Background ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-brand-border/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
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

        {/* Dynamic Services Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="h-56 rounded-2xl bg-brand-card/50 border border-brand-border/50 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-border/50" />
                  <div className="w-3/4 h-5 bg-brand-border/50 rounded" />
                  <div className="w-full h-4 bg-brand-border/40 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComp = iconMap[service.icon] || Layers;
              const num = String(index + 1).padStart(2, "0");
              const displayFeatures = service.features?.slice(0, 2) || [];

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={`/services/${service.id}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-card/90 border border-brand-border/80 shadow-sm hover:shadow-[0_16px_36px_-8px_var(--theme-primary-glow,rgba(0,112,243,0.28))] hover:border-brand-cyan/50 transition-all duration-300 p-6 cursor-pointer select-none backdrop-blur-md h-full block"
                  >
                    {/* Top Ambient Glow Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Header Row: Icon + Number Badge + Hover Arrow */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-brand-cyan/15 to-brand-purple/15 border border-brand-cyan/30 text-brand-cyan shadow-xs group-hover:border-brand-cyan/60 group-hover:shadow-[0_0_16px_var(--theme-primary-glow,rgba(0,112,243,0.35))]">
                          <IconComp className="w-6 h-6 stroke-[2.2]" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-brand-bg/80 text-brand-text-muted border border-brand-border/70 font-mono tracking-wider group-hover:border-brand-cyan/40 group-hover:text-brand-cyan transition-colors">
                            /{num}
                          </span>
                          <div className="w-7 h-7 rounded-lg bg-brand-bg/60 border border-brand-border/60 flex items-center justify-center text-brand-text-muted group-hover:text-brand-cyan group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 transition-all">
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-brand-text mb-2 tracking-tight group-hover:text-brand-cyan transition-colors duration-200">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed mb-5 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Chips & Footer */}
                    <div className="space-y-4 pt-4 border-t border-brand-border/40 mt-auto">
                      {displayFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {displayFeatures.map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-brand-bg/80 text-brand-text-muted border border-brand-border/60 group-hover:border-brand-cyan/30 group-hover:text-brand-text transition-colors truncate max-w-[200px]"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs font-bold text-brand-text-muted group-hover:text-brand-cyan transition-colors">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {service.status || "Available"}
                        </span>
                        <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Learn more &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
