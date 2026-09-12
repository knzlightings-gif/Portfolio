"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

const defaultData = {
  name: "",
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const payload = {
      name: formData.name,
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
          <h1 className="text-3xl font-bold text-brand-text mb-2">Personal Information</h1>
          <p className="text-brand-text-muted">Manage your identity, hero section, and contact details.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center gap-2 disabled:opacity-70"
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
