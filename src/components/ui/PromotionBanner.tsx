"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Tag, X, ArrowRight, Copy, Check, Clock } from "lucide-react";
import { Promotion } from "@/types/promotion";

export default function PromotionBanner() {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Check if dismissed in session
    const isDismissed = sessionStorage.getItem("promo_banner_dismissed");
    if (isDismissed) {
      setDismissed(true);
      return;
    }

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
    setDismissed(true);
    sessionStorage.setItem("promo_banner_dismissed", "true");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (dismissed || !promotion) return null;

  const promoItems = [1, 2, 3, 4]; // Duplicate items for seamless continuous ticker

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Current Promotion Ticker"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full fixed top-[68px] left-0 right-0 z-40 bg-gradient-to-r from-brand-cyan/20 via-brand-card/95 to-brand-purple/20 border-b border-brand-cyan/40 shadow-lg backdrop-blur-md overflow-hidden group py-2.5"
      >
        {/* Left & Right gradient fade masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-14 w-16 bg-gradient-to-l from-brand-bg to-transparent z-20 pointer-events-none" />

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
                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan text-slate-950 text-xs font-black tracking-wider uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  {promotion.badgeText || "SPECIAL OFFER"}
                </span>

                {/* Title */}
                <span className="text-xs sm:text-sm font-bold text-brand-text">
                  {promotion.title}
                </span>

                {/* Description snippet if available */}
                {promotion.description && (
                  <span className="text-xs text-brand-text-muted hidden md:inline">
                    — {promotion.description}
                  </span>
                )}

                {/* Promo Code */}
                {promotion.promoCode && (
                  <button
                    onClick={() => handleCopyCode(promotion.promoCode!)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-brand-bg border border-brand-cyan/40 text-brand-cyan text-xs font-mono font-bold hover:bg-brand-cyan/20 transition-all cursor-pointer"
                    title="Click to copy code"
                  >
                    <Tag className="w-3 h-3" />
                    <span>Code: {promotion.promoCode}</span>
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                  </button>
                )}

                {/* Countdown Timer */}
                {timeLeft && (
                  <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-text-muted bg-brand-bg/80 px-2.5 py-0.5 rounded-md border border-brand-border/60">
                    <Clock className="w-3 h-3 text-brand-cyan" />
                    <span className="text-brand-cyan">{timeLeft.days}d</span>:
                    <span className="text-brand-text">{String(timeLeft.hours).padStart(2, "0")}h</span>:
                    <span className="text-brand-text">{String(timeLeft.minutes).padStart(2, "0")}m</span>:
                    <span className="text-brand-cyan">{String(timeLeft.seconds).padStart(2, "0")}s</span>
                  </div>
                )}

                {/* CTA Link */}
                <Link
                  href={promotion.ctaLink || "/contact"}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-cyan text-slate-950 text-xs font-extrabold hover:bg-brand-cyan/90 transition-all shadow-xs"
                >
                  <span>{promotion.ctaText || "Claim Offer"}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <span className="text-brand-cyan/40 font-bold mx-2">★</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fixed Close (X) Button on Far Right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center bg-brand-bg/90 backdrop-blur-md p-1 rounded-full border border-brand-border/80 shadow-md">
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-brand-text-muted hover:text-brand-text hover:bg-brand-card transition-all"
            title="Close announcement ticker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
