export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Aurora Ambient Ribbon — Top glow sweep */}
      <div
        className="aurora-pulse absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--theme-secondary, #0099FF) 0%, var(--theme-primary, #0070F3) 40%, transparent 75%)",
          filter: "blur(110px)",
        }}
      />

      {/* Blob 1 — Top-Left Primary */}
      <div
        className="blob-1 absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full opacity-[0.20]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(85px)",
        }}
      />

      {/* Blob 2 — Top-Right Secondary Azure */}
      <div
        className="blob-2 absolute -top-28 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Blob 3 — Center-Left Floating Accent */}
      <div
        className="blob-5 absolute top-1/3 -left-36 w-[520px] h-[520px] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(95px)",
          animationDelay: "-4s",
        }}
      />

      {/* Blob 4 — Center-Right Primary */}
      <div
        className="blob-3 absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full opacity-[0.17]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(95px)",
        }}
      />

      {/* Blob 5 — Center Subtle Ambient Core */}
      <div
        className="blob-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, var(--theme-secondary, #0099FF) 50%, transparent 70%)",
          filter: "blur(130px)",
        }}
      />

      {/* Blob 6 — Bottom-Left Secondary Azure */}
      <div
        className="blob-4 absolute -bottom-36 -left-28 w-[620px] h-[620px] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Blob 7 — Bottom-Right Primary */}
      <div
        className="blob-1 absolute -bottom-48 -right-28 w-[580px] h-[580px] rounded-full opacity-[0.17]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(90px)",
          animationDelay: "-9s",
        }}
      />

      {/* Blob 8 — Bottom-Center Deep Accent */}
      <div
        className="blob-2 absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(110px)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
