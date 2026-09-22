"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { defaultServices, ServiceItem } from "@/data/servicesData";
import Link from "next/link";

// Illustration per service
const serviceImageMap: Record<string, string> = {
  automation: "/card-automation.jpg",
  erp: "/card-erp.jpg",
  "web-apps": "/card-webapp.jpg",
};

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Motion values for silky-smooth 3D cursor tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

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

  const firstFeature = service.features?.[0] || "";
  const num = `/${String(index + 1).padStart(2, "0")}`;
  const imgSrc = serviceImageMap[service.id] || "/card-erp.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
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
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 shadow-md hover:shadow-[0_25px_50px_-12px_var(--theme-primary-glow,rgba(0,112,243,0.35)),0_0_25px_2px_rgba(0,112,243,0.12)] hover:border-brand-cyan/70 transition-all duration-300 h-full cursor-pointer"
      >
        <Link href="/services" className="flex flex-col h-full">
          {/* Top animated gradient accent line */}
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
          <div className="relative w-full h-44 overflow-hidden border-b border-brand-border/50">
            <img
              src={imgSrc}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-card/85 pointer-events-none" />

            {/* Slide number with glow */}
            <span className="absolute top-3 right-3 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-brand-bg/85 backdrop-blur-md border border-brand-border text-brand-text-muted group-hover:border-brand-cyan/50 group-hover:text-brand-cyan group-hover:shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.25)] transition-all duration-300 z-10">
              {num}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6 flex flex-col flex-1 justify-between relative z-10">
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-2 tracking-tight group-hover:text-brand-cyan transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-5 line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border/50 space-y-3">
              {firstFeature && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-bg text-brand-text-muted border border-brand-border/70 group-hover:border-brand-cyan/40 group-hover:text-brand-text group-hover:bg-brand-cyan/5 transition-all duration-300 truncate max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60 group-hover:bg-brand-cyan transition-colors" />
                  {firstFeature}
                </span>
              )}
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-brand-text">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active Service
                </span>
                <span className="flex items-center gap-1 text-brand-cyan font-bold group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  Details
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const targetIds = ["automation", "erp", "web-apps"];
            const filtered = data.filter((s: ServiceItem) => targetIds.includes(s.id));
            setServices(filtered.length > 0 ? filtered : defaultServices);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch home services:", err);
      }
      setServices(defaultServices);
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="py-10 md:py-14 bg-transparent relative overflow-hidden">
      {/* Background ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-brand-border/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple">Services & Solutions</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm md:text-base text-brand-text-muted max-w-md leading-relaxed"
          >
            Practical, scalable software built around your exact business workflow to drive real operational performance.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

