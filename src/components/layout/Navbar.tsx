"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo as defaultPersonalInfo } from "@/data/content";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// Navbar with multi-page App Router links
const navLinks = [
  { name: "Home",     href: "/",          gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,112,243,0.35))" },
  { name: "Services", href: "/services",   gradient: "from-brand-purple to-brand-cyan", glow: "var(--theme-secondary-glow, rgba(0,153,255,0.35))" },
  { name: "Projects", href: "/projects",  gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,112,243,0.35))" },
  { name: "About",    href: "/about",     gradient: "from-brand-cyan to-brand-purple", glow: "var(--theme-primary-glow, rgba(0,112,243,0.35))" },
  { name: "Contact",  href: "/contact",   gradient: "from-brand-purple to-brand-cyan", glow: "var(--theme-secondary-glow, rgba(0,153,255,0.35))" },
];


export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    fetch("/api/personal-info")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setPersonalInfo((prev) => ({
            ...prev,
            ...data,
          }));
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-brand-border bg-brand-bg/90 backdrop-blur-md shadow-sm",
        isScrolled
          ? "py-3 shadow-md bg-brand-bg/95 border-brand-border"
          : "py-4.5"
      )}
    >
      <div className="container mx-auto px-6 max-w-[1600px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          {personalInfo.logoUrl && (
            <div className="w-10 h-10 rounded-xl bg-brand-card/90 border border-brand-border/80 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:border-brand-cyan/60 group-hover:scale-105 transition-all">
              <img
                src={personalInfo.logoUrl}
                alt={personalInfo.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-brand-text group-hover:text-brand-cyan transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-xs font-semibold text-brand-text-muted tracking-widest uppercase mt-0.5">
              {personalInfo.roleDescriptor}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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

          <Link
            href="/contact"
            className="group relative ml-3 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple group-hover:from-brand-purple group-hover:to-brand-cyan transition-all duration-500" />
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
            <span className="absolute inset-0 rounded-full shadow-[0_0_20px_var(--theme-primary-glow,rgba(0,112,243,0.4))] group-hover:shadow-[0_0_30px_var(--theme-secondary-glow,rgba(0,153,255,0.5))] transition-shadow duration-500" />
            <span className="relative z-10 text-white group-hover:scale-105 transition-transform duration-300">Let&apos;s Work Together</span>
            <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="md:hidden p-2 text-brand-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg/95 border-b border-brand-border px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "font-medium py-2 transition-colors",
                    isActive ? "text-brand-cyan font-bold" : "text-brand-text hover:text-brand-cyan"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-2.5 rounded-full font-bold text-sm text-center text-white bg-gradient-to-r from-brand-cyan to-brand-purple"
            >
              Let&apos;s Work Together
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
