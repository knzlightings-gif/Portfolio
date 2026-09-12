"use client";

import { motion } from "framer-motion";
import { featuredProjects } from "@/data/content";
import DashboardMockup from "@/components/ui/DashboardMockup";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-text mb-4"
          >
            Selected Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-text-muted"
          >
            Real-world systems built to solve real business problems.
          </motion.p>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Project Visual */}
              <div className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl bg-brand-card border border-brand-border overflow-hidden shadow-2xl relative group">
                {/* Fallback to Mockup if Image is missing/placeholder */}
                <DashboardMockup
                  title={project.title}
                  themeColor={index % 2 === 0 ? "cyan" : "purple"}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  {project.hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.id}`}
                      className="px-6 py-3 btn-brand-gradient font-semibold rounded-full hover:scale-105 transition-all"
                    >
                      View Case Study
                    </Link>
                  ) : (
                    <span className="px-6 py-3 bg-brand-card border border-brand-border text-brand-text font-semibold rounded-lg cursor-not-allowed">
                      Case Study Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-brand-cyan font-semibold text-sm tracking-wider uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                  {project.title}
                </h3>

                <div className="space-y-6 mb-8 w-full">
                  <div className="bg-brand-card/50 border border-brand-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-brand-text-muted uppercase mb-2">
                      The Problem
                    </h4>
                    <p className="text-brand-text">{project.problem}</p>
                  </div>
                  <div className="bg-brand-card/50 border border-brand-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-brand-text-muted uppercase mb-2">
                      The Solution
                    </h4>
                    <p className="text-brand-text">{project.solution}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-brand-text-muted uppercase mb-3">
                    Key Modules
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.modules.map((m) => (
                      <span
                        key={m}
                        className="flex items-center gap-1.5 px-3 py-1 bg-brand-card border border-brand-border rounded-full text-xs font-medium text-brand-text-muted"
                      >
                        <CheckCircle2 className="w-3 h-3 text-brand-cyan" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 bg-brand-bg border border-brand-border/50 text-brand-text-muted rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
