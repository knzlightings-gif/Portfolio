"use client";

import { motion } from "framer-motion";
import { personalInfo as defaultPersonalInfo } from "@/data/content";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Activity, ShieldCheck, Cpu } from "lucide-react";

// Curated High-End Corporate & Enterprise ERP Visuals
const heroSlides = [
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1600",
    badge: "Enterprise ERP & Analytics",
    title: "Real-Time Executive Intelligence",
    subtitle: "Automated business reporting & KPI telemetry",
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1600",
    badge: "Custom Financial Systems",
    title: "Multi-Entity Cloud Ledger",
    subtitle: "Automated reconciliation & cash flow tracking",
  },
  {
    url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=85&w=1600",
    badge: "Operations & Inventory Management",
    title: "Supply Chain Command Center",
    subtitle: "Live stock tracking & automated purchase pipelines",
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=1600",
    badge: "Full-Stack Scalable Architecture",
    title: "High-Performance Cloud Systems",
    subtitle: "Microservices, secure APIs & 99.9% uptime reliability",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  // Load personal info from Firestore via API
  useEffect(() => {
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setPersonalInfo({
            ...defaultPersonalInfo,
            ...data,
            contact: data.contact || defaultPersonalInfo.contact,
          });
        }
      })
      .catch((err) => console.error("Error loading personal info:", err));
  }, []);

  // Auto slide when hovered (and periodic gentle shift when not hovered)
  useEffect(() => {
    const duration = isHovered ? 2400 : 5000;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, duration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section id="home" className="pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden relative flex items-center">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-brand-cyan/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[500px] bg-brand-purple/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left Column - Content */}
          <div className="w-full lg:w-[50%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {personalInfo?.roleDescriptor || defaultPersonalInfo.roleDescriptor}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-brand-text leading-[1.1] mb-6"
            >
              {(() => {
                const tag = personalInfo?.tagline || defaultPersonalInfo.tagline;
                const words = tag.split(" ");
                const firstPart = words.slice(0, 3).join(" ");
                const secondPart = words.slice(3).join(" ");
                return (
                  <>
                    {firstPart} <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-600 to-brand-purple">
                      {secondPart}
                    </span>
                  </>
                );
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-text-muted mb-10 max-w-lg leading-relaxed"
            >
              {personalInfo?.description || defaultPersonalInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-6"
            >
              <Link
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white text-base md:text-lg font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_4px_20px_var(--theme-primary-glow,rgba(0,112,243,0.35))] hover:shadow-[0_6px_30px_var(--theme-primary-glow,rgba(0,112,243,0.5))] group"
              >
                View Selected Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="hidden sm:flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-brand-text-muted whitespace-nowrap">
                  {personalInfo?.availability || defaultPersonalInfo.availability}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sleek Studio Display Chassis */}
          <div className="w-full lg:w-[50%] relative flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-2xl z-10 my-6 sm:my-8"
            >
              {/* Outer Ambient Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-cyan/25 via-blue-600/20 to-brand-purple/25 rounded-[32px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Main Laptop / Studio Glass Chassis */}
              <div 
                className="relative rounded-[28px] bg-slate-900/95 border border-slate-700/60 shadow-2xl overflow-hidden group select-none backdrop-blur-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Top macOS Style Window Header */}
                <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                    <Activity className="w-3 h-3 text-brand-cyan animate-pulse" />
                    <span>{heroSlides[currentSlide].badge}</span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
                    node: v2.4 • live
                  </div>
                </div>

                {/* Visual Image Viewport */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.url}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide 
                          ? "opacity-100 scale-100 z-10" 
                          : "opacity-0 scale-105 z-0 pointer-events-none"
                      }`}
                      style={{ transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out" }}
                    >
                      <img 
                        src={slide.url} 
                        alt={slide.title} 
                        className="w-full h-full object-cover"
                      />
                      {/* Dark Gradient Overlay for Cinematic Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    </div>
                  ))}

                  {/* Left & Right Interactive Navigation Controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slide Title & Subtitle Overlay */}
                  <div className="absolute bottom-4 left-5 right-5 z-20 flex items-end justify-between gap-4">
                    <div>
                      <h4 className="text-white text-base sm:text-lg font-bold drop-shadow-md">
                        {heroSlides[currentSlide].title}
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm font-medium drop-shadow-sm">
                        {heroSlides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            idx === currentSlide 
                              ? "w-6 h-1.5 bg-brand-cyan" 
                              : "w-1.5 h-1.5 bg-white/40 hover:bg-white"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Corporate Metric Badges */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-7 -left-3 sm:-bottom-8 sm:-left-6 p-3.5 sm:p-4 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-brand-border/90 shadow-2xl z-30 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 shrink-0 shadow-md">
                  <div className="w-full h-full bg-brand-card rounded-[10px] flex items-center justify-center text-emerald-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-brand-text font-black text-xs sm:text-sm">99.9% Uptime</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-brand-text-muted text-[11px] font-medium">Enterprise Cloud Engine</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-7 -right-3 sm:-top-8 sm:-right-6 p-3.5 sm:p-4 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-brand-border/90 shadow-2xl z-30 flex items-center gap-3.5 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-blue-600 p-0.5 shrink-0 shadow-md">
                  <div className="w-full h-full bg-brand-card rounded-[10px] flex items-center justify-center text-brand-cyan">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-brand-text font-black text-xs sm:text-sm">+40% Efficiency</p>
                  <p className="text-brand-text-muted text-[11px] font-medium">Automated Workflows</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
