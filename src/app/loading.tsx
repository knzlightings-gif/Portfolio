export default function Loading() {
  return (
    <div
      aria-label="Loading page"
      className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 relative z-20 pointer-events-none"
    >
      <div className="relative flex flex-col items-center gap-4 p-8 rounded-3xl bg-brand-card/70 border border-brand-border/60 shadow-xl backdrop-blur-md">
        {/* Animated Glowing Ring */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-3 border-brand-cyan/20 border-t-brand-cyan animate-spin" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple opacity-80 animate-pulse" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-sm font-bold text-brand-text tracking-wide">
            Loading...
          </span>
          <span className="text-xs text-brand-text-muted">
            Preparing your view
          </span>
        </div>
      </div>
    </div>
  );
}
