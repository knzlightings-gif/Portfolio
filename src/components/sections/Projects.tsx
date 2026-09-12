"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { featuredProjects as defaultProjects } from "@/data/content";
import DashboardMockup from "@/components/ui/DashboardMockup";
import { ArrowRight, CheckCircle2, ExternalLink, KeyRound, Sparkles, Eye } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  modules: string[];
  tech: string[];
  image: string;
  demoUrl?: string;
  demoCredentials?: string;
  hasCaseStudy?: boolean;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects as Project[]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <section id="projects" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Tested & Proven Systems
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4"
          >
            Featured ERPs & Live Applications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-text-muted max-w-2xl"
          >
            Real-world enterprise systems designed to eliminate manual delays and scale business operations.
          </motion.p>
        </div>

        <div className="flex flex-col gap-14 md:gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Project Visual Chassis */}
              <div className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl bg-brand-card/90 border border-brand-border/80 overflow-hidden shadow-2xl relative group">
                {project.image && !project.image.includes("placeholder") ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <DashboardMockup
                    title={project.title}
                    themeColor={index % 2 === 0 ? "cyan" : "purple"}
                  />
                )}

                {/* Live Demo Status Pill if active */}
                {project.demoUrl && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wide shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Demo Active
                    </span>
                  </div>
                )}

                {/* Hover overlay with instant actions */}
                <div className="absolute inset-0 bg-brand-bg/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-sm z-20">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 btn-brand-gradient font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
                    >
                      <span>🚀 Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}

                  {project.hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.id}`}
                      className="px-6 py-2.5 bg-brand-card border border-brand-border text-brand-text font-semibold rounded-full hover:border-brand-cyan hover:text-brand-cyan transition-all flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> View Case Study
                    </Link>
                  ) : (
                    !project.demoUrl && (
                      <a
                        href="#contact"
                        className="px-6 py-3 btn-brand-gradient font-semibold rounded-full hover:scale-105 transition-all flex items-center gap-2"
                      >
                        Request Demo Walkthrough <ArrowRight className="w-4 h-4" />
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Project Info Column */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-brand-cyan font-semibold text-xs tracking-wider uppercase px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
                    {project.category}
                  </span>
                  {project.demoUrl && (
                    <span className="text-emerald-400 font-medium text-xs tracking-wide px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Live Demo Ready
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-text mb-5">
                  {project.title}
                </h3>

                {/* Problem / Solution Cards */}
                <div className="space-y-4 mb-6 w-full">
                  <div className="bg-brand-card/70 border border-brand-border/70 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
                    <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      The Problem
                    </h4>
                    <p className="text-brand-text text-sm sm:text-base leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="bg-brand-card/70 border border-brand-border/70 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
                    <h4 className="text-xs font-bold text-brand-cyan uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      The Solution
                    </h4>
                    <p className="text-brand-text text-sm sm:text-base leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Key Modules */}
                <div className="mb-6 w-full">
                  <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2.5">Key System Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.modules?.map((m) => (
                      <span key={m} className="flex items-center gap-1.5 px-3 py-1 bg-brand-card/80 border border-brand-border rounded-full text-xs font-medium text-brand-text-muted hover:border-brand-cyan/50 hover:text-brand-text transition-colors">
                        <CheckCircle2 className="w-3 h-3 text-brand-cyan shrink-0" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech?.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 bg-brand-bg border border-brand-border/70 text-brand-text-muted rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Demo Action Bar & Credentials */}
                <div className="w-full pt-4 border-t border-brand-border/50 flex flex-col sm:flex-row sm:items-center gap-4">
                  {project.demoUrl ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 btn-brand-gradient font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group text-sm"
                      >
                        <span>🚀 Explore Live System</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      {project.demoCredentials && (
                        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-card/80 border border-brand-border/80 text-xs text-brand-text font-mono">
                          <KeyRound className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          <span className="truncate">{project.demoCredentials}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-xl bg-brand-card border border-brand-border/80 hover:border-brand-cyan/60 text-brand-text font-semibold hover:text-brand-cyan transition-all flex items-center justify-center gap-2 text-sm group"
                    >
                      <span>Request Live Walkthrough</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-cyan" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
