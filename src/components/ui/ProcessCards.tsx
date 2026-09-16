"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Users,
  Radio,
  FileText,
  Wallet,
  BarChart3,
  CheckCircle2,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface ProcessStepItem {
  id?: string | number;
  number?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Optional custom background gradient or color for this specific card */
  gradient?: string;
  /** Optional badge line color override */
  badgeColor?: string;
}

export interface ProcessCardsProps {
  /** Title above the process cards */
  title?: string;
  /** Subtitle above the process cards */
  subtitle?: string;
  /** Badge text above section header */
  badgeText?: string;
  /** Custom steps list. Defaults to standard 7-step marketing/process flow */
  steps?: ProcessStepItem[];
  /** Extra wrapper CSS classes */
  className?: string;
}

// Default 7 sample steps inspired by the user's reference image, formatted with site theme colors
const defaultSteps: ProcessStepItem[] = [
  {
    number: "01",
    title: "Vision & Mission",
    description: "A clear statement of what the company wants to achieve long term.",
    icon: Eye,
    gradient: "from-emerald-500 to-teal-600",
    badgeColor: "#10B981",
  },
  {
    number: "02",
    title: "Goals & Objectives",
    description: "Specific, measurable, and time-bound targets for the team.",
    icon: Target,
    gradient: "from-teal-500 to-cyan-600",
    badgeColor: "#06B6D4",
  },
  {
    number: "03",
    title: "Target Audience",
    description: "Understanding the people you are trying to reach with your efforts.",
    icon: Users,
    gradient: "from-cyan-500 to-sky-600",
    badgeColor: "#0284C7",
  },
  {
    number: "04",
    title: "Channels & Tactics",
    description: "The specific platforms and methods used to deliver your message.",
    icon: Radio,
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    badgeColor: "#2563EB",
  },
  {
    number: "05",
    title: "Content Strategy",
    description: "What you will create and share to connect deeply with your audience.",
    icon: FileText,
    gradient: "from-indigo-600 to-blue-700",
    badgeColor: "#4F46E5",
  },
  {
    number: "06",
    title: "Budget & Resources",
    description: "Allocating funds and assets to the most impactful activities.",
    icon: Wallet,
    gradient: "from-blue-700 to-indigo-900",
    badgeColor: "#1E40AF",
  },
  {
    number: "07",
    title: "Measurement & Reporting",
    description: "A framework for tracking results and evaluating plan effectiveness.",
    icon: BarChart3,
    gradient: "from-indigo-900 to-slate-950",
    badgeColor: "#0F172A",
  },
];

// Slanted Clip Paths to reproduce the exact dynamic ribbon card shape from sample image
const clipPaths = [
  "polygon(0% 10%, 100% 0%, 100% 92%, 0% 100%)", // Step 1: Upward angle
  "polygon(0% 0%, 100% 8%, 100% 98%, 0% 92%)",   // Step 2: Downward angle
  "polygon(0% 8%, 100% 0%, 100% 92%, 0% 98%)",   // Step 3: Upward angle
  "polygon(0% 0%, 100% 10%, 100% 100%, 0% 92%)", // Step 4: Center prominent card
  "polygon(0% 10%, 100% 2%, 100% 94%, 0% 100%)", // Step 5: Upward angle
  "polygon(0% 2%, 100% 10%, 100% 98%, 0% 94%)",  // Step 6: Downward angle
  "polygon(0% 10%, 100% 0%, 100% 100%, 0% 98%)", // Step 7: End shape
];

export default function ProcessCards({
  title = "Building Your Marketing Foundation",
  subtitle = "The core components that build a strong foundation for success",
  badgeText,
  steps = defaultSteps,
  className = "",
}: ProcessCardsProps) {
  return (
    <section className={`w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {/* Header Section */}
      {(title || subtitle || badgeText) && (
        <div className="text-center mb-12 sm:mb-16">
          {badgeText && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase badge-brand-subtle mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {badgeText}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Desktop & Laptop Card Flow (Ribbon style with overlapping polygon shapes) */}
      <div className="hidden lg:flex items-stretch justify-center relative pt-12 pb-6 min-h-[460px]">
        {steps.map((step, idx) => {
          const StepIcon = step.icon || CheckCircle2;
          const numStr = step.number || String(idx + 1).padStart(2, "0");
          const clipPathStyle = clipPaths[idx % clipPaths.length];

          // Dynamic theme gradient fallbacks
          const gradientStyle =
            step.gradient ||
            (idx === 0
              ? "from-[var(--theme-primary)] to-[var(--theme-secondary)]"
              : "from-blue-600 to-indigo-900");

          return (
            <motion.div
              key={step.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex-1 min-w-[135px] max-w-[175px] -mr-3 first:mr-0 z-10 hover:z-30 transition-all duration-300"
            >
              {/* Numbered Pin Badge at top with Stem Connector */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: step.badgeColor || "var(--theme-primary)",
                  }}
                >
                  {numStr}
                </div>
                {/* Vertical connecting line */}
                <div
                  className="w-0.5 h-4 opacity-80"
                  style={{
                    backgroundColor: step.badgeColor || "var(--theme-primary)",
                  }}
                />
              </div>

              {/* Main Slanted Polygon Card Body */}
              <div
                className="h-full pt-10 pb-8 px-4 flex flex-col items-center text-center text-white shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:brightness-110 cursor-pointer"
                style={{
                  clipPath: clipPathStyle,
                }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-b ${gradientStyle} flex flex-col items-center pt-6 px-2 rounded-lg`}
                >
                  {/* Circle Icon Badge */}
                  <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <StepIcon className="w-6 h-6 text-slate-800" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold tracking-tight mb-2 text-white leading-tight min-h-[36px] flex items-center justify-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] leading-relaxed text-white/90 font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tablet & Mobile Card Flow (Responsive Scrollable / Stacked Grid) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
        {steps.map((step, idx) => {
          const StepIcon = step.icon || CheckCircle2;
          const numStr = step.number || String(idx + 1).padStart(2, "0");
          const gradientStyle =
            step.gradient || "from-blue-600 via-indigo-600 to-blue-900";

          return (
            <motion.div
              key={step.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-br ${gradientStyle} p-6 flex flex-col items-center text-center text-white h-full`}
              >
                {/* Number Badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md border-2 border-white/20 mb-4"
                  style={{
                    backgroundColor: step.badgeColor || "var(--theme-primary)",
                  }}
                >
                  {numStr}
                </div>

                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                  <StepIcon className="w-6 h-6 text-slate-800" />
                </div>

                {/* Card Title */}
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-white/90 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
