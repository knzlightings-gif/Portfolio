"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Tag, Calendar, Clock, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Power } from "lucide-react";
import { Promotion } from "@/types/promotion";

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Partial<Promotion>>({
    title: "",
    description: "",
    badgeText: "SPECIAL OFFER",
    promoCode: "",
    discountPercentage: "",
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    isActive: true,
    ctaText: "Claim Offer Now",
    ctaLink: "/contact",
    themeColor: "cyan",
  });

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/promotions");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPromotions(data);
      }
    } catch (err) {
      console.error("Failed to fetch promotions:", err);
      setMessage({ type: "error", text: "Failed to load promotions." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleOpenAdd = () => {
    const now = new Date();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setEditingPromo({
      title: "",
      description: "",
      badgeText: "LIMITED TIME OFFER",
      promoCode: "",
      discountPercentage: "15%",
      startDate: now.toISOString().slice(0, 16),
      endDate: nextWeek.toISOString().slice(0, 16),
      isActive: true,
      ctaText: "Claim Discount Now",
      ctaLink: "/contact",
      themeColor: "cyan",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    // Format dates to ISO string sliced for datetime-local input
    const formatForInput = (dStr: string) => {
      try {
        return new Date(dStr).toISOString().slice(0, 16);
      } catch {
        return new Date().toISOString().slice(0, 16);
      }
    };

    setEditingPromo({
      ...promo,
      startDate: formatForInput(promo.startDate),
      endDate: formatForInput(promo.endDate),
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (promo: Promotion) => {
    try {
      const updated = { ...promo, isActive: !promo.isActive };
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Promotion "${promo.title}" is now ${!promo.isActive ? "ACTIVE" : "INACTIVE"}.`,
        });
        fetchPromotions();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to toggle status" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo.title || !editingPromo.startDate || !editingPromo.endDate) {
      setMessage({ type: "error", text: "Title, Start Date, and End Date are required!" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const payload = {
      ...editingPromo,
      id: editingPromo.id || `promo-${Date.now()}`,
    };

    try {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save promotion");

      setMessage({ type: "success", text: "Promotion saved successfully!" });
      setIsModalOpen(false);
      fetchPromotions();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save promotion" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return;

    try {
      const res = await fetch(`/api/promotions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Promotion deleted successfully." });
        fetchPromotions();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Delete failed" });
    }
  };

  const getStatusBadge = (promo: Promotion) => {
    if (!promo.isActive) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-400 text-xs font-semibold">
          <Power className="w-3.5 h-3.5" />
          Disabled
        </span>
      );
    }

    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);

    if (now < start) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          Scheduled ({start.toLocaleDateString()})
        </span>
      );
    }

    if (now > end) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse">
        <CheckCircle2 className="w-3.5 h-3.5" />
        🟢 Live Now on Website
      </span>
    );
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-card border border-brand-border/80 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
            <Tag className="w-6 h-6 text-brand-cyan" />
            Discounts & Promotions Module
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">
            Create scheduled discount offers. When live within date range, an animated banner automatically appears on the front-end.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPromotions}
            className="p-2.5 rounded-xl border border-brand-border hover:border-brand-cyan/40 text-brand-text-muted hover:text-brand-cyan transition-all"
            title="Refresh Promotions"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create New Offer
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-current opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Promotions List */}
      {loading ? (
        <div className="text-center py-16 text-brand-text-muted">Loading promotions...</div>
      ) : promotions.length === 0 ? (
        <div className="text-center py-16 bg-brand-card rounded-2xl border border-brand-border text-brand-text-muted">
          No discount offers created yet. Click "Create New Offer" to set up your first promo banner.
        </div>
      ) : (
        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-brand-card border border-brand-border/80 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-brand-cyan/40 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {getStatusBadge(promo)}

                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 uppercase">
                    {promo.badgeText || "SPECIAL OFFER"}
                  </span>

                  {promo.promoCode && (
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      Code: {promo.promoCode}
                    </span>
                  )}

                  {promo.discountPercentage && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {promo.discountPercentage}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-brand-text">{promo.title}</h3>
                {promo.description && <p className="text-sm text-brand-text-muted">{promo.description}</p>}

                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-text-muted pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                    Start: <strong className="text-brand-text">{new Date(promo.startDate).toLocaleString()}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-purple" />
                    End: <strong className="text-brand-text">{new Date(promo.endDate).toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-brand-border/60 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                <button
                  onClick={() => handleToggleActive(promo)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    promo.isActive
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-slate-500/10 border-slate-500/40 text-slate-400 hover:bg-slate-500/20"
                  }`}
                >
                  {promo.isActive ? "Switch OFF" : "Switch ON"}
                </button>

                <button
                  onClick={() => handleOpenEdit(promo)}
                  className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 border border-brand-cyan/30 transition-all"
                  title="Edit Offer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(promo.id)}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all"
                  title="Delete Offer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-cyan" />
                {editingPromo.id ? "Edit Promotion Offer" : "Create New Promotion Offer"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-text-muted hover:text-brand-text">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Offer Title (Main Banner Headline) *</label>
                <input
                  type="text"
                  required
                  value={editingPromo.title || ""}
                  onChange={(e) => setEditingPromo({ ...editingPromo, title: e.target.value })}
                  placeholder="e.g. Special Eid Offer — Flat 20% Off on Custom ERP Systems!"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Offer Subtitle / Description</label>
                <input
                  type="text"
                  value={editingPromo.description || ""}
                  onChange={(e) => setEditingPromo({ ...editingPromo, description: e.target.value })}
                  placeholder="e.g. Book your custom software this week to lock in your discount."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editingPromo.badgeText || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, badgeText: e.target.value })}
                    placeholder="e.g. FLAT 20% OFF"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Promo Code (Optional)</label>
                  <input
                    type="text"
                    value={editingPromo.promoCode || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, promoCode: e.target.value })}
                    placeholder="e.g. ERP20"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Discount % / Label</label>
                  <input
                    type="text"
                    value={editingPromo.discountPercentage || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, discountPercentage: e.target.value })}
                    placeholder="e.g. 20% OFF"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Start Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={editingPromo.startDate || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={editingPromo.endDate || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>
              </div>

              {/* CTA Button Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingPromo.ctaText || "Claim Offer Now"}
                    onChange={(e) => setEditingPromo({ ...editingPromo, ctaText: e.target.value })}
                    placeholder="e.g. Claim Discount Now"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">CTA Button Link</label>
                  <input
                    type="text"
                    value={editingPromo.ctaLink || "/contact"}
                    onChange={(e) => setEditingPromo({ ...editingPromo, ctaLink: e.target.value })}
                    placeholder="e.g. /contact or WhatsApp link"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPromo.isActive ?? true}
                    onChange={(e) => setEditingPromo({ ...editingPromo, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-brand-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 border border-brand-border"></div>
                </label>
                <span className="text-sm font-semibold text-brand-text">
                  Enable / Activate this offer (will show live on website during date range)
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all text-sm shadow-md"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Promotion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
