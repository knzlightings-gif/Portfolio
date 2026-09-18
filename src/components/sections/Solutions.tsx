"use client";

import { motion } from "framer-motion";
import { solutionsByBusiness } from "@/data/content";
import { Factory, Store, Truck, Briefcase, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Factory,
  Store,
  Truck,
  Briefcase,
  GraduationCap,
  Stethoscope,
};

// Industry specific rich descriptions and highlights
const businessDetails: Record<string, { subtitle: string; description: string; badge: string }> = {
  Manufacturing: {
    subtitle: "Factory & Production ERP",
    description: "End-to-end management for raw materials, batch schedules, inventory valuation & costing.",
    badge: "Industry 4.0",
  },
  Retail: {
    subtitle: "Multi-Store POS & Sales",
    description: "Fast barcode billing, customer credit ledgers, multi-branch stock sync & daily P&L.",
    badge: "Omnichannel",
  },
  Distribution: {
    subtitle: "Supply Chain & Wholesale",
    description: "Bulk order dispatch, delivery route management, warehouse bin tracking & live aging.",
    badge: "Logistics",
  },
  Services: {
    subtitle: "Agency & Operations Hub",
    description: "Job scheduling, timesheet tracking, automated invoicing & recurring subscriptions.",
    badge: "Workflow",
  },
  Education: {
    subtitle: "School & Academy Portal",
    description: "Student admission records, digital fee vouchers, automated alerts & exam grading.",
    badge: "EdTech",
  },
  Healthcare: {
    subtitle: "Clinic & Hospital System",
    description: "Doctor appointment bookings, EHR records, pharmacy stock & patient billing.",
    badge: "HealthTech",
  },
};

export default function Solutions() {
  return (
    <section className="py-10 md:py-14 bg-brand-bg relative overflow-hidden">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple">
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
          {solutionsByBusiness.map((solution, index) => {
            const Icon = iconMap[solution.icon];
            const details = businessDetails[solution.title] || {
              subtitle: "Custom Business System",
              description: "Streamlined digital workflows tailored specifically to solve your operational challenges.",
              badge: "Custom",
            };
            const num = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 shadow-md hover:shadow-[0_16px_36px_-8px_var(--theme-primary-glow,rgba(0,112,243,0.22))] hover:border-brand-cyan/50 transition-all duration-300 p-5 md:p-6"
              >
                {/* Top decorative gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Main Content Area */}
                <div className="relative z-10">
                  {/* Top Header Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan shadow-xs group-hover:bg-brand-cyan group-hover:text-white">
                      {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                        {details.badge}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-bg border border-brand-border text-brand-text-muted">
                        /{num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-cyan transition-colors duration-200">
                      {solution.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-cyan tracking-wide mt-0.5">
                      {details.subtitle}
                    </p>
                  </div>

                  {/* Clear Descriptive Text */}
                  <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                    {details.description}
                  </p>

                  {/* Modules / Features Pill List */}
                  <div className="mb-4">
                    <p className="text-[10px] uppercase font-bold text-brand-text-muted/80 tracking-wider mb-2">
                      Core Modules Included:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {solution.features.split(" + ").map((feature) => (
                        <span
                          key={feature}
                          className="text-[11px] font-semibold px-2 py-0.5 bg-brand-bg text-brand-text-muted border border-brand-border/70 rounded-md group-hover:border-brand-cyan/30 group-hover:text-brand-text transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-cyan" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Card Footer */}
                <div className="relative z-10 pt-3 border-t border-brand-border/50 flex items-center justify-between text-xs font-semibold text-brand-text-muted group-hover:text-brand-cyan transition-colors duration-200">
                  <span className="flex items-center gap-1.5 text-xs text-brand-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Production Ready
                  </span>
                  <div className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform duration-200 text-brand-cyan">
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
