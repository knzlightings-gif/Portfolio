"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Database, LayoutDashboard, Workflow, Cpu, Link as LinkIcon, BarChart, Server, ShieldCheck, Code, Globe, CheckCircle2, RefreshCw } from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

const availableIcons: Record<string, any> = {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link: LinkIcon,
  BarChart,
  Server,
  ShieldCheck,
  Code,
  Globe,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem>>({
    id: "",
    title: "",
    tagline: "",
    description: "",
    fullDescription: "",
    icon: "Database",
    features: [],
    deliverables: [],
    status: "Available for projects",
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [deliverablesInput, setDeliverablesInput] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setMessage({ type: "error", text: "Failed to load services data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAddModal = () => {
    setEditingService({
      id: "",
      title: "",
      tagline: "",
      description: "",
      fullDescription: "",
      icon: "Database",
      features: [],
      deliverables: [],
      status: "Available for projects",
    });
    setFeaturesInput("");
    setDeliverablesInput("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFeaturesInput(service.features ? service.features.join("\n") : "");
    setDeliverablesInput(service.deliverables ? service.deliverables.join("\n") : "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService.id || !editingService.title) {
      setMessage({ type: "error", text: "Service ID and Title are required!" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const formattedFeatures = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const formattedDeliverables = deliverablesInput
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const payload = {
      ...editingService,
      id: editingService.id.toLowerCase().trim().replace(/\s+/g, "-"),
      features: formattedFeatures,
      deliverables: formattedDeliverables,
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save service");

      setMessage({ type: "success", text: "Service saved successfully!" });
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save service" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete service "${id}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Service deleted successfully" });
        fetchServices();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Delete failed" });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-card border border-brand-border/80 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-brand-cyan" />
            Manage Services (What I Do)
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">
            Add or edit detailed content for each service page shown to visitors when they click "Learn More".
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl border border-brand-border hover:border-brand-cyan/40 text-brand-text-muted hover:text-brand-cyan transition-all"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Service
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

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-16 text-brand-text-muted">Loading services from database...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 bg-brand-card rounded-2xl border border-brand-border text-brand-text-muted">
          No services found. Click "Add New Service" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComp = availableIcons[service.icon] || Database;
            return (
              <div
                key={service.id}
                className="bg-brand-card border border-brand-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-cyan/40 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-brand-bg border border-brand-border text-brand-cyan">
                      /{service.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text mb-1">{service.title}</h3>
                  <p className="text-xs font-medium text-brand-cyan/80 mb-3">{service.tagline}</p>
                  <p className="text-xs text-brand-text-muted line-clamp-3 mb-4">{service.description}</p>

                  <div className="space-y-1 mb-4 text-xs text-brand-text-muted">
                    <div className="font-semibold text-brand-text mb-1">Key Features ({service.features?.length || 0}):</div>
                    <ul className="list-disc list-inside space-y-0.5">
                      {service.features?.slice(0, 3).map((f, i) => (
                        <li key={i} className="truncate">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {service.status || "Available"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(service)}
                      className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition-all"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <h2 className="text-xl font-bold text-brand-text">
                {editingService.id ? `Edit Service: ${editingService.title}` : "Add New Service"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-text-muted hover:text-brand-text">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Service ID / Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.id || ""}
                    onChange={(e) => setEditingService({ ...editingService, id: e.target.value })}
                    placeholder="e.g. erp or web-apps"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Icon *</label>
                  <select
                    value={editingService.icon || "Database"}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  >
                    {Object.keys(availableIcons).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. ERP Development"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Tagline (Detail Page Headline)</label>
                <input
                  type="text"
                  value={editingService.tagline || ""}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  placeholder="e.g. Custom ERP Systems Tailored for Growing Businesses"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Short Description (For Cards)</label>
                <textarea
                  rows={2}
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Short summary shown on the main homepage cards..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Full Detailed Description (For /services/[id] page)</label>
                <textarea
                  rows={4}
                  value={editingService.fullDescription || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  placeholder="Comprehensive description explaining what this service delivers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Key Features (One feature per line)</label>
                <textarea
                  rows={4}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Custom Inventory & Stock Management&#10;Automated Purchase Orders&#10;Real-Time Sales Ledger"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Deliverables Included (One item per line)</label>
                <textarea
                  rows={3}
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  placeholder="Fully Configured Cloud ERP&#10;Role-Based Access Setup&#10;User Training & Video Guides"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Status Badge Text</label>
                <input
                  type="text"
                  value={editingService.status || "Available for projects"}
                  onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                  placeholder="e.g. Available for projects"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
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
                  {saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
