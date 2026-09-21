"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, Upload, Trash2, Image as ImageIcon, Palette, Type } from "lucide-react";

// Preset color options for quick selection
const TEXT_COLOR_PRESETS = [
  { label: "Default Dark", value: "" },
  { label: "Brand Blue", value: "#0070F3" },
  { label: "Cyan", value: "#00C4CC" },
  { label: "Purple", value: "#7C3AED" },
  { label: "Indigo", value: "#4F46E5" },
  { label: "Emerald", value: "#10B981" },
  { label: "Amber", value: "#F59E0B" },
  { label: "Rose", value: "#F43F5E" },
  { label: "White", value: "#FFFFFF" },
  { label: "Slate", value: "#64748B" },
];

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
  // Text colors
  nameColor: "",
  taglineColor: "",
  taglineAccentColor: "",
  descriptionColor: "",
  roleDescriptorColor: "",
  availabilityColor: "",
};

// Reusable color picker row component
function ColorPickerRow({
  label,
  fieldName,
  value,
  onChange,
}: {
  label: string;
  fieldName: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <Palette className="w-3.5 h-3.5 text-brand-text-muted shrink-0" />
      <span className="text-xs text-brand-text-muted whitespace-nowrap">Text Color:</span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {TEXT_COLOR_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            title={preset.label}
            onClick={() => onChange(fieldName, preset.value)}
            className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
              value === preset.value
                ? "border-brand-cyan scale-110 shadow-[0_0_6px_rgba(0,196,204,0.6)]"
                : "border-brand-border/60"
            }`}
            style={{
              backgroundColor: preset.value || "var(--theme-text)",
              ...(preset.value === "" && { background: "linear-gradient(135deg, #0F172A 50%, #94A3B8 50%)" }),
            }}
          />
        ))}
        {/* Custom color input */}
        <label className="w-5 h-5 rounded-full border-2 border-brand-border/60 overflow-hidden cursor-pointer hover:scale-110 transition-all" title="Custom color">
          <input
            type="color"
            value={value || "#0F172A"}
            onChange={(e) => onChange(fieldName, e.target.value)}
            className="w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full -mt-5 rounded-full"
            style={{ backgroundColor: value || "transparent", border: "2px dashed #94A3B8" }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(fieldName, "")}
            className="text-[10px] text-brand-text-muted hover:text-rose-400 transition-colors px-1"
            title="Reset to default"
          >
            ✕ reset
          </button>
        )}
      </div>
      {value && (
        <span className="text-[10px] font-mono text-brand-cyan ml-auto">{value}</span>
      )}
    </div>
  );
}

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
            // Colors
            nameColor: data.nameColor || "",
            taglineColor: data.taglineColor || "",
            taglineAccentColor: data.taglineAccentColor || "",
            descriptionColor: data.descriptionColor || "",
            roleDescriptorColor: data.roleDescriptorColor || "",
            availabilityColor: data.availabilityColor || "",
          });
        }
      })
      .catch((err) => console.error("Error loading personal info:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleColorChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, logoUrl: data.url }));
      } else {
        alert(data.error || "Failed to upload logo image.");
      }
    } catch (err) {
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
      // Save colors
      nameColor: formData.nameColor,
      taglineColor: formData.taglineColor,
      taglineAccentColor: formData.taglineAccentColor,
      descriptionColor: formData.descriptionColor,
      roleDescriptorColor: formData.roleDescriptorColor,
      availabilityColor: formData.availabilityColor,
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
          <p className="text-sm font-semibold">Personal info saved! Changes are live on your portfolio.</p>
        </div>
      )}

      {/* Color Legend */}
      <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 flex items-start gap-3">
        <Type className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
        <p className="text-xs text-brand-text-muted leading-relaxed">
          <span className="text-brand-cyan font-semibold">Text Color Picker:</span> Har field ke neeche color dots hain — click karke text ka color change karo. Empty = default theme color.
        </p>
      </div>

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
                <p className="text-sm font-bold" style={{ color: formData.nameColor || undefined }}>
                  {formData.name || "[YOUR NAME]"}
                </p>
                <p className="text-xs text-brand-text-muted tracking-wider uppercase"
                  style={{ color: formData.roleDescriptorColor || undefined }}>
                  {formData.roleDescriptor || "Developer"}
                </p>
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
                placeholder="https://example.com/logo.png"
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
            <input
              name="name" value={formData.name} onChange={handleChange}
              style={{ color: formData.nameColor || undefined }}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
            />
            <ColorPickerRow label="Name Color" fieldName="nameColor" value={formData.nameColor} onChange={handleColorChange} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Role / Title (For Navbar)</label>
            <input
              name="roleDescriptor" value={formData.roleDescriptor} onChange={handleChange}
              style={{ color: formData.roleDescriptorColor || undefined }}
              className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
            />
            <ColorPickerRow label="Role Color" fieldName="roleDescriptorColor" value={formData.roleDescriptorColor} onChange={handleColorChange} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Hero Section</h2>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Availability Status (Green badge)</label>
          <input
            name="availability" value={formData.availability} onChange={handleChange}
            style={{ color: formData.availabilityColor || undefined }}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
          />
          <ColorPickerRow label="Availability Color" fieldName="availabilityColor" value={formData.availabilityColor} onChange={handleColorChange} />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Main Headline (Tagline)</label>
          <textarea
            name="tagline" rows={2} value={formData.tagline} onChange={handleChange}
            style={{ color: formData.taglineColor || undefined }}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-brand-text-muted mb-1">Main text color:</p>
              <ColorPickerRow label="Tagline Color" fieldName="taglineColor" value={formData.taglineColor} onChange={handleColorChange} />
            </div>
            <div>
              <p className="text-xs text-brand-text-muted mb-1">Accent/gradient words color:</p>
              <ColorPickerRow label="Accent Color" fieldName="taglineAccentColor" value={formData.taglineAccentColor} onChange={handleColorChange} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-brand-text-muted">Short Description</label>
          <textarea
            name="description" rows={3} value={formData.description} onChange={handleChange}
            style={{ color: formData.descriptionColor || undefined }}
            className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none"
          />
          <ColorPickerRow label="Description Color" fieldName="descriptionColor" value={formData.descriptionColor} onChange={handleColorChange} />
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
