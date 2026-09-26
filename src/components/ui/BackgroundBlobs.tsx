export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Soft Top Ambient Glow (Ultra-low opacity: 5%) */}
      <div
        className="aurora-pulse absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[320px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--theme-secondary, #00acc1) 0%, var(--theme-primary, #004d40) 50%, transparent 75%)",
          filter: "blur(140px)",
        }}
      />

      {/* 2. Delicate Center Atmospheric Aura (Ultra-low opacity: 4%) */}
      <div
        className="blob-2 absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #00acc1) 0%, transparent 70%)",
          filter: "blur(150px)",
        }}
      />

      {/* 3. Subtle Lower Left Depth Tint (Ultra-low opacity: 5%) */}
      <div
        className="blob-4 absolute -bottom-40 -left-40 w-[650px] h-[650px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #004d40) 0%, transparent 70%)",
          filter: "blur(160px)",
        }}
      />
    </div>
  );
}
