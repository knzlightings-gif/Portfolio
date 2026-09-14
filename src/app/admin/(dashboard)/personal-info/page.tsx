"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, Upload, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";

const defaultData = {
  name: "",
  logoUrl: "",
  roleDescriptor: "",
  tagline: "",
  description: "",
  availability: "",
  aboutHeadline: "",
  email: "",
  whatsapp: "",
  linkedin: "",
};

export default function PersonalInfoAdmin() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState(defaultData);

  // Load from Firestore via API
  useEffect(() => {
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            name: data.name || "",
            logoUrl: data.logoUrl || "",
            roleDescriptor: data.roleDescriptor || "",
            tagline: data.tagline || "",
            description: data.description || "",
            availability: data.availability || "",
            aboutHeadline: data.aboutHeadline || "",
            email: data.contact?.email || data.email || "",
            whatsapp: data.contact?.whatsapp || data.whatsapp || "",
            linkedin: data.contact?.linkedin || data.linkedin || "",
          });
        }
      })
      .catch((err) => console.error("Error loading personal info:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, logoUrl: data.url }));
      } else {
        alert(data.error || "Failed to upload logo image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const payload = {
      name: formData.name,
      logoUrl: formData.logoUrl,
      roleDescriptor: formData.roleDescriptor,
      tagline: formData.tagline,
      description: formData.description,
      availability: formData.availability,
      aboutHeadline: formData.aboutHeadline,
      contact: {
        email: formData.email,
        whatsapp: formData.whatsapp,
        linkedin: formData.linkedin,
      },
    };

    try {
      const res = await fetch("/api/personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to save. Please try again.");
      }
    } catch (err) {
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Personal Information & Header Logo</h1>
          <p className="text-brand-text-muted">Manage your header logo, identity, hero section, and contact details.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center gap-2 disabled:opacity-70 shadow-md cursor-pointer"
        >
          {isSaving ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
          ) : saveSuccess ? (
            <><CheckCircle2 className="w-5 h-5" /> Saved!</>
          ) : (
            <><Save className="w-5 h-5" /> Save Changes</>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">Personal info saved! Header logo & settings are live on your portfolio.</p>
        </div>
      )}

      {/* Header Logo Upload Section */}
      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border/50 pb-4">
          <div>
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-cyan" />
              Header Custom Logo
            </h2>
            <p className="text-xs text-brand-text-muted mt-0.5">
              Upload your business logo icon or image to display on the main website Header / Navigation bar.
            </p>
          </div>
          {formData.logoUrl && (
            <button
              type="button"
              onClick={() => setFormData({ ...formData, logoUrl: "" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove Logo
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Logo Live Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-text-muted">Header Logo Preview</label>
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border flex items-center gap-3">
              {formData.logoUrl ? (
                <div className="w-12 h-12 rounded-xl bg-brand-card border border-brand-border p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                  <img src={formData.logoUrl} alt="Header Logo Preview" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center font-bold text-xs shrink-0">
                  ERP
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-brand-text">{formData.name || "[YOUR NAME]"}</p>
                <p className="text-xs text-brand-text-muted tracking-wider uppercase">{formData.roleDescriptor || "Developer"}</p>
              </div>
            </div>
          </div>

          {/* Upload Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">Upload Logo Image File</label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-brand-cyan/50 hover:border-brand-cyan bg-brand-cyan/5 hover:bg-brand-cyan/10 cursor-pointer transition-all text-xs font-bold text-brand-cyan">
                {isUploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading Logo...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Click to Choose Logo File (PNG, SVG, JPG)</>
                )}
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text-muted mb-1">Or Paste Direct Image URL</label>
              <input
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                placeholder="https://example.com/logo.png or /uploads/logo.png"
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Identity */}
      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Core Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Role / Title (For Navbar)</label>
            <input name="roleDescriptor" value={formData.roleDescriptor} onChange={handleChange}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Hero Section</h2>
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Availability Status (Green badge)</label>
          <input name="availability" value={formData.availability} onChange={handleChange}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Main Headline (Tagline)</label>
          <textarea name="tagline" rows={2} value={formData.tagline} onChange={handleChange}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-brand-text-muted">Short Description</label>
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
        </div>
      </div>

      {/* Contact Links */}
      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Contact Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">WhatsApp Number</label>
            <input name="whatsapp" value={formData.whatsapp} onChange={handleChange}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-brand-text-muted">LinkedIn URL</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}
