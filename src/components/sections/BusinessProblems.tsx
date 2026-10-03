"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  AlertCircle, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  XCircle, 
  CheckCircle2, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const problems = [
  "Data scattered across different files",
  "Manual sales records & paper registers",
  "Difficult receivable & debt tracking",
  "Inventory confusion & missing stock",
  "No centralized financial reporting",
  "Repetitive, tiring manual data entry",
  "Difficult multi-branch monitoring",
  "Total lack of business visibility",
];

const manualTroubles = [
  {
    video: "/videos/trouble-office.mp4",
    poster: "/problems/slide-1.jpg",
    badge: "Manual Registers & Bookkeeping",
    shortTitle: "Paper Registers",
    troubleTag: "Manual Paper Chaos",
    troubleDesc: "Handwritten ledger books, scattered receipt piles & calculation mistakes",
    solutionTag: "Software Replaces This",
    solutionDesc: "Centralized Cloud Ledger & Automated Real-time Accounting",
  },
  {
    video: "/videos/trouble-excel.mp4",
    poster: "/problems/slide-2.jpg",
    badge: "Excel Crashes & Formula Errors",
    shortTitle: "Excel Crashes",
    troubleTag: "Spreadsheet Headache",
    troubleDesc: "Broken Excel formulas (#REF!), corrupted spreadsheets & mismatched numbers",
    solutionTag: "Software Replaces This",
    solutionDesc: "Secure Structured Database with Zero Formula Breakages",
  },
  {
    video: "/videos/trouble-warehouse.mp4",
    poster: "/problems/slide-3.jpg",
    badge: "Warehouse & Stock Discrepancies",
    shortTitle: "Stock Uncertainty",
    troubleTag: "Stock Uncertainty",
    troubleDesc: "Missing stock items, stock-out surprises & paper clipboard counts",
    solutionTag: "Software Replaces This",
    solutionDesc: "Live Barcode Stock Tracking with Automatic Low-Stock Alerts",
  },
  {
    video: "/videos/trouble-business.mp4",
    poster: "/problems/slide-4.jpg",
    badge: "WhatsApp Orders & Sticky Notes",
    shortTitle: "Scattered Orders",
    troubleTag: "Scattered Chat Orders",
    troubleDesc: "Unorganized WhatsApp voice notes, lost paper chits & missed customer orders",
    solutionTag: "Software Replaces This",
    solutionDesc: "Direct Multi-Channel POS Pipeline & Automated Order Tracking",
  },
  {
    video: "/videos/trouble-tech.mp4",
    poster: "/problems/slide-5.jpg",
    badge: "Unpaid Invoices & Lost Receivables",
    shortTitle: "Overdue Invoices",
    troubleTag: "Cash Flow Loss",
    troubleDesc: "Piles of overdue invoices, unrecorded credit & forgotten payments",
    solutionTag: "Software Replaces This",
    solutionDesc: "Automated Digital Invoicing with Auto-Reminders & Aging Reports",
  },
];

