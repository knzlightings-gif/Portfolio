"use client";

import Link from "next/link";
import { personalInfo as defaultPersonalInfo, footerContent as defaultFooter } from "@/data/content";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [personalInfo, setPersonalInfo] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("app_personal_info");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.name) {
            return { ...defaultPersonalInfo, ...parsed };
          }
        }
      } catch {}
    }
    return defaultPersonalInfo;
  });
  const [footerContent, setFooterContent] = useState(defaultFooter);

  useEffect(() => {
    // Load personal info
    fetch("/api/personal-info", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setPersonalInfo((prev: any) => ({
            ...prev,
            ...data,
          }));
          try {
            localStorage.setItem("app_personal_info", JSON.stringify(data));
          } catch {}
        }
      })
      .catch(() => {});

    // Load footer content
    fetch("/api/footer", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setFooterContent((prev) => ({
            ...prev,
            ...data,
            quickLinks: Array.isArray(data.quickLinks) && data.quickLinks.length > 0 ? data.quickLinks : prev.quickLinks,
            servicesLinks: Array.isArray(data.servicesLinks) && data.servicesLinks.length > 0 ? data.servicesLinks : prev.servicesLinks,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const linkedinUrl = personalInfo?.contact?.linkedin || "https://linkedin.com";
  const emailVal = personalInfo?.contact?.email || "hello@example.com";
  const rawWhatsapp = personalInfo?.contact?.whatsapp || "+1234567890";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const quickLinks = footerContent?.quickLinks || defaultFooter.quickLinks;
  const servicesLinks = footerContent?.servicesLinks || defaultFooter.servicesLinks;

  return (
    <footer className="bg-brand-card/85 backdrop-blur-md border-t border-brand-border relative overflow-hidden pt-10 pb-6">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-[1600px] relative z-10">
        
        {/* Top Section - Centered High-Impact CTA */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto pb-10 mb-10 border-b border-brand-border/40">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text tracking-tight">
            {footerContent?.ctaHeading1 || "Let's build something"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#00796B] to-brand-purple">
              {footerContent?.ctaHeading2 || "extraordinary."}
            </span>
          </h2>
          <p className="text-brand-text-muted text-sm sm:text-base mt-2.5 max-w-lg mx-auto leading-relaxed">
            {footerContent?.ctaSubtext || "Ready to transform your business with custom software tailored to your workflow?"}
          </p>
          <div className="mt-5 sm:mt-6">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm text-white overflow-hidden shadow-md hover:shadow-[0_0_25px_var(--theme-primary-glow,rgba(0,77,64,0.45))] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple group-hover:from-brand-purple group-hover:to-brand-cyan transition-all duration-500" />
              <span className="relative z-10">{footerContent?.ctaButtonText || "Start a Project"}</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main 4-Column Grid: Balanced, Proportional & Spanned Across Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 mb-10 items-start">
          
          {/* Column 1: Brand Info (4 of 12 columns) */}
          <div className="md:col-span-1 lg:col-span-4 pr-0 lg:pr-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-3.5 group">
              {personalInfo?.logoUrl && (() => {
                const footerLogoSize = Math.min(Number(personalInfo?.logoSize) || 48, 52);
                return (
                  <div 
                    className="px-2 py-1 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center shrink-0 overflow-hidden group-hover:border-brand-cyan/60 transition-all shadow-xs"
                    style={{
                      height: `${footerLogoSize}px`,
                      width: "auto",
                      maxWidth: `${Math.round(footerLogoSize * 2.5)}px`,
                    }}
                  >
                    <img 
                      src={personalInfo.logoUrl} 
                      alt={personalInfo.name} 
                      loading="eager"
                      className="max-h-full max-w-full w-auto h-auto object-contain" 
                      style={{ height: "100%" }}
                    />
                  </div>
                );
              })()}
              <div className="flex flex-col min-w-0">
                <span 
                  className="text-xl font-bold tracking-tight text-brand-text group-hover:text-brand-cyan transition-colors truncate"
                  style={{ color: personalInfo?.nameColor || undefined }}
                >
                  {personalInfo?.name || "Developer"}
                </span>
                <span 
                  className="text-[10px] sm:text-[11px] font-semibold text-brand-cyan tracking-wider uppercase mt-0.5 truncate"
                  style={{ color: personalInfo?.roleDescriptorColor || undefined }}
                >
                  {personalInfo?.roleDescriptor || "ERP & Web Developer"}
                </span>
              </div>
            </Link>
            
            <p className="text-xs sm:text-[13px] text-brand-text-muted leading-relaxed mb-5 max-w-sm">
              {footerContent?.brandDescription || "We build practical ERP systems, business web applications and custom digital solutions for small and growing businesses."}
            </p>

            <div className="flex items-center gap-2.5">
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-brand-bg/80 border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-card hover:scale-105 hover:shadow-xs transition-all"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
                </svg>
              </a>
              <a 
                href={`mailto:${emailVal}`} 
                className="w-9 h-9 rounded-xl bg-brand-bg/80 border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-card hover:scale-105 hover:shadow-xs transition-all"
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${cleanWhatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-card hover:scale-105 hover:shadow-xs transition-all"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 of 12 columns) */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-widest">
                Quick Links
              </h4>
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((link: any) => (
                <li key={link.name || link.label || link.href}>
                  <Link 
                    href={link.href || "#"} 
                    className="text-xs sm:text-[13px] text-brand-text-muted hover:text-brand-cyan transition-all duration-200 flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:w-2 group-hover:bg-brand-cyan transition-all duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {link.name || link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Links (3 of 12 columns) */}
          <div className="md:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0" />
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-widest">
                Services & Solutions
              </h4>
            </div>
            <ul className="space-y-2.5">
              {servicesLinks.map((link: any) => (
                <li key={link.name || link.label || link.href}>
                  <Link 
                    href={link.href || "#"} 
                    className="text-xs sm:text-[13px] text-brand-text-muted hover:text-brand-cyan transition-all duration-200 flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:w-2 group-hover:bg-brand-cyan transition-all duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {link.name || link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (3 of 12 columns, 100% aligned with other columns) */}
          <div className="md:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-widest">
                Get In Touch
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <span className="block text-[10px] font-bold text-brand-text-muted/70 uppercase tracking-widest mb-1">Email</span>
                <a href={`mailto:${emailVal}`} className="text-brand-text hover:text-brand-cyan transition-colors font-medium break-all flex items-center gap-2 group">
                  <Mail className="w-3.5 h-3.5 text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{emailVal}</span>
                </a>
              </li>
              <li>
                <span className="block text-[10px] font-bold text-brand-text-muted/70 uppercase tracking-widest mb-1">WhatsApp / Phone</span>
                <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-brand-text hover:text-brand-cyan transition-colors font-medium flex items-center gap-2 group">
                  <Phone className="w-3.5 h-3.5 text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{rawWhatsapp}</span>
                </a>
              </li>
              <li className="pt-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  {personalInfo?.availability || "Available for Projects"}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-brand-border/50 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-brand-text-muted text-center sm:text-left">
          <p>&copy; {currentYear} {personalInfo?.name || "Developer"}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-brand-cyan transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
