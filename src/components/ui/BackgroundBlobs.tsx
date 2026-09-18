export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Blob 1 — top-left primary */}
      <div
        className="blob-1 absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob 2 — top-right secondary */}
      <div
        className="blob-2 absolute -top-24 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Blob 3 — center-right primary */}
      <div
        className="blob-3 absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Blob 4 — bottom-left secondary */}
      <div
        className="blob-4 absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.11]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-secondary, #0099FF) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Blob 5 — bottom-right primary */}
      <div
        className="blob-1 absolute -bottom-48 -right-24 w-[450px] h-[450px] rounded-full opacity-[0.09]"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary, #0070F3) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}
