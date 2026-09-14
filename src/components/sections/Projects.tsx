"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { featuredProjects as defaultProjects } from "@/data/content";
import DashboardMockup from "@/components/ui/DashboardMockup";
import { ArrowRight, CheckCircle2, ExternalLink, KeyRound, Sparkles, Eye, Images, ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react";
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
  gallery?: string[];
  demoUrl?: string;
  videoUrl?: string;
  demoCredentials?: string;
  hasCaseStudy?: boolean;
};

export function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url || !url.trim()) return null;
  const raw = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = raw.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  if (raw.startsWith("http")) return raw;
  return null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects as Project[]);

  // Lightbox Modal State
  const [activeLightbox, setActiveLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<{
    project: Project;
    embedUrl: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      const images = getProjectImages(activeLightbox.project);

      if (e.key === "Escape") {
        setActiveLightbox(null);
      } else if (e.key === "ArrowRight") {
        setActiveLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % images.length } : null
        );
      } else if (e.key === "ArrowLeft") {
        setActiveLightbox((prev) =>
          prev ? { ...prev, index: (prev.index - 1 + images.length) % images.length } : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox]);

  const getProjectImages = (p: Project): string[] => {
    if (Array.isArray(p.gallery) && p.gallery.length > 0) {
      return p.gallery;
    }
    return p.image ? [p.image] : [];
  };

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

        <div className="flex flex-col gap-16 md:gap-28">
          {projects.map((project, index) => {
            const projectImages = getProjectImages(project);
            const coverImage = project.image || projectImages[0] || "";

            return (
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
                {/* Project Visual Chassis & Filmstrip */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3">
                  <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl bg-brand-card/90 border border-brand-border/80 overflow-hidden shadow-2xl relative group cursor-pointer"
                    onClick={() => {
                      if (projectImages.length > 0) {
                        setActiveLightbox({ project, index: 0 });
                      }
                    }}
                  >
                    {coverImage && !coverImage.includes("placeholder") ? (
                      <img
                        src={coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
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

                    {/* Screenshot Count Badge */}
                    {projectImages.length > 1 && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-bg/85 backdrop-blur-md border border-brand-cyan/40 text-brand-cyan text-xs font-bold shadow-lg">
                          <Images className="w-3.5 h-3.5" />
                          {projectImages.length} Screenshots
                        </span>
                      </div>
                    )}

                    {/* Hover overlay with instant actions */}
                    <div className="absolute inset-0 bg-brand-bg/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-sm z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.videoUrl && getYouTubeEmbedUrl(project.videoUrl) && (
                        <button
                          type="button"
                          onClick={() => {
                            const embed = getYouTubeEmbedUrl(project.videoUrl);
                            if (embed) setActiveVideo({ project, embedUrl: embed });
                          }}
                          className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-xl text-sm"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Watch Demo Video</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setActiveLightbox({ project, index: 0 })}
                        className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-xl text-sm"
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span>View Screenshots Gallery ({projectImages.length || 1})</span>
                      </button>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-brand-card border border-brand-border text-brand-text font-semibold rounded-full hover:border-brand-cyan hover:text-brand-cyan transition-all flex items-center gap-2 text-sm shadow-md"
                        >
                          <span>🚀 Open Live Demo</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Multi-Screenshot Preview Strip (If 2+ screenshots) */}
                  {projectImages.length > 1 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
                      {projectImages.slice(0, 6).map((imgUrl, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={() => setActiveLightbox({ project, index: imgIdx })}
                          className={`relative shrink-0 w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border transition-all hover:scale-105 bg-brand-card ${
                            imgUrl === coverImage ? "border-brand-cyan ring-1 ring-brand-cyan" : "border-brand-border/80 opacity-75 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Preview ${imgIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}

                      {projectImages.length > 6 && (
                        <button
                          type="button"
                          onClick={() => setActiveLightbox({ project, index: 6 })}
                          className="shrink-0 w-20 sm:w-24 aspect-video rounded-lg bg-brand-card/90 border border-brand-border hover:border-brand-cyan flex items-center justify-center text-xs font-bold text-brand-cyan hover:scale-105 transition-all"
                        >
                          +{projectImages.length - 6} More
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Project Info Column */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="text-brand-cyan font-semibold text-xs tracking-wider uppercase px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
                      {project.category}
                    </span>
                    {projectImages.length > 1 && (
                      <span className="text-brand-text-muted font-medium text-xs px-2.5 py-0.5 bg-brand-card border border-brand-border rounded-full flex items-center gap-1.5">
                        <Images className="w-3 h-3 text-brand-cyan" />
                        {projectImages.length} High-Res Screens
                      </span>
                    )}
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

                  {/* Demo Action Bar & Gallery Launch */}
                  <div className="w-full pt-4 border-t border-brand-border/50 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveLightbox({ project, index: 0 })}
                      className="px-5 py-2.5 bg-brand-card border border-brand-border hover:border-brand-cyan text-brand-text font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:text-brand-cyan"
                    >
                      <Images className="w-4 h-4 text-brand-cyan" />
                      <span>Screenshots ({projectImages.length || 1})</span>
                    </button>

                    {project.videoUrl && getYouTubeEmbedUrl(project.videoUrl) && (
                      <button
                        type="button"
                        onClick={() => {
                          const embed = getYouTubeEmbedUrl(project.videoUrl);
                          if (embed) setActiveVideo({ project, embedUrl: embed });
                        }}
                        className="px-5 py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-rose-600/30"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Demo Video</span>
                      </button>
                    )}

                    {project.demoUrl ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 btn-brand-gradient font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group text-sm flex-1"
                        >
                          <span>🚀 Explore Live System</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        {project.demoCredentials && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-card/80 border border-brand-border/80 text-xs text-brand-text font-mono">
                            <KeyRound className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                            <span className="truncate">{project.demoCredentials}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href="#contact"
                        className="px-6 py-2.5 rounded-xl bg-brand-card border border-brand-border/80 hover:border-brand-cyan/60 text-brand-text font-semibold hover:text-brand-cyan transition-all flex items-center justify-center gap-2 text-sm group flex-1"
                      >
                        <span>Request Walkthrough</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-cyan" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN GLASSMORPHIC SCREENSHOT LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setActiveLightbox(null)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-brand-cyan text-xs font-semibold uppercase tracking-wider">
                  {activeLightbox.project.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                  {activeLightbox.project.title}
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                    {activeLightbox.index + 1} / {getProjectImages(activeLightbox.project).length}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {activeLightbox.project.demoUrl && (
                  <a
                    href={activeLightbox.project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-brand-cyan text-brand-bg text-xs font-bold rounded-full hover:scale-105 transition-all shadow-lg"
                  >
                    <span>🚀 Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Close Gallery (Esc)"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Center Image Viewport */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 w-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {getProjectImages(activeLightbox.project).length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const imgs = getProjectImages(activeLightbox.project);
                    setActiveLightbox((p) =>
                      p ? { ...p, index: (p.index - 1 + imgs.length) % imgs.length } : null
                    );
                  }}
                  className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-cyan text-white hover:text-brand-bg transition-all border border-white/10 shadow-2xl"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Main Screenshot */}
              <div className="max-w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-brand-card/50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <img
                  src={getProjectImages(activeLightbox.project)[activeLightbox.index]}
                  alt={`${activeLightbox.project.title} Screenshot ${activeLightbox.index + 1}`}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl"
                />
              </div>

              {/* Next Button */}
              {getProjectImages(activeLightbox.project).length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const imgs = getProjectImages(activeLightbox.project);
                    setActiveLightbox((p) =>
                      p ? { ...p, index: (p.index + 1) % imgs.length } : null
                    );
                  }}
                  className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-cyan text-white hover:text-brand-bg transition-all border border-white/10 shadow-2xl"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Filmstrip Thumbnails */}
            <div
              className="z-10 w-full max-w-4xl mx-auto overflow-x-auto py-2 flex items-center justify-center gap-2 sm:gap-3 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {getProjectImages(activeLightbox.project).map((imgUrl, thumbIdx) => (
                <button
                  key={thumbIdx}
                  type="button"
                  onClick={() => setActiveLightbox((p) => (p ? { ...p, index: thumbIdx } : null))}
                  className={`relative shrink-0 w-16 sm:w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    thumbIdx === activeLightbox.index
                      ? "border-brand-cyan scale-110 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                      : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/60"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumb ${thumbIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN YOUTUBE VIDEO DEMO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-slate-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{activeVideo.project.title}</span>
                    <span className="text-xs font-medium text-rose-400"> Live Video Demo</span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Close Video (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeVideo.embedUrl}
                  title={`${activeVideo.project.title} Demo Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
