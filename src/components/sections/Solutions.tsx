"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { solutionsByBusiness as defaultSolutionsByBusiness } from "@/data/content";
import { ArrowRight, Layers } from "lucide-react";

// Industry illustration map
const solutionImageMap: Record<string, string> = {
  Manufacturing: "/card-manufacturing.jpg",
  Retail: "/card-retail.jpg",
  Distribution: "/card-distribution.jpg",
  Services: "/card-services.jpg",
  Education: "/card-education.jpg",
  Healthcare: "/card-education.jpg", // fallback until healthcare image is ready
};

function SolutionCard({ solution, index }: { solution: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const num = String(index + 1).padStart(2, "0");
  const featureList = typeof solution.features === "string" 
    ? solution.features.split(" + ") 
    : Array.isArray(solution.features) ? solution.features : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 shadow-md hover:shadow-[0_25px_50px_-12px_var(--theme-primary-glow,rgba(0,112,243,0.35)),0_0_25px_2px_rgba(0,112,243,0.12)] hover:border-brand-cyan/70 transition-all duration-300 h-full"
      >
        {/* Top decorative gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple opacity-40 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--theme-primary)] transition-all duration-300 z-30" />

        {/* Dynamic Spotlight Glow that follows cursor */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--theme-primary-rgb, 0, 112, 243), 0.16), transparent 80%)`
              : "none",
          }}
        />

        {/* Illustration Image Header */}
        <div className="relative w-full h-40 overflow-hidden border-b border-brand-border/50">
          <img
            src={solutionImageMap[solution.title] || "/card-erp.jpg"}
            alt={solution.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* Shimmer light sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-card/90 pointer-events-none" />
          
          {/* Badge + Number overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-bg/85 backdrop-blur-md border border-brand-border text-brand-cyan group-hover:border-brand-cyan/50 group-hover:shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.2)] transition-all duration-300">
              {solution.badge || "Custom"}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-bg/85 backdrop-blur-md border border-brand-border text-brand-text-muted group-hover:border-brand-cyan/50 group-hover:text-brand-cyan transition-all duration-300">
              /{num}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Title & Subtitle */}
            <div className="mb-2">
              <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-cyan transition-colors duration-200">
                {solution.title}
              </h3>
              {solution.subtitle && (
                <p className="text-xs font-semibold text-brand-cyan tracking-wide mt-0.5">
                  {solution.subtitle}
                </p>
              )}
            </div>

            {/* Clear Descriptive Text */}
            <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
              {solution.description}
            </p>
          </div>

          {/* Modules / Features Pill List */}
          {featureList.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] uppercase font-bold text-brand-text-muted/80 tracking-wider mb-2">
                Core Modules Included:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {featureList.map((feature: string) => (
                  <span
                    key={feature}
                    className="text-[11px] font-semibold px-2 py-0.5 bg-brand-bg text-brand-text-muted border border-brand-border/70 rounded-md group-hover:border-brand-cyan/40 group-hover:text-brand-text group-hover:bg-brand-cyan/5 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-cyan" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Card Footer */}
        <div className="relative z-10 p-5 pt-3 border-t border-brand-border/50 flex items-center justify-between text-xs font-semibold text-brand-text-muted group-hover:text-brand-cyan transition-colors duration-200">
          <span className="flex items-center gap-2 text-xs text-brand-text">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Production Ready
          </span>
          <div className="flex items-center gap-1 font-bold group-hover:translate-x-1.5 transition-transform duration-200 text-brand-cyan">
            <span>View Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Solutions() {
  const [solutions, setSolutions] = useState<any[]>([]);

  useEffect(() => {
    async function loadSolutions() {
      try {
        const res = await fetch("/api/solutions", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSolutions(data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load solutions:", err);
      }
      setSolutions(
        defaultSolutionsByBusiness.map((s) => ({
          id: s.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          title: s.title,
          subtitle: s.title === "Manufacturing" ? "Factory & Production ERP" :
                    s.title === "Retail" ? "Multi-Store POS & Sales" :
                    s.title === "Distribution" ? "Supply Chain & Wholesale" :
                    s.title === "Services" ? "Agency & Operations Hub" :
                    s.title === "Education" ? "School & Academy Portal" :
                    s.title === "Healthcare" ? "Clinic & Hospital System" : "Custom Business System",
          description: s.title === "Manufacturing" ? "End-to-end management for raw materials, batch schedules, inventory valuation & costing." :
                       s.title === "Retail" ? "Fast barcode billing, customer credit ledgers, multi-branch stock sync & daily P&L." :
                       s.title === "Distribution" ? "Bulk order dispatch, delivery route management, warehouse bin tracking & live aging." :
                       s.title === "Services" ? "Job scheduling, timesheet tracking, automated invoicing & recurring subscriptions." :
                       s.title === "Education" ? "Student admission records, digital fee vouchers, automated alerts & exam grading." :
                       s.title === "Healthcare" ? "Doctor appointment bookings, EHR records, pharmacy stock & patient billing." : "Custom digital workflow system tailored to your exact operational challenges.",
          badge: s.title === "Manufacturing" ? "Industry 4.0" :
                 s.title === "Retail" ? "Omnichannel" :
                 s.title === "Distribution" ? "Logistics" :
                 s.title === "Services" ? "Workflow" :
                 s.title === "Education" ? "EdTech" :
                 s.title === "Healthcare" ? "HealthTech" : "Custom",
          features: s.features,
          icon: s.icon,
        }))
      );
    }
    loadSolutions();
  }, []);

  return (
    <section className="py-10 md:py-14 bg-transparent relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Tailored Industry Software
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-brand-text mb-3 tracking-tight"
          >
            Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple">
              Different Businesses
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-brand-text-muted max-w-xl mx-auto leading-relaxed"
          >
            Purpose-built business software tailored around your exact operations and industry compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id || solution.title} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

