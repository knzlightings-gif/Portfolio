"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { footerContent as defaultFooter } from "@/data/content";

export default function FooterSettingsPage() {
  const [content, setContent] = useState(defaultFooter);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from Firestore via API
  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ctaHeading1) setContent(data);
      })
      .catch((err) => console.error("Error loading footer:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to save. Please try again.");
      }
    } catch {
      alert("Save error. Please check your connection.");
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Footer Settings</h1>
          <p className="text-brand-text-muted">Update the text, CTA, and links shown in your website footer.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : saveSuccess ? (
            <><CheckCircle2 className="w-4 h-4" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">Footer saved! Changes are live on your portfolio.</p>
        </div>
      )}

      <div className="grid gap-8">
        {/* Call To Action Section */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-text mb-6">Call To Action (CTA)</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-text-muted mb-2">Heading Part 1</label>
                <input type="text" value={content.ctaHeading1}
                  onChange={(e) => setContent({ ...content, ctaHeading1: e.target.value })}
                  className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text-muted mb-2">Heading Part 2 (Gradient)</label>
                <input type="text" value={content.ctaHeading2}
                  onChange={(e) => setContent({ ...content, ctaHeading2: e.target.value })}
                  className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Subtext</label>
              <textarea value={content.ctaSubtext}
                onChange={(e) => setContent({ ...content, ctaSubtext: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Button Text</label>
              <input type="text" value={content.ctaButtonText}
                onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
                className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
            </div>
          </div>
        </div>

        {/* Brand Description */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-text mb-6">Brand Info</h2>
          <div>
            <label className="block text-sm font-medium text-brand-text-muted mb-2">Short Description</label>
            <textarea value={content.brandDescription}
              onChange={(e) => setContent({ ...content, brandDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-text mb-6">Quick Links</h2>
          <div className="space-y-4">
            {content.quickLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-text-muted mb-1">Link Name</label>
                  <input type="text" value={link.name}
                    onChange={(e) => {
                      const newLinks = [...content.quickLinks];
                      newLinks[index] = { ...newLinks[index], name: e.target.value };
                      setContent({ ...content, quickLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-text-muted mb-1">Target URL / ID</label>
                  <input type="text" value={link.href}
                    onChange={(e) => {
                      const newLinks = [...content.quickLinks];
                      newLinks[index] = { ...newLinks[index], href: e.target.value };
                      setContent({ ...content, quickLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-text mb-6">Services Links</h2>
          <div className="space-y-4">
            {content.servicesLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-text-muted mb-1">Service Name</label>
                  <input type="text" value={link.name}
                    onChange={(e) => {
                      const newLinks = [...content.servicesLinks];
                      newLinks[index] = { ...newLinks[index], name: e.target.value };
                      setContent({ ...content, servicesLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-text-muted mb-1">Target URL / ID</label>
                  <input type="text" value={link.href}
                    onChange={(e) => {
                      const newLinks = [...content.servicesLinks];
                      newLinks[index] = { ...newLinks[index], href: e.target.value };
                      setContent({ ...content, servicesLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
