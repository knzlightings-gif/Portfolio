"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Cpu, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface ProcessStepDetail {
  step: string;
  title: string;
  subtitle: string;
  phase: string;
  description: string;
  icon: any;
  deliverables: string[];
  duration: string;
}

const processSteps: ProcessStepDetail[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Problem Diagnosis & Audit",
    phase: "Phase 01",
    duration: "Day 1 – 2",
    description: "Deep-dive into your day-to-day operations to pinpoint manual bottlenecks, scattered files, and exact pain points.",
    icon: Search,
    deliverables: ["Process Bottleneck Audit", "Operational Gap Analysis", "Scope & Requirements Doc"],
  },
  {
    step: "02",
    title: "Analyze",
    subtitle: "Workflow & Data Mapping",
    phase: "Phase 02",
    duration: "Day 3 – 5",
    description: "Map your exact business logic, staff roles, approval hierarchies, and calculation rules into structured data models.",
    icon: Cpu,
    deliverables: ["Workflow Flowcharts", "User Permission Matrix", "Data Schema Architecture"],
  },
  {
    step: "03",
    title: "Plan",
    subtitle: "System Architecture & UI/UX",
    phase: "Phase 03",
    duration: "Week 2",
    description: "Architect the database structure, intuitive dashboard layouts, and modular software blueprints for seamless adoption.",
    icon: Layers,
    deliverables: ["Interactive Prototypes", "Database Entity Design", "Milestone Sprint Roadmap"],
  },
  {
    step: "04",
    title: "Build",
    subtitle: "Custom Engineering & AI",
    phase: "Phase 04",
    duration: "Week 3 – 4",
    description: "Develop your tailored digital platform using modern web technologies, scalable APIs, and robust cloud infrastructure.",
    icon: Code2,
    deliverables: ["Custom ERP Modules", "REST/Webhook Integrations", "Responsive Dashboard UI"],
  },
  {
    step: "05",
    title: "Test",
    subtitle: "Rigorous Quality Assurance",
    phase: "Phase 05",
    duration: "Week 5",
    description: "Simulate real-world heavy usage, edge-case financial calculations, role permissions, and cross-device responsiveness.",
    icon: ShieldCheck,
    deliverables: ["Calculation Verification", "Security & Access Checks", "Client UAT Feedback Session"],
  },
  {
    step: "06",
    title: "Deploy & Scale",
    subtitle: "Go-Live & Ongoing Support",
    phase: "Phase 06",
    duration: "Live & Beyond",
    description: "Seamless zero-downtime deployment, staff onboarding, hands-on training, and ongoing iterative improvements as your business grows.",
    icon: Rocket,
    deliverables: ["Zero-Downtime Cloud Launch", "Staff Video Walkthroughs", "Continuous Feature Updates"],
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[160px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[160px] translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Predictable 6-Step Methodology
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-text mb-5 tracking-tight"
          >
            From Problem to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#00796B] to-[#059669]">
              Working Software
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            A transparent, sprint-driven engineering process designed to eliminate business chaos and guarantee reliable software delivery.
          </motion.p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {processSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/80 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_45px_-12px_var(--theme-primary-glow,rgba(0,112,243,0.22))] hover:border-brand-cyan/50 transition-all duration-500 hover:-translate-y-2 p-8"
              >
                {/* Top Glowing Gradient Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Soft Ambient Corner Glow on Hover */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-60 bg-brand-cyan/30" />

                {/* Giant Faint Step Number Watermark */}
                <div className="absolute top-4 right-6 text-7xl font-black text-slate-100 font-mono select-none group-hover:text-brand-cyan/10 transition-colors duration-400 pointer-events-none">
                  {item.step}
                </div>

                {/* Main Content Area */}
                <div className="relative z-10">
                  
                  {/* Header Row: Icon + Phase Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-cyan/15 group-hover:shadow-[0_8px_20px_var(--theme-primary-glow,rgba(0,112,243,0.3))] transition-all duration-400">
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full badge-brand-subtle tracking-wider uppercase font-mono">
                        {item.phase}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle & Title */}
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Descriptive text */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Key Deliverables Pills List */}
                  <div className="mb-6 pt-2">
                    <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mb-3">
                      Key Deliverables:
                    </p>
                    <div className="flex flex-col gap-2">
                      {item.deliverables.map((deliv, dIdx) => (
                        <div 
                          key={dIdx}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100/70 border border-slate-200/60 rounded-lg px-3 py-1.5 group-hover:bg-white group-hover:border-brand-cyan/30 transition-all duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                          <span className="truncate">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Interactive Card Footer */}
                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-cyan transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-700 font-bold">{item.duration}</span>
                  </span>

                  <div className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <span>Verified Sprint</span>
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
