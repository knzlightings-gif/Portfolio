"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { id: "ocean", name: "Ocean Dark", color: "#00E5FF" },
  { id: "forest", name: "Forest Dark", color: "#10B981" },
  { id: "sunset", name: "Sunset Dark", color: "#F43F5E" },
  { id: "light", name: "Clean Light", color: "#0284C7" },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-brand-text-muted hover:text-brand-cyan transition-colors rounded-full hover:bg-brand-bg flex items-center justify-center"
        aria-label="Switch Theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-brand-border/50 text-xs font-semibold text-brand-text-muted uppercase tracking-wider">
              Select Theme
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as any);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  theme === t.id
                    ? "text-brand-cyan bg-brand-cyan/10"
                    : "text-brand-text hover:bg-brand-bg"
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full shadow-inner" 
                  style={{ backgroundColor: t.color }}
                />
                {t.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
