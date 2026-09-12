"use client";

import { motion } from "framer-motion";
import { personalInfo as defaultPersonalInfo } from "@/data/content";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";


// Curated high quality images related to ERP, Web Apps, Dashboards, and Coding
const heroSlides = [
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    title: "Web & ERP Development",
    subtitle: "Custom Business Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    title: "Data & KPI Dashboards",
    subtitle: "Real-time Business Insights",
  },
  {
    url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200",
    title: "Full-Stack Software",
    subtitle: "Scalable & Secure Systems",
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    title: "Business Automation",
    subtitle: "Streamlined Workflows",
  },
  {
    url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200",
    title: "Interactive UI/UX",
    subtitle: "Modern Responsive Interfaces",
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
    // When hovered: fast auto slide every 1.8s
    // When not hovered: gentle auto slide every 4.5s
    const duration = isHovered ? 1800 : 4500;

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
      
      {/* Animated Background Accent Block on the Right */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-full md:w-[40%] h-full bg-blue-100/40 hidden md:block rounded-l-[120px] z-0 pointer-events-none" 
      />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12">
          
          {/* Left Column - Content */}
          <div className="w-full lg:w-[50%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="text-brand-cyan font-bold tracking-wider uppercase text-sm md:text-base">
                {personalInfo?.roleDescriptor || defaultPersonalInfo.roleDescriptor}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              {(() => {
                const tag = personalInfo?.tagline || defaultPersonalInfo.tagline;
                const words = tag.split(" ");
                const firstPart = words.slice(0, 3).join(" ");
                const secondPart = words.slice(3).join(" ");
                return (
                  <>
                    {firstPart} <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">
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
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed"
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
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white text-lg font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_4px_20px_var(--theme-primary-glow,rgba(0,112,243,0.35))] hover:shadow-[0_6px_30px_var(--theme-primary-glow,rgba(0,112,243,0.5))] group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="hidden sm:flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{personalInfo.availability}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image Carousel Frame */}
          <div className="w-full lg:w-[50%] relative mt-12 lg:mt-0 flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-2xl aspect-[16/11] z-10 flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Outer Decorative Shape */}
                <div className="absolute inset-0 bg-white rounded-[80px] border-2 border-brand-cyan shadow-[0_15px_40px_var(--theme-primary-glow,rgba(0,112,243,0.18))] transform rotate-2 z-0 transition-transform duration-500"></div>
                
                {/* Main Carousel Container */}
                <div className="absolute inset-2 md:inset-4 rounded-[70px] overflow-hidden border border-slate-200 bg-slate-900 shadow-inner z-10 group transform -rotate-2 transition-transform hover:rotate-0 duration-500 select-none">
                  
                  {/* Images Slides */}
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.url}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
                      }`}
                      style={{ transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out" }}
                    >
                      <img 
                        src={slide.url} 
                        alt={slide.title} 
                        className="w-full h-full object-cover"
                      />
                      {/* Dark gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    </div>
                  ))}

                  {/* Top Category Badge */}
                  <div className="absolute top-5 left-8 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                      {heroSlides[currentSlide].title}
                    </span>
                  </div>

                  {/* Hover Controls - Left & Right Arrow Buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Bottom Indicators & Subtitle */}
                  <div className="absolute bottom-5 right-8 z-20 flex flex-col items-end gap-2">
                    <p className="text-white/90 text-xs font-medium tracking-wide drop-shadow-md hidden sm:block">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    {/* Carousel Dots */}
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            idx === currentSlide 
                              ? "w-6 h-2 bg-brand-cyan" 
                              : "w-2 h-2 bg-white/50 hover:bg-white"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hover indicator tooltip */}
                  <div className="absolute top-5 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] font-bold text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                      Auto-slides on hover
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.8 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } 
                  }}
                  className="absolute -bottom-6 left-8 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 group-hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold text-xl shadow-xs">
                    100%
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Business</p>
                    <p className="text-slate-500 text-xs font-medium">Optimized Solutions</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
