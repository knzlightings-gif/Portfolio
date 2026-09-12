"use client";

import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { THEME_PRESETS, ThemeConfig } from "@/lib/themePresets";
import { 
  CheckCircle2, 
  Palette, 
  MessageCircle, 
  Sparkles, 
  Sliders, 
  Eye, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Sun, 
  Moon,
  Layers,
  Send
} from "lucide-react";

export default function SettingsAdmin() {
  const { themeConfig, setThemeConfig, saveThemeConfig } = useTheme();

  // Local draft state for live preview before saving
  const [draftTheme, setDraftTheme] = useState<ThemeConfig>(themeConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // When a preset is selected
  const handleSelectPreset = (preset: ThemeConfig) => {
    setDraftTheme(preset);
    setThemeConfig(preset); // Live preview instantly
  };

  // When custom color is updated
  const handleCustomColorChange = (field: "primary" | "secondary", color: string) => {
    const updated: ThemeConfig = {
      ...draftTheme,
      id: "custom",
      name: "Custom Theme",
      [field]: color,
    };
    setDraftTheme(updated);
    setThemeConfig(updated); // Live preview instantly
  };

  // Toggle mode
  const handleToggleMode = (mode: "light" | "dark") => {
    const updated: ThemeConfig = {
      ...draftTheme,
      mode,
      bg: mode === "dark" ? "#0B0F19" : "#F8FAFC",
      card: mode === "dark" ? "#111827" : "#FFFFFF",
      border: mode === "dark" ? "#1F2937" : "#E2E8F0",
      text: mode === "dark" ? "#F9FAFB" : "#0F172A",
      textMuted: mode === "dark" ? "#9CA3AF" : "#475569",
    };
    setDraftTheme(updated);
    setThemeConfig(updated);
  };

  // Reset to default Royal Tech Blue
  const handleReset = () => {
    const royal = THEME_PRESETS[0];
    setDraftTheme(royal);
    setThemeConfig(royal);
  };

  // Save changes globally
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    const res = await saveThemeConfig(draftTheme);
    setIsSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      alert("Error saving theme: " + (res.error || "Unknown error"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand-card p-6 md:p-8 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Global Color Combinations
          </div>
          <h1 className="text-3xl font-black text-brand-text tracking-tight">Theme & Color Settings</h1>
          <p className="text-brand-text-muted mt-1 text-sm md:text-base">
            Choose from 10+ curated color palettes or create your own. Applied globally across the entire website in 1-click.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text hover:bg-brand-bg text-sm font-semibold transition-all"
            title="Reset to Royal Tech Blue"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl btn-brand-gradient text-sm font-bold shadow-md hover:brightness-110 disabled:opacity-60 transition-all"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved & Applied!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Save & Apply Theme
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">
            Theme updated successfully! The new color scheme is now live across your whole portfolio.
          </p>
        </div>
      )}

      {/* Live Interactive Preview Box */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border/60">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-brand-cyan" />
            <h2 className="text-lg font-bold text-brand-text">Live Real-Time Preview</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Changes show instantly on your screen
          </div>
        </div>

        {/* Mock Sandbox Rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-brand-bg border border-brand-border">
          
          {/* Preview Component 1: Heading & Button */}
          <div className="space-y-4 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              Feature Badge
            </div>
            <h3 className="text-2xl font-black text-brand-text leading-tight">
              Software Built Around <br />
              <span className="text-brand-gradient">Your Business</span>
            </h3>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              Demonstrating the live primary and secondary gradient combination.
            </p>
            <div>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-brand-gradient text-sm font-bold">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Component 2: Service / Solution Card */}
          <div className="p-5 rounded-2xl bg-brand-card border border-brand-border relative group shadow-xs">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-cyan to-brand-purple rounded-t-2xl" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-brand-bg text-brand-text-muted">
                /01
              </span>
            </div>
            <h4 className="font-bold text-brand-text text-base mb-1">Custom Business ERP</h4>
            <p className="text-xs text-brand-text-muted mb-4">Streamlined workflow systems with active color highlights.</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border">
                Inventory
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand-bg text-brand-text-muted border border-brand-border">
                Billing
              </span>
            </div>
            <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-cyan">
              <span>Production Ready</span>
              <span>→</span>
            </div>
          </div>

          {/* Preview Component 3: Action Buttons & Swatch Info */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-brand-card border border-brand-border">
            <div>
              <p className="text-xs uppercase font-bold text-brand-text-muted tracking-wider mb-3">Active Palette Details</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded-xl bg-brand-bg border border-brand-border">
                  <span className="text-xs text-brand-text-muted">Primary Color:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-text">{draftTheme.primary}</span>
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: draftTheme.primary }} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-brand-bg border border-brand-border">
                  <span className="text-xs text-brand-text-muted">Secondary Accent:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-text">{draftTheme.secondary}</span>
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: draftTheme.secondary }} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-brand-bg border border-brand-border">
                  <span className="text-xs text-brand-text-muted">Display Mode:</span>
                  <span className="text-xs font-bold text-brand-text uppercase">{draftTheme.mode}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-muted">
              <span>Floating Buttons:</span>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                  WA
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                  Tel
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Preset Curated Color Palettes */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border/50">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-brand-cyan" />
            <div>
              <h2 className="text-xl font-bold text-brand-text">Curated Color Palettes</h2>
              <p className="text-xs text-brand-text-muted">Click any combination to test it live on the site</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-text-muted">
            {THEME_PRESETS.length} Curated Options
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEME_PRESETS.map((preset) => {
            const isActive = draftTheme.id === preset.id || (draftTheme.primary === preset.primary && draftTheme.secondary === preset.secondary);
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`relative flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                  isActive 
                    ? "bg-brand-bg border-brand-cyan shadow-[0_0_20px_var(--theme-primary-glow,rgba(0,112,243,0.2))] ring-2 ring-brand-cyan" 
                    : "bg-brand-card border-brand-border hover:border-brand-cyan/50 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-center mb-3 w-full">
                  {/* Two color preview pills */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div 
                        className="w-7 h-7 rounded-full border-2 border-white shadow-sm" 
                        style={{ backgroundColor: preset.primary }} 
                        title={`Primary: ${preset.primary}`}
                      />
                      <div 
                        className="w-7 h-7 rounded-full border-2 border-white shadow-sm" 
                        style={{ backgroundColor: preset.secondary }} 
                        title={`Secondary: ${preset.secondary}`}
                      />
                    </div>
                    {preset.mode === "dark" ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-slate-200 border border-slate-700">
                        Dark
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        Light
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-brand-cyan text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-brand-text text-base mb-1 group-hover:text-brand-cyan transition-colors">
                  {preset.name}
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  {preset.description}
                </p>

                {/* Micro gradient bar at the bottom */}
                <div 
                  className="w-full h-1.5 rounded-full mt-4 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, ${preset.primary}, ${preset.secondary})`
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Studio Section */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border/50">
          <Sliders className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">Custom Color Studio</h2>
            <p className="text-xs text-brand-text-muted">Pick any custom HEX colors or use the color dropper to create your unique theme</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Primary Color Picker */}
          <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border space-y-3">
            <label className="block text-sm font-bold text-brand-text">
              Primary Brand Color
            </label>
            <p className="text-xs text-brand-text-muted">
              Used for main headings, CTA buttons, active links, and brand icons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="color"
                value={draftTheme.primary}
                onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={draftTheme.primary}
                onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                className="flex-1 px-4 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text font-mono text-sm font-bold uppercase focus:outline-none focus:border-brand-cyan"
                placeholder="#0070F3"
              />
            </div>
          </div>

          {/* Secondary Color Picker */}
          <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border space-y-3">
            <label className="block text-sm font-bold text-brand-text">
              Secondary Accent Color
            </label>
            <p className="text-xs text-brand-text-muted">
              Used for button gradients, secondary badges, and ambient glow effects.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="color"
                value={draftTheme.secondary}
                onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={draftTheme.secondary}
                onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                className="flex-1 px-4 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text font-mono text-sm font-bold uppercase focus:outline-none focus:border-brand-cyan"
                placeholder="#0099FF"
              />
            </div>
          </div>

          {/* Background Mode Selector */}
          <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border space-y-3">
            <label className="block text-sm font-bold text-brand-text">
              Display Mode
            </label>
            <p className="text-xs text-brand-text-muted">
              Choose clean high-contrast light mode or immersive dark night mode.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleToggleMode("light")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                  draftTheme.mode === "light"
                    ? "bg-white text-slate-900 border-brand-cyan shadow-sm ring-1 ring-brand-cyan"
                    : "bg-brand-card text-brand-text-muted border-brand-border hover:text-brand-text"
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                Light
              </button>

              <button
                type="button"
                onClick={() => handleToggleMode("dark")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                  draftTheme.mode === "dark"
                    ? "bg-slate-900 text-white border-brand-cyan shadow-sm ring-1 ring-brand-cyan"
                    : "bg-brand-card text-brand-text-muted border-brand-border hover:text-brand-text"
                }`}
              >
                <Moon className="w-4 h-4 text-sky-400" />
                Dark
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Section Settings (Preserved) */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border/50">
          <MessageCircle className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">Contact Section Text</h2>
            <p className="text-xs text-brand-text-muted">Configure the labels and text of the public contact form</p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-text-muted mb-2">Main Heading</label>
            <input
              type="text"
              defaultValue="Have a Business Problem That Software Could Solve?"
              className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text-muted mb-2">Subtext</label>
            <textarea
              defaultValue="Let's turn your idea, manual workflow or business challenge into a practical digital solution."
              rows={2}
              className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Email Label</label>
              <input
                type="text"
                defaultValue="Email"
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone Label</label>
              <input
                type="text"
                defaultValue="WhatsApp / Phone"
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">LinkedIn Label</label>
              <input
                type="text"
                defaultValue="LinkedIn Profile"
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Button Text</label>
              <input
                type="text"
                defaultValue="Start a Conversation"
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
