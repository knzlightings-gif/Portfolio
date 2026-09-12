"use client";

import { motion } from "framer-motion";
import { solutionsByBusiness } from "@/data/content";
import { Factory, Store, Truck, Briefcase, GraduationCap, Stethoscope } from "lucide-react";

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
    description: "End-to-end management for raw materials, batch production schedules, inventory valuation, and automated cost calculation.",
    badge: "Industry 4.0",
  },
  Retail: {
    subtitle: "Multi-Store POS & Sales",
    description: "Fast barcode billing, customer credit ledgers, multi-branch stock sync, and real-time daily profit/loss reports.",
    badge: "Omnichannel",
  },
  Distribution: {
    subtitle: "Supply Chain & Wholesale",
    description: "Bulk order dispatch, delivery route management, warehouse bin tracking, and live accounts receivable aging.",
    badge: "Logistics",
  },
  Services: {
    subtitle: "Agency & Operations Hub",
    description: "Job scheduling, timesheet tracking, automated client invoicing, milestone approvals, and recurring subscriptions.",
    badge: "Workflow",
  },
  Education: {
    subtitle: "School & Academy Portal",
    description: "Student admission records, digital fee vouchers, automated SMS/WhatsApp alerts, teacher attendance, and exam grading.",
    badge: "EdTech",
  },
  Healthcare: {
    subtitle: "Clinic & Hospital System",
    description: "Doctor appointment bookings, electronic health records (EHR), pharmacy stock management, and patient billing.",
    badge: "HealthTech",
  },
};

export default function Solutions() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Tailored Industry Software
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-brand-text mb-4 tracking-tight"
          >
            Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">
              Different Businesses
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Purpose-built business software tailored around your specific operations and industry compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-white via-white to-stone-50/70 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(28,25,23,0.06),0_2px_6px_-2px_rgba(28,25,23,0.04)] hover:shadow-[0_20px_35px_-10px_var(--theme-primary-glow,rgba(0,112,243,0.18))] hover:border-brand-cyan/40 transition-all duration-400 hover:-translate-y-1.5 p-7"
              >
                {/* Top decorative gradient accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                />

                {/* Soft ambient corner glow on hover */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-60 bg-brand-cyan/30"
                />

                {/* Main Content Area */}
                <div className="relative z-10">
                  {/* Top Header Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs border bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan group-hover:shadow-[0_4px_14px_var(--theme-primary-glow,rgba(0,112,243,0.25))]"
                    >
                      {Icon && <Icon className="w-6 h-6 stroke-[2.2]" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full badge-brand-subtle tracking-wide">
                        {details.badge}
                      </span>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-stone-100/90 text-stone-500 font-mono">
                        /{num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-brand-cyan transition-colors duration-200">
                      {solution.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-cyan tracking-wide mt-0.5">
                      {details.subtitle}
                    </p>
                  </div>

                  {/* Clear Descriptive Text */}
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {details.description}
                  </p>

                  {/* Modules / Features Pill List */}
                  <div className="mb-6">
                    <p className="text-[11px] uppercase font-bold text-stone-600 tracking-wider mb-2.5">
                      Core Modules Included:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.features.split(" + ").map((feature) => (
                        <span
                          key={feature}
                          className="text-xs font-medium px-2.5 py-1 bg-stone-100/90 text-stone-700 border border-stone-200/70 rounded-md group-hover:bg-white group-hover:border-brand-cyan/40 transition-all duration-200 flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-cyan" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Card Footer */}
                <div className="relative z-10 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500 group-hover:text-brand-cyan transition-colors duration-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Production Ready
                  </span>
                  <div className="flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform duration-200">
                    <span>View Architecture</span>
                    <span>→</span>
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
