"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, Sparkles, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Principle = {
  num: string;
  tag: string;
  title: string;
  description: string;
};

const defaultPhilosophy = {
  badge: "Core Engineering Philosophy",
  headingPart1: "Technology Is Only Useful When",
  headingPart2: "It Solves Real Problems.",
  description: "I combine deep domain comprehension with modern development standards to deliver software that drives efficiency, eliminates chaos, and fuels measurable growth.",
  principles: [
    {
      num: "01",
      tag: "Foundation",
      title: "Business Understanding",
      description: "I focus on understanding how your business actually operates — workflows, bottlenecks, and KPIs — before writing a single line of code.",
    },
    {
      num: "02",
      tag: "Execution",
      title: "Practical Solutions",
      description: "No unnecessary over-engineering. I build lean, high-impact features that directly solve operational friction and deliver tangible ROI.",
    },
    {
      num: "03",
      tag: "Usability",
      title: "User-Friendly Systems",
      description: "Software should empower people, not confuse them. Intuitive interfaces and zero learning-curve workflows tailored for non-technical teams.",
    },
    {
      num: "04",
      tag: "Tech Stack",
      title: "Modern Development",
      description: "Engineered with modern full-stack architectures, high-performance APIs, robust security, and AI-assisted workflows for rapid delivery.",
    },
    {
      num: "05",
      tag: "Scalability",
      title: "Long-Term Thinking",
      description: "Architected for tomorrow. Scalable databases, modular design patterns, and clean code that easily adapts as your business expands.",
    },
    {
      num: "06",
      tag: "Reliability",
      title: "Continuous Support",
      description: "Dedicated maintenance, proactive performance monitoring, and seamless updates so your critical systems stay 99.9% reliable.",
    },
  ],
};

export default function PhilosophyAdminPage() {
  const [data, setData] = useState(defaultPhilosophy);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/philosophy")
      .then((res) => res.json())
      .then((fetched) => {
        if (fetched && fetched.headingPart1) {
          setData(fetched);
        }
      })
      .catch((err) => console.error("Error loading philosophy data:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePrincipleChange = (index: number, field: keyof Principle, value: string) => {
    const updated = [...data.principles];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, principles: updated }));
  };

  const handleAddPrinciple = () => {
    const nextNum = String(data.principles.length + 1).padStart(2, "0");
    setData((prev) => ({
      ...prev,
      principles: [
        ...prev.principles,
        {
          num: nextNum,
          tag: "Quality",
          title: "New Principle",
          description: "Describe this core engineering standard and its client impact.",
        },
      ],
    }));
  };

  const handleRemovePrinciple = (index: number) => {
    if (data.principles.length <= 1) return;
    const updated = data.principles.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, principles: updated }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/philosophy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } catch {
      alert("Save error. Please check your network connection.");
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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-brand-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-cyan font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            Frontend Section Studio
          </div>
          <h1 className="text-3xl font-extrabold text-brand-text">Philosophy & Why Me</h1>
          <p className="text-sm text-brand-text-muted mt-1">
            Customize the headline, subtitle, and the 6 engineering principle cards live on your website.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-brand-text text-brand-bg font-bold rounded-xl hover:bg-brand-cyan hover:text-white transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 shrink-0"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Saved Live!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section Headline & Description */}
        <div className="p-8 rounded-2xl bg-brand-card border border-brand-border shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-brand-text flex items-center gap-2 border-b border-brand-border/40 pb-3">
            <Sparkles className="w-5 h-5 text-brand-cyan" />
            Section Header & Subtext
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block mb-2">
                Pill Badge Text
              </label>
              <input
                type="text"
                value={data.badge}
                onChange={(e) => setData({ ...data, badge: e.target.value })}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                placeholder="Core Engineering Philosophy"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block mb-2">
                Heading Part 1 (Regular)
              </label>
              <input
                type="text"
                value={data.headingPart1}
                onChange={(e) => setData({ ...data, headingPart1: e.target.value })}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                placeholder="Technology Is Only Useful When"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block mb-2">
                Heading Part 2 (Gradient Text)
              </label>
              <input
                type="text"
                value={data.headingPart2}
                onChange={(e) => setData({ ...data, headingPart2: e.target.value })}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan transition-colors font-semibold"
                placeholder="It Solves Real Problems."
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block mb-2">
              Section Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan transition-colors resize-none leading-relaxed"
              placeholder="I combine deep domain comprehension with modern development standards..."
            />
          </div>
        </div>

        {/* 6 Principle Cards */}
        <div className="p-8 rounded-2xl bg-brand-card border border-brand-border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4">
            <div>
              <h2 className="text-lg font-bold text-brand-text">Philosophy Principle Cards</h2>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Each card displays a category tag, title, and detailed value proposition.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddPrinciple}
              className="px-4 py-2 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>

          <div className="space-y-5">
            {data.principles.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-brand-bg/70 border border-brand-border/80 space-y-4 hover:border-brand-cyan/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-cyan/10 text-brand-cyan font-bold text-xs flex items-center justify-center">
                      {item.num || `0${index + 1}`}
                    </span>
                    <h3 className="font-bold text-brand-text text-sm">Card #{index + 1}</h3>
                  </div>

                  {data.principles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePrinciple(index)}
                      className="p-2 text-brand-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1">
                      Number (e.g. 01)
                    </label>
                    <input
                      type="text"
                      value={item.num}
                      onChange={(e) => handlePrincipleChange(index, "num", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1">
                      Category Tag (e.g. Foundation)
                    </label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => handlePrincipleChange(index, "tag", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan font-semibold text-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handlePrincipleChange(index, "title", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1">
                    Card Description
                  </label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handlePrincipleChange(index, "description", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-xl text-brand-text text-sm focus:outline-none focus:border-brand-cyan resize-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-brand-text text-brand-bg font-bold rounded-xl hover:bg-brand-cyan hover:text-white transition-all flex items-center gap-2 shadow-xl disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Philosophy Section
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
