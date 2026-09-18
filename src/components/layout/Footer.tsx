"use client";

import Link from "next/link";
import { personalInfo as defaultPersonalInfo, footerContent as defaultFooter } from "@/data/content";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [footerContent, setFooterContent] = useState(defaultFooter);

  useEffect(() => {
    // Load personal info
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setPersonalInfo((prev) => ({
            ...prev,
            ...data,
            contact: {
              email: data.contact?.email ?? data.email ?? prev.contact?.email ?? "",
              whatsapp: data.contact?.whatsapp ?? data.whatsapp ?? prev.contact?.whatsapp ?? "",
              linkedin: data.contact?.linkedin ?? data.linkedin ?? prev.contact?.linkedin ?? "",
            },
          }));
        }
      })
      .catch(() => {});

    // Load footer content
    fetch("/api/footer")
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
    <footer className="bg-brand-card border-t border-brand-border relative overflow-hidden pt-10 pb-6">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Top Section - Compact CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 mb-8 border-b border-brand-border/40">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text tracking-tight">
              {footerContent?.ctaHeading1 || "Let's build something"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                {footerContent?.ctaHeading2 || "extraordinary."}
              </span>
            </h2>
            <p className="text-brand-text-muted text-sm mt-1 max-w-xl">
              {footerContent?.ctaSubtext || "Ready to transform your business with custom software tailored to your workflow?"}
            </p>
          </div>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 hover:from-brand-cyan hover:to-brand-purple text-brand-text hover:text-white border border-brand-cyan/30 rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_var(--theme-primary-glow,rgba(0,112,243,0.3))] shrink-0 font-medium text-sm"
          >
            <span>{footerContent?.ctaButtonText || "Start"}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link href="#home" className="inline-block mb-3">
              <span className="text-xl font-bold tracking-tight text-brand-text">
                {personalInfo?.name || "Developer"}
              </span>
              <div className="text-[11px] font-semibold text-brand-cyan tracking-widest uppercase mt-0.5">
                {personalInfo?.roleDescriptor || "ERP & Web Developer"}
              </div>
            </Link>
            <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
              {footerContent?.brandDescription || "I build practical ERP systems, business web applications and custom digital solutions."}
            </p>
            <div className="flex items-center gap-2.5">
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group font-bold text-xs"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a 
                href={`mailto:${emailVal}`} 
                className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${cleanWhatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group"
                aria-label="WhatsApp"
              >
                <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link: any) => (
                <li key={link.name || link.label || link.href}>
                  <Link href={link.href || "#"} className="text-xs text-brand-text-muted hover:text-brand-cyan transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:bg-brand-cyan transition-colors" />
                    {link.name || link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link: any) => (
                <li key={link.name || link.label || link.href}>
                  <Link href={link.href || "#"} className="text-xs text-brand-text-muted hover:text-brand-cyan transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:bg-brand-cyan transition-colors" />
                    {link.name || link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-3">Get In Touch</h4>
            <ul className="space-y-2.5 text-xs text-brand-text-muted">
              <li>
                <span className="block text-[10px] text-brand-text-muted/70 uppercase tracking-wider mb-0.5">Email</span>
                <a href={`mailto:${emailVal}`} className="text-brand-text hover:text-brand-cyan transition-colors">
                  {emailVal}
                </a>
              </li>
              <li>
                <span className="block text-[10px] text-brand-text-muted/70 uppercase tracking-wider mb-0.5">WhatsApp / Phone</span>
                <a href={`https://wa.me/${cleanWhatsapp}`} className="text-brand-text hover:text-brand-cyan transition-colors">
                  {rawWhatsapp}
                </a>
              </li>
              <li>
                <span className="block text-[10px] text-brand-text-muted/70 uppercase tracking-wider mb-0.5">Availability</span>
                <span className="text-brand-text flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {personalInfo?.availability || "Available for Projects"}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-brand-border/50 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-brand-text-muted">
          <p>&copy; {currentYear} {personalInfo?.name || "Developer"}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#home" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link>
            <Link href="#home" className="hover:text-brand-cyan transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
