"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for diagnostic monitoring
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-brand-bg text-brand-text">
      {/* Subtle warning glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center p-8 sm:p-10 rounded-3xl bg-brand-card/85 backdrop-blur-xl border border-brand-border shadow-2xl">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-500 mb-5 shadow-xs">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2">
          Something went wrong
        </h1>

        <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
          An unexpected error occurred while processing this page. You can try refreshing or return to the homepage.
        </p>

        {error?.digest && (
          <p className="text-[11px] font-mono text-brand-text-muted/70 bg-brand-bg/50 px-3 py-1.5 rounded-lg mb-6 inline-block">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-bold shadow-lg shadow-brand-cyan/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-bg/80 border border-brand-border text-brand-text hover:text-brand-cyan hover:border-brand-cyan/50 text-sm font-semibold transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-brand-cyan" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
