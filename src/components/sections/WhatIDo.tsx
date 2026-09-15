"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { whatIDo } from "@/data/content";
import { Database, LayoutDashboard, Workflow, Cpu, Link as LinkIcon, BarChart, Server, ShieldCheck, Code, Globe, ArrowUpRight } from "lucide-react";

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

// Compact, crisp tags for each service card
const serviceTags: Record<string, string[]> = {
  erp: ["Stock & Inventory", "Sales & Accounts"],
  "web-apps": ["Custom Dashboards", "Portals"],
  automation: ["Auto Workflows", "Smart Triggers"],
  ai: ["AI Workflows", "Fast Delivery"],
  api: ["Payment APIs", "Webhooks"],
  analytics: ["Real-time KPIs", "Visual Charts"],
};

export default function WhatIDo() {
  const [servicesList, setServicesList] = useState(whatIDo);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServicesList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic services in WhatIDo:", err);
      }
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Background ambient gradient orbs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-cyan/10 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-purple/10 rounded-full blur-[130px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            What I Do
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-text mb-3 tracking-tight">
            Software Built Around{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">
              Your Business
            </span>
          </h2>
          <p className="text-sm md:text-base text-brand-text-muted max-w-xl leading-relaxed">
            Every business works differently. I build software around your actual workflow instead of forcing your business into a complicated system.
          </p>
        </motion.div>

        {/* Compact Icon-First Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((service: any, index: number) => {
            const Icon = iconMap[service.icon] || Database;
            const num = String(index + 1).padStart(2, "0");
            const tags = (service.features && service.features.length > 0)
              ? service.features.slice(0, 2)
              : (serviceTags[service.id] || ["Custom", "Scalable"]);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-card/90 border border-brand-border/80 shadow-sm hover:shadow-[0_12px_30px_-8px_var(--theme-primary-glow,rgba(0,112,243,0.25))] hover:border-brand-cyan/50 transition-all duration-300 p-5 md:p-6 cursor-pointer select-none backdrop-blur-md h-full block"
                >
                  {/* Subtle Top Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header Row: Icon + Number & Direct Link Arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-brand-cyan/15 to-brand-purple/15 border border-brand-cyan/30 text-brand-cyan shadow-xs group-hover:border-brand-cyan/60 group-hover:shadow-[0_0_16px_var(--theme-primary-glow,rgba(0,112,243,0.35))]">
                        {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
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
                    <h3 className="text-lg font-bold text-brand-text mb-1.5 tracking-tight group-hover:text-brand-cyan transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description - Pruned line count to prevent congestion */}
                    <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Compact Feature Chips & Quick Footer */}
                  <div className="space-y-3 pt-3 border-t border-brand-border/40 mt-auto">
                    {/* Minimalist Micro Feature Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-brand-bg/70 text-brand-text-muted border border-brand-border/60 group-hover:border-brand-cyan/30 group-hover:text-brand-text transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Compact Footer Line */}
                    <div className="flex items-center justify-between text-[11px] font-bold text-brand-text-muted group-hover:text-brand-cyan transition-colors">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {service.status || "Available"}
                      </span>
                      <span className="font-semibold group-hover:underline">
                        Learn more &rarr;
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

