import Link from "next/link";
import { ArrowLeft, Home, Sparkles, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-brand-bg text-brand-text">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center p-8 sm:p-10 rounded-3xl bg-brand-card/85 backdrop-blur-xl border border-brand-border shadow-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-6">
          <HelpCircle className="w-3.5 h-3.5" />
          404 — Page Not Found
        </div>

        {/* Big visual number */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-emerald-600">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text mb-3">
          Lost in Digital Space?
        </h2>

        <p className="text-sm text-brand-text-muted leading-relaxed mb-8">
          The page or system resource you are looking for doesn&apos;t exist, has been relocated, or is temporarily unavailable.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-bold shadow-lg shadow-brand-cyan/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-bg/80 border border-brand-border text-brand-text hover:text-brand-cyan hover:border-brand-cyan/50 text-sm font-semibold transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
