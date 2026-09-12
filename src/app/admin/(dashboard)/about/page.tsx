"use client";

import { useState, useEffect, useRef } from "react";
import defaultAbout from "@/data/about.json";
import { 
  Upload, 
  Trash2, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Image as ImageIcon,
  Plus,
  Layers,
  Wrench,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function AboutSettingsAdmin() {
  const [data, setData] = useState(defaultAbout);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load from API on mount
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((fetched) => {
        if (fetched && fetched.headline) {
          setData(fetched);
        }
      })
      .catch((err) => console.error("Error loading about data:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle local file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      if (res.ok && resData.url) {
        setData((prev) => ({ ...prev, photoUrl: resData.url }));
      } else {
        alert("Upload failed: " + (resData.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Upload error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Paragraph handlers
  const handleParagraphChange = (index: number, text: string) => {
    const updated = [...data.paragraphs];
    updated[index] = text;
    setData((prev) => ({ ...prev, paragraphs: updated }));
  };

  const handleAddParagraph = () => {
    setData((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
  };

  const handleRemoveParagraph = (index: number) => {
    setData((prev) => ({ ...prev, paragraphs: prev.paragraphs.filter((_, i) => i !== index) }));
  };

  // Stat handlers
  const handleStatChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [field]: val };
    setData((prev) => ({ ...prev, stats: updated }));
  };

  // Tech stack handlers
  const handleTechStringChange = (category: "frontend" | "backend" | "tools", value: string) => {
    const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
    setData((prev) => ({
      ...prev,
      techStack: {
        ...prev.techStack,
        [category]: arr,
      },
    }));
  };

  // Save changes
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to save changes.");
      }
    } catch (err: any) {
      alert("Save error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand-card p-6 md:p-8 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-brand-subtle text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            About Section & Picture Studio
          </div>
          <h1 className="text-3xl font-black text-brand-text tracking-tight">Edit About Me & Portrait</h1>
          <p className="text-brand-text-muted mt-1 text-sm md:text-base">
            Upload your professional photo and customize your bio story, stats, and technologies.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/#about"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text hover:bg-brand-bg text-sm font-semibold transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl btn-brand-gradient text-sm font-bold shadow-md hover:brightness-110 disabled:opacity-60 transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved & Live!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">
            About section updated successfully! Changes are live on your portfolio.
          </p>
        </div>
      )}

      {/* 1. Developer Picture & Portrait Card */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border/60">
          <ImageIcon className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">Developer Profile Picture / Portrait</h2>
            <p className="text-xs text-brand-text-muted">Upload your real photo from your computer or paste an online image URL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="space-y-5">
            {/* File Upload Button */}
            <div>
              <label className="block text-sm font-bold text-brand-text mb-2">Option A: Upload From Computer</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-dashed border-brand-border hover:border-brand-cyan bg-brand-bg text-brand-text font-bold text-sm transition-all hover:bg-brand-cyan/5"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-brand-cyan" />
                    Uploading image...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-brand-cyan" />
                    Click to Choose Picture (JPG, PNG, WebP)
                  </>
                )}
              </button>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-bold text-brand-text mb-2">Option B: Or Enter Image URL</label>
              <input
                type="url"
                value={data.photoUrl}
                onChange={(e) => setData((prev) => ({ ...prev, photoUrl: e.target.value }))}
                placeholder="https://example.com/my-photo.jpg"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan font-mono text-xs"
              />
            </div>

            {/* Photo Caption / Subtitle */}
            <div>
              <label className="block text-sm font-bold text-brand-text mb-2">Portrait Title / Caption</label>
              <input
                type="text"
                value={data.photoCaption}
                onChange={(e) => setData((prev) => ({ ...prev, photoCaption: e.target.value }))}
                placeholder="Muhammad Kashif • Full-Stack ERP Developer"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan text-sm font-medium"
              />
            </div>

            {/* Floating Experience Badge */}
            <div>
              <label className="block text-sm font-bold text-brand-text mb-2">Corner Floating Badge Text</label>
              <input
                type="text"
                value={data.experienceBadge}
                onChange={(e) => setData((prev) => ({ ...prev, experienceBadge: e.target.value }))}
                placeholder="8+ Years in Business Operations & Tech"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-brand-cyan text-sm"
              />
            </div>

            {data.photoUrl && (
              <button
                type="button"
                onClick={() => setData((prev) => ({ ...prev, photoUrl: "" }))}
                className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove Photo (Return to Default Avatar)
              </button>
            )}
          </div>

          {/* Live Preview Column */}
          <div className="flex flex-col items-center justify-center p-6 bg-brand-bg rounded-2xl border border-brand-border">
            <p className="text-xs uppercase font-bold text-brand-text-muted tracking-wider mb-4">Portrait Live Preview</p>
            
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden border-2 border-brand-cyan/40 shadow-xl bg-slate-900 group">
              {data.photoUrl ? (
                <>
                  <img
                    src={data.photoUrl}
                    alt={data.photoCaption || "Developer"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                  <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-4xl mb-3 shadow-inner">
                    👨‍💻
                  </div>
                  <p className="text-sm font-bold text-brand-text">No Custom Photo Yet</p>
                  <p className="text-xs text-brand-text-muted mt-1">Upload a photo to see your real portrait here</p>
                </div>
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white text-xs font-bold truncate drop-shadow-md">
                  {data.photoCaption || "Full-Stack ERP Developer"}
                </p>
                <p className="text-emerald-400 text-[11px] font-semibold mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {data.experienceBadge || "Verified Developer"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Headline & Bio Story Editor */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border/60">
          <Layers className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">About Headline & Journey Story</h2>
            <p className="text-xs text-brand-text-muted">Edit the main title and each paragraph describing your background</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Section Headline</label>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => setData((prev) => ({ ...prev, headline: e.target.value }))}
              placeholder="From Business Operations to Software Development"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-bold text-base focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Category Badge Text</label>
            <input
              type="text"
              value={data.badge || "About The Developer"}
              onChange={(e) => setData((prev) => ({ ...prev, badge: e.target.value }))}
              placeholder="About The Developer"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
            />
          </div>

          {/* Paragraphs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-brand-text">Bio Story Paragraphs</label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:underline"
              >
                <Plus className="w-4 h-4" />
                Add Another Paragraph
              </button>
            </div>

            {data.paragraphs.map((p, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-start gap-2">
                  <span className="w-6 text-xs font-mono font-bold text-brand-text-muted pt-3">
                    P{idx + 1}:
                  </span>
                  <textarea
                    rows={idx === data.paragraphs.length - 1 ? 2 : 3}
                    value={p}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    className={`flex-1 px-4 py-3 bg-brand-bg border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan ${
                      idx === data.paragraphs.length - 1 
                        ? "border-brand-cyan/50 font-semibold" 
                        : "border-brand-border"
                    }`}
                  />
                  {data.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(idx)}
                      className="p-3 text-brand-text-muted hover:text-red-500 transition-colors"
                      title="Delete paragraph"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {idx === data.paragraphs.length - 1 && (
                  <p className="text-[11px] text-brand-cyan font-medium ml-8 mt-1">
                    * Final paragraph is highlighted on the website as your mission statement / punchline.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Stats Editor */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border/60">
          <Sparkles className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">Key Statistics & Numbers</h2>
            <p className="text-xs text-brand-text-muted">Display your built projects count and years of experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-brand-bg border border-brand-border space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-1">
                  Stat {idx + 1} Big Number
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                  placeholder="10+"
                  className="w-full px-4 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text font-black text-2xl focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-1">
                  Stat {idx + 1} Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                  placeholder="Projects Built"
                  className="w-full px-4 py-2 bg-brand-card border border-brand-border rounded-xl text-brand-text text-xs uppercase font-bold focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tools & Technologies Editor */}
      <div className="p-6 md:p-8 bg-brand-card border border-brand-border rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border/60">
          <Wrench className="w-6 h-6 text-brand-cyan" />
          <div>
            <h2 className="text-xl font-bold text-brand-text">Tools & Technologies (Comma Separated)</h2>
            <p className="text-xs text-brand-text-muted">Type names separated by commas (e.g. React, Next.js, Node.js)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Frontend Stack</label>
            <input
              type="text"
              value={data.techStack.frontend.join(", ")}
              onChange={(e) => handleTechStringChange("frontend", e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Backend & Databases</label>
            <input
              type="text"
              value={data.techStack.backend.join(", ")}
              onChange={(e) => handleTechStringChange("backend", e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Development & AI Tools</label>
            <input
              type="text"
              value={data.techStack.tools.join(", ")}
              onChange={(e) => handleTechStringChange("tools", e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action Bar */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl btn-brand-gradient text-base font-bold shadow-lg hover:brightness-110 disabled:opacity-60 transition-all"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save About Section & Picture
        </button>
      </div>

    </div>
  );
}
