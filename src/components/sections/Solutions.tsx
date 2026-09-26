"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { solutionsByBusiness as defaultSolutionsByBusiness } from "@/data/content";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal, 
  Server,
  Workflow
} from "lucide-react";

const solutionIconMap: Record<string, any> = {
  Manufacturing: Cpu,
  Retail: Layers,
  Distribution: Server,
  Services: Workflow,
  Education: Terminal,
  Healthcare: ShieldCheck,
};

function SolutionCard({ solution, index }: { solution: any; index: number }) {
  const IconComponent = solutionIconMap[solution.title] || Database;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="h-full"
    >
      <div className="relative overflow-hidden flex flex-col items-center text-center justify-between h-full p-6 sm:p-7 rounded-2xl bg-brand-card border border-brand-border/80 shadow-xs hover:shadow-[0_24px_50px_-10px_rgba(0,77,64,0.36),0_12px_24px_-6px_rgba(0,77,64,0.22)] hover:border-[#004D40] dark:hover:border-brand-cyan hover:-translate-y-1.5 hover:bg-[#C2E3DC] dark:hover:bg-[#14332D] transition-all duration-300 group">
        
        {/* Prominent hover shade overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-[#004D40]/[0.03] to-[#004D40]/[0.10] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Centered IT Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/95 dark:bg-teal-950/80 border border-[#004D40]/25 text-[#004D40] dark:text-brand-cyan mb-3.5 shadow-2xs group-hover:scale-110 group-hover:bg-[#004D40] group-hover:text-white group-hover:shadow-md transition-all duration-300 relative z-10">
          <IconComponent className="w-8 h-8" strokeWidth={1.8} />
        </div>

        {/* Centered Title */}
        <h3 className="text-base sm:text-lg font-bold text-brand-text mb-1 group-hover:text-[#004D40] dark:group-hover:text-brand-cyan transition-colors relative z-10">
          {solution.title}
        </h3>

        {/* Short, compact description with high-contrast text */}
        <p className="text-xs text-brand-text-muted font-medium leading-relaxed mb-3 max-w-[240px] line-clamp-2 relative z-10">
          {solution.description}
        </p>

        {/* Centered IT Metric / Subtitle */}
        <div className="text-sm sm:text-base font-extrabold text-[#004D40] dark:text-brand-cyan mb-3.5 tracking-tight relative z-10">
          {solution.subtitle || "Enterprise Ready"}
        </div>

        {/* Centered Pill Button */}
        <a 
          href="/contact"
          className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold bg-[#004D40] hover:bg-[#00382E] text-white shadow-xs group-hover:shadow-lg group-hover:scale-105 transition-all relative z-10"
        >
          View Solution
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  const [solutions, setSolutions] = useState<any[]>([]);

  useEffect(() => {
    async function loadSolutions() {
      try {
        const res = await fetch("/api/solutions", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSolutions(data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load solutions:", err);
      }
      setSolutions(
        defaultSolutionsByBusiness.map((s) => ({
          id: s.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          title: s.title,
          subtitle: s.title === "Manufacturing" ? "Factory & Production ERP" :
                    s.title === "Retail" ? "Multi-Store POS & Sales" :
                    s.title === "Distribution" ? "Supply Chain & Wholesale" :
                    s.title === "Services" ? "Agency & Operations Hub" :
                    s.title === "Education" ? "School & Academy Portal" :
                    s.title === "Healthcare" ? "Clinic & Hospital System" : "Custom Business System",
          description: s.title === "Manufacturing" ? "End-to-end management for raw materials, batch schedules, inventory valuation & costing." :
                       s.title === "Retail" ? "Fast barcode billing, customer credit ledgers, multi-branch stock sync & daily P&L." :
                       s.title === "Distribution" ? "Bulk order dispatch, delivery route management, warehouse bin tracking & live aging." :
                       s.title === "Services" ? "Job scheduling, timesheet tracking, automated invoicing & recurring subscriptions." :
                       s.title === "Education" ? "Student admission records, digital fee vouchers, automated alerts & exam grading." :
                       s.title === "Healthcare" ? "Doctor appointment bookings, EHR records, pharmacy stock & patient billing." : "Custom digital workflow system tailored to your exact operational challenges.",
          badge: s.title === "Manufacturing" ? "Industry 4.0" :
                 s.title === "Retail" ? "Omnichannel" :
                 s.title === "Distribution" ? "Logistics" :
                 s.title === "Services" ? "Workflow" :
                 s.title === "Education" ? "EdTech" :
                 s.title === "Healthcare" ? "HealthTech" : "Custom",
          features: s.features,
          icon: s.icon,
        }))
      );
    }
    loadSolutions();
  }, []);

  return (
    <section className="py-10 md:py-14 bg-transparent relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Tailored Industry Software
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-brand-text mb-3 tracking-tight"
          >
            Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#00796B] to-[#059669]">
              Different Businesses
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-brand-text-muted max-w-xl mx-auto leading-relaxed"
          >
            Purpose-built business software tailored around your exact operations and industry compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id || solution.title} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

