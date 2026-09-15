"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Database, LayoutDashboard, Zap, Cpu, ArrowRight, Sparkles } from "lucide-react";

const coreServices = [
  {
    id: "erp",
    icon: Database,
    badge: "Core ERP",
    title: "ERP Systems",
    description: "Custom ERP solutions for managing sales, purchases, inventory, ledgers, and accounts.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderHover: "hover:border-cyan-500/50",
    glow: "rgba(0, 180, 216, 0.25)",
    tags: ["Inventory", "Accounts", "Sales"]
  },
  {
    id: "web-apps",
    icon: LayoutDashboard,
    badge: "Web Apps",
    title: "Business Web Applications",
    description: "Modern web dashboards, portals, and management tools designed for high performance.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    borderHover: "hover:border-purple-500/50",
    glow: "rgba(139, 92, 246, 0.25)",
    tags: ["Dashboards", "Portals", "Real-Time"]
  },
  {
    id: "automation",
    icon: Zap,
    badge: "Automation",
    title: "Workflow Automation",
    description: "Eliminate repetitive manual tasks with streamlined digital workflows and automated data imports.",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderHover: "hover:border-amber-500/50",
    glow: "rgba(245, 158, 11, 0.25)",
    tags: ["Auto Workflows", "Data Import", "Efficiency"]
  },
  {
    id: "ai-cloud",
    icon: Cpu,
    badge: "AI & Cloud",
    title: "AI & Custom Software",
    description: "Next-gen software engineering combining modern web stacks, APIs, and AI-accelerated workflows.",
    gradient: "from-cyan-500/20 to-emerald-500/20",
    borderHover: "hover:border-emerald-500/50",
    glow: "rgba(16, 185, 129, 0.25)",
    tags: ["API Integration", "AI-Powered", "Cloud"]
  }
];

export default function QuickIntro() {
  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            Core Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-text mb-4 tracking-tight"
          >
            Services Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Business Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-brand-text-muted"
          >
            Tailored software solutions designed to eliminate operational friction and scale your business efficiently.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group relative p-6 md:p-7 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 ${service.borderHover} transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl`}
              >
                {/* Top card accent */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} border border-brand-border flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <IconComponent className="w-6 h-6 text-brand-cyan group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-bg/80 border border-brand-border text-brand-text-muted">
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-2.5 group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer Tags & Arrow */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/50">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-cyan to-brand-purple hover:from-brand-purple hover:to-brand-cyan shadow-lg shadow-brand-cyan/20 hover:shadow-brand-purple/30 hover:scale-105 transition-all duration-300"
          >
            Explore Detailed Services & Solutions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
