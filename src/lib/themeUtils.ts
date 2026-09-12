import { ThemeConfig } from "./themePresets";

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) return null;
  const cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function applyThemeToDom(config: ThemeConfig) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Primary Color & Glow
  root.style.setProperty("--theme-primary", config.primary);
  const primaryRgb = hexToRgb(config.primary);
  if (primaryRgb) {
    root.style.setProperty("--theme-primary-rgb", `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    root.style.setProperty("--theme-primary-glow", `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.35)`);
    root.style.setProperty("--theme-primary-subtle", `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.12)`);
  }

  // Secondary Color & Glow
  root.style.setProperty("--theme-secondary", config.secondary);
  const secondaryRgb = hexToRgb(config.secondary);
  if (secondaryRgb) {
    root.style.setProperty("--theme-secondary-rgb", `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
    root.style.setProperty("--theme-secondary-glow", `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.35)`);
    root.style.setProperty("--theme-secondary-subtle", `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.12)`);
  }

  // Set Light or Dark Mode Tokens
  if (config.mode === "dark") {
    root.setAttribute("data-theme", "dark");
    root.style.setProperty("--theme-bg", config.bg || "#0B0F19");
    root.style.setProperty("--theme-card", config.card || "#111827");
    root.style.setProperty("--theme-border", config.border || "#1F2937");
    root.style.setProperty("--theme-text", config.text || "#F9FAFB");
    root.style.setProperty("--theme-text-muted", config.textMuted || "#9CA3AF");
    root.style.colorScheme = "dark";
  } else {
    root.setAttribute("data-theme", "light");
    root.style.setProperty("--theme-bg", config.bg || "#F8FAFC");
    root.style.setProperty("--theme-card", config.card || "#FFFFFF");
    root.style.setProperty("--theme-border", config.border || "#E2E8F0");
    root.style.setProperty("--theme-text", config.text || "#0F172A");
    root.style.setProperty("--theme-text-muted", config.textMuted || "#475569");
    root.style.colorScheme = "light";
  }
}