export default function BusinessProblems() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideDuration = 6000; // 6 seconds per video slide

  // Cycle slide with slideDuration timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % manualTroubles.length);
    }, slideDuration);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Handle active video playback
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlide) {
        vid.currentTime = 0;
        if (isPlaying) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, [currentSlide, isPlaying]);

  // Sync mute state across videos
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = isMuted;
    });
  }, [isMuted]);

  // Clean up all video decoders on component unmount
  useEffect(() => {
    return () => {
      videoRefs.current.forEach((vid) => {
        if (vid) {
          try {
            vid.pause();
          } catch (_) {}
        }
      });
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % manualTroubles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + manualTroubles.length) % manualTroubles.length);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section className="pt-24 sm:pt-28 pb-12 sm:pb-20 lg:pb-24 bg-transparent relative overflow-hidden">
      
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-brand-cyan/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Problem List & CTA (Takes 5 columns) */}
          <div className="lg:col-span-5 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              Manual Bottlenecks We Eliminate
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-brand-text mb-6 leading-tight tracking-tight"
              style={{
                fontSize: "clamp(1.6rem, 4vw, var(--section-heading-size, 38px))",
              }}
            >
              Still Running Your Business on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#00796B] to-[#059669]">
                Excel, WhatsApp & Manual Records?
              </span>
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {problems.map((problem, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group flex items-start gap-2.5 p-3 rounded-xl bg-brand-card/85 backdrop-blur-md border border-brand-border/70 hover:border-rose-400/60 hover:shadow-md hover:bg-brand-card transition-all cursor-default select-none"
                >
                  <div className="relative shrink-0 mt-0.5">
                    <span className="absolute -inset-1 rounded-full bg-rose-500/20 blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <AlertCircle className="w-4 h-4 text-rose-500 relative transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6" />
                  </div>
                  <span className="text-brand-text text-xs sm:text-sm font-medium leading-snug group-hover:text-brand-cyan transition-colors">
                    {problem}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-sm xs:text-base sm:text-lg font-medium text-brand-text/90 leading-relaxed">
                Let&apos;s eliminate these everyday bottlenecks with a fast, modern and automated ERP software customized for your business.
              </p>
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 btn-brand-gradient text-base font-bold rounded-full shadow-lg hover:shadow-brand-cyan/25 hover:scale-105 transition-all text-center"
                >
                  Discuss Your Business
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center justify-center xs:justify-start gap-2 text-xs font-semibold text-brand-text-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Custom Engineered • Cloud Hosted
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-End HD 4K Video Showcase (Takes 7 columns - large and prominent) */}
          <div className="lg:col-span-7 w-full flex justify-center pb-8 sm:pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-3xl xl:max-w-4xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer Decorative Ambient Glow Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/25 via-teal-400/20 to-cyan-500/25 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Main Video Showcase Box */}
              <div 
                ref={containerRef}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900 shadow-[0_20px_50px_rgba(0,121,107,0.22)] group select-none aspect-[16/14] xs:aspect-[16/12] sm:aspect-[16/9.5]"
              >
                
                {/* 4K Video Slides */}
                {manualTroubles.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.video}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={slide.video}
                        poster={slide.poster}
                        autoPlay={isActive}
                        loop
                        muted={isMuted}
                        playsInline
                        preload={isActive ? "auto" : "none"}
                        className="w-full h-full object-cover brightness-[1.20] contrast-[1.08] saturate-[1.12]"
                      />
                      
                      {/* Gentle top & bottom gradients ONLY behind UI overlays — keeping the video bright & vibrant */}
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/* Top Video Header Bar (Overlay) */}
                <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                  {/* Left: 4K Live Indicator & Problem Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-red-500/50 text-red-300 text-[11px] sm:text-xs font-bold shadow-md">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      PROBLEM #{String(currentSlide + 1).padStart(2, "0")}
                    </span>

                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/15 text-white/95 text-xs font-medium">
                      {manualTroubles[currentSlide].badge}
                    </span>
                  </div>

                  {/* Right: 4K Badge & Quick Video Controls */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black tracking-wider uppercase backdrop-blur-md shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      4K UHD 60FPS
                    </span>

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-900/75 hover:bg-slate-800 text-white/90 border border-white/15 backdrop-blur-md transition-all hover:scale-105"
                      title={isPlaying ? "Pause Video Slides" : "Play Video Slides"}
                      aria-label="Toggle play pause"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>

                    {/* Mute/Unmute Audio Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-900/75 hover:bg-slate-800 text-white/90 border border-white/15 backdrop-blur-md transition-all hover:scale-105"
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                      aria-label="Toggle mute"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={toggleFullscreen}
                      className="hidden sm:inline-flex p-2 rounded-lg bg-slate-900/75 hover:bg-slate-800 text-white/90 border border-white/15 backdrop-blur-md transition-all hover:scale-105"
                      title="Toggle Fullscreen"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Previous / Next Arrow Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/75 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-2xl opacity-75 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Previous trouble video"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/75 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-2xl opacity-75 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Next trouble video"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Overlay: Trouble vs Digital Replacement Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
                  <div className="bg-slate-900/80 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl space-y-2.5">
                    
                    {/* Top Row: Before vs After */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {/* Left: Trouble (Before) */}
                      <div className="flex items-start gap-2.5 bg-rose-950/30 p-2 sm:p-2.5 rounded-lg border border-rose-500/30">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-500/35 px-2 py-0.5 rounded shrink-0 flex items-center gap-1 mt-0.5">
                          <XCircle className="w-3 h-3 text-rose-400" />
                          Bottleneck
                        </span>
                        <span className="text-xs text-white/95 font-medium leading-relaxed">
                          {manualTroubles[currentSlide].troubleDesc}
                        </span>
                      </div>

                      {/* Right: Solution (Software Replaces This) */}
                      <div className="flex items-start gap-2.5 bg-emerald-950/30 p-2 sm:p-2.5 rounded-lg border border-emerald-500/35">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/25 border border-emerald-500/40 px-2 py-0.5 rounded shrink-0 flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Our ERP Fix
                        </span>
                        <span className="text-xs text-white font-bold leading-relaxed">
                          {manualTroubles[currentSlide].solutionDesc}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Progress Bar & Video Navigation Pills */}
                    <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      {/* Timeline progress line */}
                      <div className="w-full sm:w-auto flex-1 flex items-center gap-2">
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            key={`${currentSlide}-${isPlaying}`}
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                            style={{
                              animation: isPlaying ? `progress-fill ${slideDuration}ms linear forwards` : "none",
                              width: isPlaying ? undefined : "100%",
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-white/70 shrink-0">
                          {String(currentSlide + 1).padStart(2, "0")} / {String(manualTroubles.length).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Slide Thumbnail Tabs */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
                        {manualTroubles.map((slide, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0 transition-all duration-200 ${
                              idx === currentSlide
                                ? "bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.6)] font-extrabold scale-105"
                                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          >
                            {slide.shortTitle}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Success Metric Badge (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 sm:-bottom-6 left-2 sm:-left-6 max-w-[calc(100%-1rem)] sm:max-w-none bg-brand-card/95 backdrop-blur-xl border border-brand-border/80 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl z-30 flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg sm:rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-black text-brand-text truncate">Zero Manual Errors</p>
                  <p className="text-[10px] sm:text-xs text-brand-text-muted truncate">100% Automated Business Clarity</p>
                </div>
              </motion.div>

              {/* Floating Cloud Sync Badge (Top Right) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden md:flex absolute -top-5 -right-5 bg-brand-card/95 backdrop-blur-xl border border-brand-border/80 px-3.5 py-2.5 rounded-2xl shadow-xl z-30 items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-text">Real-time Cloud Sync</p>
                  <p className="text-[10px] text-brand-text-muted">Multi-Device & Multi-Branch</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
