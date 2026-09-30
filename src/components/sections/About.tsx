"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import defaultAbout from "@/data/about.json";
import { Sparkles, CheckCircle2, Zap, Cpu, Layers, Terminal, ShieldCheck } from "lucide-react";

// Tech icon mapping for stats
const statIcons = [Zap, CheckCircle2, Cpu, Layers];

export default function About() {
  const [data, setData] = useState(defaultAbout);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((res) => {
        if (res && typeof res === "object") {
          setData((prev) => ({
            ...prev,
            ...res,
            paragraphs: Array.isArray(res.paragraphs) && res.paragraphs.length > 0 ? res.paragraphs : prev.paragraphs,
            stats: Array.isArray(res.stats) && res.stats.length > 0 ? res.stats : prev.stats,
            techStack: {
              frontend: res.techStack?.frontend || prev.techStack?.frontend || [],
              backend: res.techStack?.backend || prev.techStack?.backend || [],
              tools: res.techStack?.tools || prev.techStack?.tools || [],
            },
          }));
        }
      })
      .catch((err) => console.error("Error loading about data:", err));
  }, []);

  const paragraphs = data?.paragraphs || defaultAbout.paragraphs;
  const stats = data?.stats || defaultAbout.stats;
  const techStack = data?.techStack || defaultAbout.techStack;

  return (
    <section id="about" className="py-24 bg-transparent border-t border-brand-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: About & Stats */}
          <div className="w-full lg:w-1/2">
            {data?.badge && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {data.badge}
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-brand-text mb-8 tracking-tight leading-tight"
            >
              {data?.headline || defaultAbout.headline}
            </motion.h2>

            <div className="flex flex-col gap-6 mb-12">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-lg leading-relaxed ${
                    index === paragraphs.length - 1
                      ? "text-brand-cyan font-semibold text-xl"
                      : "text-brand-text-muted"
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => {
                const StatIcon = statIcons[index % statIcons.length];
                return (
                  <motion.div
                    key={stat.label + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-brand-border hover:border-brand-cyan/60 transition-all duration-300 shadow-xs hover:shadow-lg group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                        <StatIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-brand-text-muted">0{index + 1}</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-brand-text mb-1 group-hover:text-brand-cyan transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs text-brand-text-muted font-bold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Core Capabilities & Tech Stack */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {/* Core Architectural Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 sm:p-8 rounded-3xl bg-brand-card/90 border border-brand-border backdrop-blur-sm relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-text">
                  Engineering Capabilities
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-brand-bg/70 border border-brand-border hover:border-brand-cyan/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-brand-cyan font-bold text-sm">
                    <Terminal className="w-4 h-4" />
                    <span>ERP & Business Logic</span>
                  </div>
                  <p className="text-xs text-brand-text-muted leading-relaxed">
                    Custom operational tools, inventory workflows, and financial ledgers tailored to specific operations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-bg/70 border border-brand-border hover:border-brand-cyan/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-brand-cyan font-bold text-sm">
                    <Layers className="w-4 h-4" />
                    <span>Full-Stack Scalability</span>
                  </div>
                  <p className="text-xs text-brand-text-muted leading-relaxed">
                    Modern web applications with responsive UI, real-time sync, and rock-solid relational databases.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-7 sm:p-8 rounded-3xl bg-brand-card/90 border border-brand-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-text">
                  Tools & Technologies
                </h3>
              </div>

              <div className="space-y-6">
                {techStack?.frontend && techStack.frontend.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-3">
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.frontend.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-brand-card hover:bg-brand-cyan/10 hover:border-brand-cyan/40 border border-brand-border rounded-xl text-xs font-semibold text-brand-text transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {techStack?.backend && techStack.backend.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-3">
                      Backend & Database
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.backend.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-brand-card hover:bg-brand-purple/10 hover:border-brand-purple/40 border border-brand-border rounded-xl text-xs font-semibold text-brand-text transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {techStack?.tools && techStack.tools.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-3">
                      DevOps & Productivity
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.tools.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-brand-card hover:border-brand-cyan/40 border border-brand-border rounded-xl text-xs font-semibold text-brand-text transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-4 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan shrink-0" />
                <p className="text-brand-cyan font-bold text-sm text-center">
                  Technology is the tool. Business results are the goal.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
