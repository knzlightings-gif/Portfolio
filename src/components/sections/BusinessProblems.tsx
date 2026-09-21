"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, ArrowRight, ChevronLeft, ChevronRight, XCircle, CheckCircle2, Sparkles } from "lucide-react";
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
    image: "/problems/slide-1.jpg",
    badge: "Manual Registers & Bookkeeping",
    troubleTag: "Manual Paper Chaos",
    troubleDesc: "Handwritten ledger books, scattered receipt piles & calculation mistakes",
    solutionTag: "Software Replaces This",
    solutionDesc: "Centralized Cloud Ledger & Automated Real-time Accounting",
  },
  {
    image: "/problems/slide-2.jpg",
    badge: "Excel Crashes & Formula Errors",
    troubleTag: "Spreadsheet Headache",
    troubleDesc: "Broken Excel formulas (#REF!), corrupted spreadsheets & mismatched numbers",
    solutionTag: "Software Replaces This",
    solutionDesc: "Secure Structured Database with Zero Formula Breakages",
  },
  {
    image: "/problems/slide-3.jpg",
    badge: "Warehouse & Stock Discrepancies",
    troubleTag: "Stock Uncertainty",
    troubleDesc: "Missing stock items, stock-out surprises & paper clipboard counts",
    solutionTag: "Software Replaces This",
    solutionDesc: "Live Barcode Stock Tracking with Automatic Low-Stock Alerts",
  },
  {
    image: "/problems/slide-4.jpg",
    badge: "WhatsApp Orders & Sticky Notes",
    troubleTag: "Scattered Chat Orders",
    troubleDesc: "Unorganized WhatsApp voice notes, lost paper chits & missed customer orders",
    solutionTag: "Software Replaces This",
    solutionDesc: "Direct Multi-Channel POS Pipeline & Automated Order Tracking",
  },
  {
    image: "/problems/slide-5.jpg",
    badge: "Unpaid Invoices & Lost Receivables",
    troubleTag: "Cash Flow Loss",
    troubleDesc: "Piles of overdue invoices, unrecorded credit & forgotten payments",
    solutionTag: "Software Replaces This",
    solutionDesc: "Automated Digital Invoicing with Auto-Reminders & Aging Reports",
  },
];

export default function BusinessProblems() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide: faster on hover (2s) so user can see all trouble slides quickly, steady (4.2s) when not hovered
  useEffect(() => {
    const duration = isHovered ? 2000 : 4200;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % manualTroubles.length);
    }, duration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % manualTroubles.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + manualTroubles.length) % manualTroubles.length);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Problem List & CTA */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Manual Bottlenecks We Eliminate
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-brand-text mb-6 leading-tight tracking-tight"
            >
              Still Running Your Business on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-purple">
                Excel, WhatsApp & Manual Records?
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10"
            >
              {problems.map((problem, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brand-card/70 backdrop-blur-xs border border-brand-border/60 hover:border-red-400/40 transition-colors">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-brand-text text-sm font-medium">{problem}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl font-medium text-brand-text mb-8">
                Let&apos;s eliminate these everyday headaches with a clean, predictable digital system.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 btn-brand-gradient text-base font-bold rounded-full transition-all"
              >
                Discuss Your Business
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Problem Visual Carousel */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-xl aspect-[16/11] z-10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer Decorative Accent Frame */}
              <div className="absolute inset-0 bg-brand-card rounded-3xl border-2 border-brand-cyan/40 shadow-[0_20px_50px_var(--theme-primary-glow,rgba(0,112,243,0.22))] transform rotate-1 transition-transform duration-500" />
              
              {/* Main Carousel Viewport */}
              <div className="absolute inset-2 md:inset-3 rounded-2xl overflow-hidden border border-brand-border bg-slate-950 shadow-inner z-10 group transform -rotate-1 hover:rotate-0 transition-transform duration-500 select-none">
                
                {/* Images Slides */}
                {manualTroubles.map((slide, index) => (
                  <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
                    }`}
                    style={{ transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out" }}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.badge} 
                      className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/30" />
                  </div>
                ))}

                {/* Top Badge: Manual Trouble Header */}
                <div className="absolute top-4 left-5 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/80 backdrop-blur-md border border-red-500/40 text-red-200 text-xs font-bold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    TROUBLE: {manualTroubles[currentSlide].badge}
                  </span>
                </div>

                {/* Hover Auto-slide indicator */}
                <div className="absolute top-4 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    Auto-slides on hover
                  </span>
                </div>

                {/* Arrow Navigation Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Previous trouble"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Next trouble"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Overlay: Trouble vs Elimination Solution */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 space-y-1.5">
                    {/* The Trouble */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Trouble
                      </span>
                      <span className="text-xs text-white/80 line-through truncate font-medium">
                        {manualTroubles[currentSlide].troubleDesc}
                      </span>
                    </div>

                    {/* The Solution */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        We Eliminate This
                      </span>
                      <span className="text-xs font-bold text-white truncate">
                        {manualTroubles[currentSlide].solutionDesc}
                      </span>
                    </div>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {manualTroubles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          idx === currentSlide 
                            ? "w-6 h-2 bg-brand-cyan" 
                            : "w-2 h-2 bg-white/40 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Floating Solution Success Metric Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-brand-card border border-brand-border p-3.5 rounded-2xl shadow-2xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-text">Zero Manual Errors</p>
                  <p className="text-[11px] text-brand-text-muted">100% Automated Business Clarity</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
