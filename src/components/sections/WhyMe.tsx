"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Layers, 
  MousePointerClick, 
  Code2, 
  TrendingUp, 
  HeartHandshake, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";

const principles = [
  {
    num: "01",
    tag: "Foundation",
    title: "Business Understanding",
    description: "I focus on understanding how your business actually operates — workflows, bottlenecks, and KPIs — before writing a single line of code.",
    icon: Compass,
    gradient: "from-blue-500 to-cyan-400",
    bgGlow: "rgba(6, 182, 212, 0.15)",
    borderHover: "group-hover:border-cyan-500/50",
    badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    num: "02",
    tag: "Execution",
    title: "Practical Solutions",
    description: "No unnecessary over-engineering. I build lean, high-impact features that directly solve operational friction and deliver tangible ROI.",
    icon: Layers,
    gradient: "from-purple-500 to-indigo-500",
    bgGlow: "rgba(168, 85, 247, 0.15)",
    borderHover: "group-hover:border-purple-500/50",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    num: "03",
    tag: "Usability",
    title: "User-Friendly Systems",
    description: "Software should empower people, not confuse them. Intuitive interfaces and zero learning-curve workflows tailored for non-technical teams.",
    icon: MousePointerClick,
    gradient: "from-emerald-500 to-teal-400",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    borderHover: "group-hover:border-emerald-500/50",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    num: "04",
    tag: "Tech Stack",
    title: "Modern Development",
    description: "Engineered with modern full-stack architectures, high-performance APIs, robust security, and AI-assisted workflows for rapid delivery.",
    icon: Code2,
    gradient: "from-sky-500 to-blue-600",
    bgGlow: "rgba(59, 130, 246, 0.15)",
    borderHover: "group-hover:border-blue-500/50",
    badgeColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    num: "05",
    tag: "Scalability",
    title: "Long-Term Thinking",
    description: "Architected for tomorrow. Scalable databases, modular design patterns, and clean code that easily adapts as your business expands.",
    icon: TrendingUp,
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "rgba(245, 158, 11, 0.15)",
    borderHover: "group-hover:border-amber-500/50",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    num: "06",
    tag: "Reliability",
    title: "Continuous Support",
    description: "Dedicated maintenance, proactive performance monitoring, and seamless updates so your critical systems stay 99.9% reliable.",
    icon: HeartHandshake,
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "rgba(244, 63, 94, 0.15)",
    borderHover: "group-hover:border-rose-500/50",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
];

export default function WhyMe() {
  return (
    <section className="py-28 bg-brand-bg relative overflow-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            Core Engineering Philosophy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-text mb-6 leading-[1.15] tracking-tight"
          >
            Technology Is Only Useful When{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-600 to-brand-purple">
              It Solves Real Problems.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text-muted leading-relaxed"
          >
            I combine deep domain comprehension with modern development standards to deliver software that drives efficiency, eliminates chaos, and fuels measurable growth.
          </motion.p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className={`group relative p-8 md:p-9 rounded-[28px] bg-brand-card/90 backdrop-blur-md border border-brand-border/80 transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl z-10 ${item.borderHover} overflow-hidden flex flex-col justify-between`}
              >
                {/* Ambient Card Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${item.bgGlow}, transparent 70%)`
                  }}
                />

                {/* Top Subtle Light Line Accent */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                />

                <div>
                  {/* Top Bar: Icon + Number & Tag Badge */}
                  <div className="flex items-center justify-between mb-8">
                    {/* Glowing Icon Container */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} p-0.5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <div className="w-full h-full bg-brand-card rounded-[14px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-brand-text group-hover:text-brand-cyan transition-colors" />
                        </div>
                      </div>
                      {/* Icon Ambient Glow */}
                      <div 
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-300 -z-10`} 
                      />
                    </div>

                    {/* Tag & Watermark Number */}
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="font-mono text-2xl font-black text-brand-text-muted/30 group-hover:text-brand-text-muted/60 transition-colors">
                        {item.num}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-brand-text mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-text group-hover:to-brand-cyan transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-text-muted leading-relaxed text-sm md:text-base mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Micro-Detail */}
                <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-semibold text-brand-text-muted group-hover:text-brand-cyan transition-colors">
                  <span>Guaranteed Principle</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
