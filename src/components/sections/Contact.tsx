"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo as defaultPersonalInfo, contactContent } from "@/data/content";
import { usePersonalInfo } from "@/components/providers/PersonalInfoProvider";
import { Mail, MessageCircle, Globe, Loader2, CheckCircle2, Sparkles } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { personalInfo } = usePersonalInfo();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setIsSuccess(true);
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setError(err?.message || "Something went wrong. Please try again or contact via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-24 sm:pt-28 pb-14 sm:pb-20 lg:pb-24 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-[1500px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Heading, Subtext & Aligned Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                Let&apos;s Connect
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-bold text-brand-text mb-3 leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, var(--section-heading-size, 38px))",
                }}
              >
                {contactContent.heading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base text-brand-text-muted leading-relaxed"
              >
                {contactContent.subtext}
              </motion.p>
            </div>

            {/* Structured Contact Info Box (Aligned with Form) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-brand-card/90 border border-brand-border/80 shadow-md backdrop-blur-md space-y-3.5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-border/50">
                <span className="text-xs font-bold text-brand-text uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Channels
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {personalInfo?.availability || "Available for Projects"}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 group p-2 rounded-xl hover:bg-brand-bg/50 transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center group-hover:scale-105 group-hover:border-brand-cyan transition-all duration-300">
                  <Mail className="w-4 h-4 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider">{contactContent.emailLabel}</p>
                  <a href={`mailto:${personalInfo.contact.email}`} className="text-sm sm:text-base font-semibold text-brand-text hover:text-brand-cyan transition-colors break-all">
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3.5 group p-2 rounded-xl hover:bg-brand-bg/50 transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center group-hover:scale-105 group-hover:border-brand-cyan transition-all duration-300">
                  <MessageCircle className="w-4 h-4 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider">{contactContent.phoneLabel}</p>
                  <a href={`https://wa.me/${personalInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-semibold text-brand-text hover:text-brand-cyan transition-colors">
                    {personalInfo.contact.whatsapp}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-3.5 group p-2 rounded-xl hover:bg-brand-bg/50 transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center group-hover:scale-105 group-hover:border-brand-cyan transition-all duration-300">
                  <Globe className="w-4 h-4 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider">{contactContent.linkedinLabel}</p>
                  <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-semibold text-brand-text hover:text-brand-cyan transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form (7 cols) - Compact & Perfectly Aligned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 w-full"
          >
            <div className="p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-brand-card border border-brand-border shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-brand-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">Message Sent Successfully!</h3>
                  <p className="text-sm text-brand-text-muted">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {/* Anti-spam honeypot (hidden from human users) */}
                  <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Business / Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Acme Corp"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">WhatsApp</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 234 567 890"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Project Type</label>
                      <input
                        type="text"
                        id="projectType"
                        name="projectType"
                        placeholder="ERP"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Budget Range (Optional)</label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="Select budget"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-brand-text-muted mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Tell me about your business and what you need..."
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none text-sm"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl btn-brand-gradient text-base font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2.5 shadow-md hover:brightness-105 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      contactContent.formButtonText
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
