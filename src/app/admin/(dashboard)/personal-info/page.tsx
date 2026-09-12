"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { personalInfo } from "@/data/content";

export default function PersonalInfoAdmin() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: personalInfo.name,
    roleDescriptor: personalInfo.roleDescriptor,
    tagline: personalInfo.tagline,
    description: personalInfo.description,
    availability: personalInfo.availability,
    aboutHeadline: personalInfo.aboutHeadline,
    email: personalInfo.contact.email,
    whatsapp: personalInfo.contact.whatsapp,
    linkedin: personalInfo.contact.linkedin,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    await new Promise(r => setTimeout(r, 1000));
    
    setIsSaving(false);
    alert("Saved successfully! (Mock)");
  };

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
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>

      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Core Identity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Role / Title (For Navbar)</label>
            <input name="roleDescriptor" value={formData.roleDescriptor} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
        </div>
      </div>

      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Hero Section (Home Page Top)</h2>
        
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Availability Status (Green badge)</label>
          <input name="availability" value={formData.availability} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-brand-text-muted">Main Headline (Tagline)</label>
          <textarea name="tagline" rows={2} value={formData.tagline} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-brand-text-muted">Short Description (Paragraph under headline)</label>
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" />
        </div>
      </div>

      <div className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-brand-text mb-6 pb-4 border-b border-brand-border/50">Contact Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">WhatsApp Number</label>
            <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-brand-text-muted">LinkedIn URL</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}
