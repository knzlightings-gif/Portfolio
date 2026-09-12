"use client";

import { createContext, useContext, useEffect, useState } from "react";
import defaultTheme from "@/data/theme.json";
import { ThemeConfig, THEME_PRESETS } from "@/lib/themePresets";
import { applyThemeToDom } from "@/lib/themeUtils";

interface ThemeContextType {
  themeConfig: ThemeConfig;
  setThemeConfig: (config: ThemeConfig) => void;
  saveThemeConfig: (config: ThemeConfig) => Promise<{ success: boolean; error?: string }>;
  // Backward compatibility
  theme: string;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(defaultTheme as ThemeConfig);

  useEffect(() => {
    // 1. Check local storage first for fastest local response
    try {
      const savedLocal = localStorage.getItem("portfolio-theme-config");
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        setThemeConfigState(parsed);
        applyThemeToDom(parsed);
      } else {
        applyThemeToDom(defaultTheme as ThemeConfig);
      }
    } catch {
      applyThemeToDom(defaultTheme as ThemeConfig);
    }

    // 2. Fetch server-saved global theme config
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.primary && data.secondary) {
          setThemeConfigState(data);
          applyThemeToDom(data);
          try {
            localStorage.setItem("portfolio-theme-config", JSON.stringify(data));
          } catch {}
        }
      })
      .catch((err) => console.error("Could not sync server theme:", err));
  }, []);

  const setThemeConfig = (newConfig: ThemeConfig) => {
    setThemeConfigState(newConfig);
    applyThemeToDom(newConfig);
    try {
      localStorage.setItem("portfolio-theme-config", JSON.stringify(newConfig));
    } catch {}
  };

  const saveThemeConfig = async (newConfig: ThemeConfig) => {
    setThemeConfig(newConfig);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Failed to save theme" };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Save theme error:", err);
      return { success: false, error: err.message || "Network error" };
    }
  };

  // Backward compatibility helper
  const setTheme = (presetId: string) => {
    const found = THEME_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setThemeConfig(found);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeConfig,
        setThemeConfig,
        saveThemeConfig,
        theme: themeConfig.id,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
