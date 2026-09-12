"use client";

import { motion } from "framer-motion";
import { whyWorkWithMe } from "@/data/content";
import { CheckCircle2 } from "lucide-react";

export default function WhyMe() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-brand-text mb-6 leading-tight max-w-3xl"
          >
            Technology Is Only Useful When It Solves a Real Problem.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyWorkWithMe.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group relative p-10 rounded-3xl bg-brand-card border border-brand-border transition-all duration-500 hover:-translate-y-2 z-10 card-glow-border"
            >
              {/* Modern Sleek Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-cyan/30 transition-colors duration-500 z-0 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-cyan/20 group-hover:shadow-[0_0_15px_rgba(0,112,243,0.3)] transition-all duration-500">
                  <CheckCircle2 className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-3 group-hover:text-brand-cyan transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-brand-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
