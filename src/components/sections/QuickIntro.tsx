"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Database, LayoutDashboard, Zap, Cpu, ArrowRight, Sparkles, TrendingUp, CheckCircle2, Bot, Layers } from "lucide-react";

export default function QuickIntro() {
  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            Core Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-text mb-3 tracking-tight"
          >
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Build & Excel In</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-brand-text-muted max-w-xl mx-auto"
          >
            Visual, high-performance software engineered for modern enterprise operations.
          </motion.p>
        </div>

        {/* 4 Graphic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: ERP Systems */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Graphic Element */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent border border-brand-border/60 p-4 mb-6 flex flex-col justify-between overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold text-brand-text">ERP Core</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +45% Sync
                  </span>
                </div>
                {/* Mini metric bars */}
                <div className="space-y-2 z-10 my-auto">
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border/40 flex justify-between items-center text-[11px]">
                    <span className="text-brand-text-muted">Inventory & Stock</span>
                    <span className="font-bold text-cyan-400">99.8%</span>
                  </div>
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border/40 flex justify-between items-center text-[11px]">
                    <span className="text-brand-text-muted">Sales & Accounts</span>
                    <span className="font-bold text-emerald-400">Automated</span>
                  </div>
                </div>
              </div>

              {/* Minimal Text */}
              <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-cyan-400 transition-colors">
                ERP Systems
              </h3>
              <p className="text-xs font-semibold text-brand-text-muted mb-4">
                Sales • Purchasing • Accounts • Inventory
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border/40">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-cyan-400 border border-cyan-500/20">Custom Ledgers</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/60">Multi-User</span>
            </div>
          </motion.div>

          {/* Card 2: Web Applications */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Graphic Element */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent border border-brand-border/60 p-3 mb-6 flex flex-col justify-between overflow-hidden relative group-hover:border-purple-500/30 transition-colors">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-brand-border/40">
                  <div className="w-2 h-2 rounded-full bg-red-400/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  <span className="text-[9px] text-brand-text-muted ml-2 font-mono">dashboard.app</span>
                </div>
                {/* Mock UI layout */}
                <div className="grid grid-cols-3 gap-2 my-auto">
                  <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30 flex flex-col items-center justify-center">
                    <LayoutDashboard className="w-4 h-4 text-purple-400 mb-1" />
                    <span className="text-[9px] font-bold text-purple-300">Portals</span>
                  </div>
                  <div className="col-span-2 bg-brand-bg/80 p-2 rounded-lg border border-brand-border/40 flex flex-col justify-center">
                    <div className="h-1.5 w-3/4 bg-purple-400/60 rounded-full mb-1.5" />
                    <div className="h-1.5 w-1/2 bg-cyan-400/60 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Minimal Text */}
              <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-purple-400 transition-colors">
                Web Applications
              </h3>
              <p className="text-xs font-semibold text-brand-text-muted mb-4">
                Custom Dashboards • Business Portals
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border/40">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-purple-400 border border-purple-500/20">Real-Time Data</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/60">Responsive UI</span>
            </div>
          </motion.div>

          {/* Card 3: Workflow Automation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Graphic Element */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border border-brand-border/60 p-4 mb-6 flex flex-col justify-between overflow-hidden relative group-hover:border-amber-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Auto-Pipeline
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Active 24/7
                  </span>
                </div>
                {/* Visual node flowchart */}
                <div className="flex items-center justify-between px-2 my-auto">
                  <div className="w-7 h-7 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-muted text-[10px]">
                    CSV
                  </div>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-2 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-[10px]">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Minimal Text */}
              <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-amber-400 transition-colors">
                Workflow Automation
              </h3>
              <p className="text-xs font-semibold text-brand-text-muted mb-4">
                Auto Import • Sync • Zero Manual Error
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border/40">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-amber-400 border border-amber-500/20">Excel Batch Sync</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/60">Instant Triggers</span>
            </div>
          </motion.div>

          {/* Card 4: AI & Custom Tech */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border/80 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Graphic Element */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent border border-brand-border/60 p-4 mb-6 flex flex-col justify-between overflow-hidden relative group-hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-brand-text">AI Stack</span>
                  </div>
                  <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                    API Ready
                  </span>
                </div>
                {/* Chip Node Graphic */}
                <div className="flex items-center justify-center my-auto">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-extrabold tracking-wide text-brand-text">Smart API Engine</span>
                  </div>
                </div>
              </div>

              {/* Minimal Text */}
              <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-emerald-400 transition-colors">
                AI & Custom Tech
              </h3>
              <p className="text-xs font-semibold text-brand-text-muted mb-4">
                AI Workflows • Modern APIs • Scalable Stack
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border/40">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-emerald-400 border border-emerald-500/20">AI Assisted</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border/60">Cloud Native</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs md:text-sm text-white bg-gradient-to-r from-brand-cyan to-brand-purple hover:from-brand-purple hover:to-brand-cyan shadow-lg shadow-brand-cyan/20 hover:shadow-brand-purple/30 hover:scale-105 transition-all duration-300"
          >
            Explore Detailed Services & Solutions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
