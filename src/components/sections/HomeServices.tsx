"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowUpRight, 
  Cpu, 
  Database, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Cloud, 
  Bot, 
  BarChart3, 
  Server,
  Layers
} from "lucide-react";
import { defaultServices, ServiceItem } from "@/data/servicesData";
import Link from "next/link";

// Rich IT metadata per service
const serviceMetaMap: Record<string, {
  sysCode: string;
  badge: string;
  shortDesc: string;
  icon: any;
  techTags: { label: string; icon: any; color: string }[];
  latency: string;
}> = {
  automation: {
    sysCode: "SYS://WORKFLOW.AUTO_v3",
    badge: "AUTOMATION ENGINE",
    shortDesc: "Automate repetitive manual operations, invoice dispatch & instant data sync.",
    icon: Workflow,
    techTags: [
      { label: "WhatsApp & Email Bot Triggers", icon: Zap, color: "text-amber-500" },
      { label: "Excel/CSV Batch Sync Pipelines", icon: Bot, color: "text-brand-cyan" },
      { label: "Zero-Error Scheduled Jobs", icon: ShieldCheck, color: "text-emerald-500" },
    ],
    latency: "⚡ Real-Time Sync",
  },
  erp: {
    sysCode: "SYS://ERP.CORE_LEDGER",
    badge: "ENTERPRISE CLUSTER",
    shortDesc: "Full control of inventory, double-entry accounts, purchases & multi-branch sales.",
    icon: Database,
    techTags: [
      { label: "Live Multi-Warehouse Stock", icon: Database, color: "text-brand-cyan" },
      { label: "Automated Financial Ledgers", icon: BarChart3, color: "text-purple-500" },
      { label: "Role-Based Access Control", icon: ShieldCheck, color: "text-emerald-500" },
    ],
    latency: "🔒 99.9% Uptime",
  },
  "web-apps": {
    sysCode: "SYS://CLOUD.APP_NODE",
    badge: "HIGH-SPEED SAAS",
    shortDesc: "High-performance business portals, executive dashboards & custom SaaS tools.",
    icon: Terminal,
    techTags: [
      { label: "Executive Analytics Dashboards", icon: Terminal, color: "text-brand-cyan" },
      { label: "Scalable Cloud Database", icon: Cloud, color: "text-blue-500" },
      { label: "Secure REST APIs & Webhooks", icon: Cpu, color: "text-emerald-500" },
    ],
    latency: "⚡ <15ms Latency",
  },
};

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const meta = serviceMetaMap[service.id] || {
    sysCode: `SYS://${service.id.toUpperCase()}_v1`,
    badge: "CORE SYSTEM",
    shortDesc: service.description,
    icon: Layers,
    techTags: [],
    latency: "⚡ High Performance",
  };

  const IconComponent = meta.icon;

  return (
    <motion.div
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
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center bg-white/95 dark:bg-teal-950/80 border border-[#004D40]/25 text-[#004D40] dark:text-brand-cyan mb-4 shadow-2xs group-hover:scale-110 group-hover:bg-[#004D40] group-hover:text-white group-hover:shadow-md transition-all duration-300 relative z-10">
            <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.8} />
          </div>

          {/* Centered Title */}
          <h3 className="text-base sm:text-lg font-bold text-brand-text mb-1.5 group-hover:text-[#004D40] dark:group-hover:text-brand-cyan transition-colors relative z-10">
            {service.title}
          </h3>

          {/* Short, compact description with high-contrast text */}
          <p className="text-xs text-brand-text-muted font-medium leading-relaxed mb-3 max-w-[260px] line-clamp-2 relative z-10">
            {meta.shortDesc}
          </p>

          {/* Centered IT Metric / Highlight */}
          <div className="text-base sm:text-lg font-extrabold text-[#004D40] dark:text-brand-cyan mb-4 tracking-tight relative z-10">
            {meta.latency}
          </div>

          {/* Centered Pill Button */}
          <span className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold bg-[#004D40] hover:bg-[#00382E] text-white shadow-xs group-hover:shadow-lg group-hover:scale-105 transition-all relative z-10">
            Explore Stack
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const targetIds = ["automation", "erp", "web-apps"];
            const filtered = data.filter((s: ServiceItem) => targetIds.includes(s.id));
            setServices(filtered.length > 0 ? filtered : defaultServices);
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
    <section id="services" className="py-10 md:py-14 bg-transparent relative overflow-hidden">
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
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#00796B] to-[#059669]">Services & Solutions</span>
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

