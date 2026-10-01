"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo as defaultPersonalInfo } from "@/data/content";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

// Navbar with multi-page App Router links
const navLinks = [
  { name: "Home",     href: "/",          gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,77,64,0.35))" },
  { name: "Services", href: "/services",   gradient: "from-brand-purple to-brand-cyan", glow: "var(--theme-secondary-glow, rgba(0,172,193,0.35))" },
  { name: "Projects", href: "/projects",  gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,77,64,0.35))" },
  { name: "About",    href: "/about",     gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,77,64,0.35))" },
  { name: "Contact",  href: "/contact",   gradient: "from-brand-purple to-brand-cyan", glow: "var(--theme-secondary-glow, rgba(0,172,193,0.35))" },
];


export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    fetch("/api/personal-info", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
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

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-brand-border/60 bg-brand-card/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,77,64,0.06)]",
        isScrolled
          ? "py-3 shadow-[0_6px_25px_rgba(0,77,64,0.1)] bg-brand-card/98"
          : "py-3.5 sm:py-4.5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[1600px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          {personalInfo.logoUrl && (
            <div className="h-8 sm:h-9 max-w-[140px] sm:max-w-[180px] px-1.5 py-1 rounded-xl bg-brand-card/90 border border-brand-border/80 flex items-center justify-center shrink-0 shadow-sm group-hover:border-brand-cyan/60 group-hover:scale-105 transition-all overflow-hidden">
              <img
                src={personalInfo.logoUrl}
                alt={personalInfo.name}
                loading="eager"
                decoding="sync"
                className="max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span 
              className="text-lg sm:text-xl font-bold tracking-tight text-brand-text group-hover:text-brand-cyan transition-colors truncate"
              style={{ color: personalInfo?.nameColor || undefined }}
            >
              {personalInfo.name}
            </span>
            <span 
              className="text-[10px] sm:text-xs font-semibold text-brand-text-muted tracking-wider sm:tracking-widest uppercase mt-0.5 truncate max-w-[150px] xs:max-w-[210px] sm:max-w-none"
              style={{ color: personalInfo?.roleDescriptorColor || undefined }}
            >
              {personalInfo.roleDescriptor}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (100% UNCHANGED ON DESKTOP) */}
        <nav className="hidden md:flex items-center gap-2">
          <ul className="flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                      isActive ? "text-white" : "text-brand-text hover:text-white"
                    )}
                  >
                    {/* Colorful gradient fill - active or hover */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-r transition-all duration-300",
                        link.gradient,
                        isActive ? "opacity-100 shadow-md" : "opacity-0 group-hover:opacity-100"
                      )}
                    />
                    {/* Outer glow */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}
                      style={{ boxShadow: `0 4px 20px ${link.glow}` }}
                    />
                    {/* Button Label */}
                    <span className="relative z-10 font-semibold transition-transform duration-200 group-hover:scale-105">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeSwitcher />

          <Link
            href="/contact"
            className="group relative ml-2 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple group-hover:from-brand-purple group-hover:to-brand-cyan transition-all duration-500" />
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
            <span className="absolute inset-0 rounded-full shadow-[0_0_20px_var(--theme-primary-glow,rgba(0,77,64,0.4))] group-hover:shadow-[0_0_30px_var(--theme-secondary-glow,rgba(0,172,193,0.5))] transition-shadow duration-500" />
            <span className="relative z-10 text-white group-hover:scale-105 transition-transform duration-300">Let&apos;s Work Together</span>
            <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle & Theme Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 sm:p-2.5 rounded-xl text-brand-text hover:bg-brand-card/80 active:scale-95 transition-all cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-brand-card/98 backdrop-blur-2xl border-b border-brand-border/80 px-4 sm:px-6 py-5 flex flex-col gap-2.5 shadow-2xl overflow-y-auto max-h-[calc(100vh-75px)]"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-base transition-all",
                    isActive
                      ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-md font-bold"
                      : "text-brand-text hover:bg-brand-bg/60 hover:text-brand-cyan active:bg-brand-bg"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full font-bold text-sm text-center text-white bg-gradient-to-r from-brand-cyan to-brand-purple shadow-md active:scale-98 transition-all"
              >
                <span>Let&apos;s Work Together</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
