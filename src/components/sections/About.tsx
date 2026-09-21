"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import defaultAbout from "@/data/about.json";
import { Sparkles, CheckCircle2, User } from "lucide-react";

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
  const photoCaption = data?.photoCaption || "";
  const techStack = data?.techStack || defaultAbout.techStack;

  return (
    <section id="about" className="py-24 bg-brand-bg border-t border-brand-border relative overflow-hidden">
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
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-7 rounded-3xl bg-brand-bg/80 backdrop-blur-sm border border-brand-border hover:border-brand-cyan/40 transition-all duration-300 shadow-sm group"
                >
                  <div className="text-4xl md:text-5xl font-black text-brand-text mb-2 group-hover:text-brand-cyan transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-brand-text-muted font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Tech Stack & Portrait */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            {/* Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full rounded-3xl overflow-hidden bg-brand-bg border border-brand-border shadow-2xl group"
            >
              {data?.photoUrl ? (
                <div className="relative aspect-[4/3] md:aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={data.photoUrl}
                    alt={photoCaption || "Developer Portrait"}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Floating Experience Badge */}
                  {data.experienceBadge && (
                    <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {data.experienceBadge}
                    </div>
                  )}

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-white">
                          {photoCaption.split("•")[0]?.trim() || photoCaption}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                      </div>
                      {photoCaption.includes("•") && (
                        <p className="text-xs text-white/80 font-medium">
                          {photoCaption.split("•")[1]?.trim()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Sleek modern placeholder if no photo uploaded yet */
                <div className="aspect-[4/3] md:aspect-[16/11] w-full p-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-bg via-brand-card to-brand-bg text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/10 via-transparent to-transparent opacity-50" />
                  <div className="w-28 h-28 rounded-3xl bg-brand-cyan/10 border-2 border-dashed border-brand-cyan/40 flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 group-hover:border-brand-cyan transition-all duration-300">
                    <User className="w-12 h-12 text-brand-cyan" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-text relative z-10 mb-1">
                    {photoCaption || "Professional Developer Portrait"}
                  </h4>
                  <p className="text-xs text-brand-text-muted max-w-sm relative z-10 mb-4">
                    {data?.experienceBadge || "Upload your real high-resolution photo from the Admin Panel to display here."}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                    <Sparkles className="w-3 h-3" /> Admin Studio Ready
                  </span>
                </div>
              )}
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-brand-bg/60 border border-brand-border backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
                <span className="w-2 h-6 rounded-full bg-brand-cyan" />
                Tools & Technologies
              </h3>

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
