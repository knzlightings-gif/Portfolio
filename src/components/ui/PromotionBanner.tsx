"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Tag, X, ArrowRight, Copy, Check, Clock } from "lucide-react";
import { Promotion } from "@/types/promotion";

const themeGradients: Record<string, string> = {
  rose: "from-rose-600 via-amber-500 to-rose-600 border-amber-300/40 text-white shadow-[0_6px_25px_rgba(244,63,94,0.45)]",
  amber: "from-amber-600 via-orange-500 to-amber-600 border-amber-300/40 text-white shadow-[0_6px_25px_rgba(245,158,11,0.45)]",
  emerald: "from-emerald-600 via-teal-500 to-emerald-600 border-emerald-300/40 text-white shadow-[0_6px_25px_rgba(16,185,129,0.45)]",
  purple: "from-purple-600 via-fuchsia-500 to-purple-600 border-fuchsia-300/40 text-white shadow-[0_6px_25px_rgba(168,85,247,0.45)]",
  cyan: "from-rose-600 via-amber-500 to-rose-600 border-amber-300/40 text-white shadow-[0_6px_25px_rgba(244,63,94,0.45)]", // Default prominent electric flame
};

export default function PromotionBanner() {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    async function loadActivePromotion() {
      try {
        const res = await fetch("/api/promotions?public=true");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPromotion(data[0]); // Pick top active promo
          }
        }
      } catch (err) {
        console.error("Failed to load promotion banner:", err);
      }
    }

    loadActivePromotion();
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    if (!promotion?.endDate) return;

    const calculateTime = () => {
      const difference = new Date(promotion.endDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft(null);
        setPromotion(null); // Expired
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [promotion]);

  const handleDismiss = () => {
    // Hide temporarily for current view; reappears on page refresh
    setDismissed(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (dismissed || !promotion) return null;

  const promoItems = [1, 2, 3, 4]; // Duplicate items for seamless continuous ticker
  const gradientClass = themeGradients[promotion.themeColor] || themeGradients.rose;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Current Promotion Ticker"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`w-full fixed top-[68px] left-0 right-0 z-40 bg-gradient-to-r ${gradientClass} border-b backdrop-blur-md overflow-hidden group py-3`}
      >
        {/* Left & Right gradient fade masks for smooth transition */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-rose-600/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-14 w-12 bg-gradient-to-l from-rose-600/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Marquee Ticker moving Left to Right */}
        <div className="flex overflow-hidden relative w-full items-center">
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {promoItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 shrink-0">
                {/* Prominent High-Contrast Offer Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-950 text-xs font-black tracking-wider uppercase shadow-md animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {promotion.badgeText || "SPECIAL OFFER"}
                </span>

                {/* Offer Title */}
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  {promotion.title}
                </span>

                {/* Optional Subtitle */}
                {promotion.description && (
                  <span className="text-xs text-amber-100/90 font-medium hidden md:inline">
                    — {promotion.description}
                  </span>
                )}

                {/* Promo Code Badge */}
                {promotion.promoCode && (
                  <button
                    onClick={() => handleCopyCode(promotion.promoCode!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 border border-amber-400/50 text-amber-300 text-xs font-mono font-extrabold hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
                    title="Click to copy code"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Code: {promotion.promoCode}</span>
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
                  </button>
                )}

                {/* Countdown Timer */}
                {timeLeft && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-white bg-slate-950/80 px-3 py-1 rounded-lg border border-white/20 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300">{timeLeft.days}d</span>:
                    <span>{String(timeLeft.hours).padStart(2, "0")}h</span>:
                    <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>:
                    <span className="text-amber-300">{String(timeLeft.seconds).padStart(2, "0")}s</span>
                  </div>
                )}

                {/* High Contrast CTA Button */}
                <Link
                  href={promotion.ctaLink || "/contact"}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white text-slate-950 text-xs font-black hover:bg-amber-100 transition-all shadow-md shrink-0"
                >
                  <span>{promotion.ctaText || "Claim Offer"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-amber-200/80 font-bold mx-2">★</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fixed Close (X) Button on Far Right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center bg-slate-950/80 backdrop-blur-md p-1 rounded-full border border-white/30 shadow-lg">
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
            title="Close announcement ticker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
