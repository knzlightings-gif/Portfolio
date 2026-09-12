import Link from "next/link";
import { personalInfo, footerContent } from "@/data/content";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-card border-t border-brand-border relative overflow-hidden pt-20 pb-10">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Top Section - Large CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-text mb-4 tracking-tight">
              {footerContent.ctaHeading1} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                {footerContent.ctaHeading2}
              </span>
            </h2>
            <p className="text-brand-text-muted text-lg max-w-md">
              {footerContent.ctaSubtext}
            </p>
          </div>
          <Link
            href="#contact"
            className="group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-brand-bg border border-brand-cyan/30 rounded-full hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-purple hover:text-white transition-all duration-500 shadow-[0_0_30px_var(--theme-primary-glow,rgba(0,112,243,0.15))] hover:shadow-[0_0_40px_var(--theme-primary-glow,rgba(0,112,243,0.35))] hover:border-transparent shrink-0"
          >
            <span className="font-bold text-lg flex items-center gap-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
              {footerContent.ctaButtonText}
              <ArrowUpRight className="w-6 h-6" />
            </span>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link href="#home" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-brand-text">
                {personalInfo.name}
              </span>
              <div className="text-xs font-semibold text-brand-cyan tracking-widest uppercase mt-1">
                {personalInfo.roleDescriptor}
              </div>
            </Link>
            <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
              {footerContent.brandDescription}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={personalInfo.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group font-bold text-sm"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a 
                href={`mailto:${personalInfo.contact.email}`} 
                className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${personalInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors group"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerContent.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-brand-text-muted hover:text-brand-cyan transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-border group-hover:bg-brand-cyan transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-4">
              {footerContent.servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-brand-text-muted hover:text-brand-cyan transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-border group-hover:bg-brand-cyan transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-brand-text-muted">
              <li>
                <span className="block text-xs text-brand-text-muted/70 mb-1">Email</span>
                <a href={`mailto:${personalInfo.contact.email}`} className="text-brand-text hover:text-brand-cyan transition-colors">
                  {personalInfo.contact.email}
                </a>
              </li>
              <li>
                <span className="block text-xs text-brand-text-muted/70 mb-1">WhatsApp / Phone</span>
                <a href={`https://wa.me/${personalInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`} className="text-brand-text hover:text-brand-cyan transition-colors">
                  {personalInfo.contact.whatsapp}
                </a>
              </li>
              <li>
                <span className="block text-xs text-brand-text-muted/70 mb-1">Availability</span>
                <span className="text-brand-text flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {personalInfo.availability}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#home" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link>
            <Link href="#home" className="hover:text-brand-cyan transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
