"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Database, LayoutDashboard, Workflow, Cpu, Link as LinkIcon, BarChart, Server, ShieldCheck, Code, Globe, Factory, Store, Truck, Briefcase, GraduationCap, Stethoscope, CheckCircle2, RefreshCw, Layers, Sparkles } from "lucide-react";
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
  Factory,
  Store,
  Truck,
  Briefcase,
  GraduationCap,
  Stethoscope,
};

export default function AdminServicesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "solutions">("services");
  
  // Services State
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  
  // Solutions State
  const [solutions, setSolutions] = useState<any[]>([]);
  const [solutionsLoading, setSolutionsLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State for Services
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
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

  // Modal State for Solutions
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<any>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    badge: "",
    features: "",
    icon: "Factory",
  });

  const fetchServices = async () => {
    setServicesLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchSolutions = async () => {
    setSolutionsLoading(true);
    try {
      const res = await fetch("/api/solutions");
      const data = await res.json();
      if (Array.isArray(data)) setSolutions(data);
    } catch (err) {
      console.error("Failed to fetch solutions:", err);
    } finally {
      setSolutionsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchSolutions();
  }, []);

  // --- SERVICE HANDLERS ---
  const handleOpenAddServiceModal = () => {
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
    setIsServiceModalOpen(true);
  };

  const handleOpenEditServiceModal = (service: ServiceItem) => {
    setEditingService(service);
    setFeaturesInput(service.features ? service.features.join("\n") : "");
    setDeliverablesInput(service.deliverables ? service.deliverables.join("\n") : "");
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService.id || !editingService.title) {
      setMessage({ type: "error", text: "Service ID and Title are required!" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const formattedFeatures = featuresInput.split("\n").map((f) => f.trim()).filter((f) => f.length > 0);
    const formattedDeliverables = deliverablesInput.split("\n").map((d) => d.trim()).filter((d) => d.length > 0);

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

      setMessage({ type: "success", text: "Service card saved successfully!" });
      setIsServiceModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save service" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm(`Are you sure you want to delete service "${id}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Service card deleted successfully!" });
        fetchServices();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Delete failed" });
    }
  };

  // --- SOLUTION HANDLERS ---
  const handleOpenAddSolutionModal = () => {
    setEditingSolution({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      badge: "Custom",
      features: "Feature 1 + Feature 2 + Feature 3",
      icon: "Factory",
    });
    setIsSolutionModalOpen(true);
  };

  const handleOpenEditSolutionModal = (solution: any) => {
    setEditingSolution({
      ...solution,
      features: Array.isArray(solution.features) ? solution.features.join(" + ") : solution.features || "",
    });
    setIsSolutionModalOpen(true);
  };

  const handleSaveSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSolution.title) {
      setMessage({ type: "error", text: "Solution Title is required!" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const slug = editingSolution.id || editingSolution.title.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");

    const payload = {
      ...editingSolution,
      id: slug,
    };

    try {
      const res = await fetch("/api/solutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save solution");

      setMessage({ type: "success", text: "Industry Solution card saved successfully!" });
      setIsSolutionModalOpen(false);
      fetchSolutions();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save solution" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSolution = async (id: string) => {
    if (!confirm(`Are you sure you want to delete solution "${id}"?`)) return;

    try {
      const res = await fetch(`/api/solutions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Industry Solution card deleted successfully!" });
        fetchSolutions();
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
            <Layers className="w-6 h-6 text-brand-cyan" />
            Manage Services & Solutions Cards
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">
            Full control to Add, Edit, or Remove cards shown across Home Page and Services page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchServices(); fetchSolutions(); }}
            className="p-2.5 rounded-xl border border-brand-border hover:border-brand-cyan/40 text-brand-text-muted hover:text-brand-cyan transition-all"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${servicesLoading || solutionsLoading ? "animate-spin" : ""}`} />
          </button>

          {activeTab === "services" ? (
            <button
              onClick={handleOpenAddServiceModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Service Card
            </button>
          ) : (
            <button
              onClick={handleOpenAddSolutionModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Solution Card
            </button>
          )}
        </div>
      </div>

      {/* Tabs Selection */}
      <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "services"
              ? "bg-brand-cyan text-slate-950 shadow-md"
              : "bg-brand-card border border-brand-border text-brand-text-muted hover:text-brand-text"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Core Services Cards ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("solutions")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "solutions"
              ? "bg-brand-cyan text-slate-950 shadow-md"
              : "bg-brand-card border border-brand-border text-brand-text-muted hover:text-brand-text"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Industry Solutions Cards ({solutions.length})</span>
        </button>
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

      {/* TAB 1: CORE SERVICES CARDS */}
      {activeTab === "services" && (
        servicesLoading ? (
          <div className="text-center py-16 text-brand-text-muted">Loading service cards from database...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-brand-card rounded-2xl border border-brand-border text-brand-text-muted">
            No service cards found. Click "Add Service Card" to create one.
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
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-brand-bg border border-brand-border text-brand-cyan">
                        /{service.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-text mb-1">{service.title}</h3>
                    {service.tagline && <p className="text-xs font-medium text-brand-cyan/80 mb-2">{service.tagline}</p>}
                    <p className="text-xs text-brand-text-muted line-clamp-3 mb-4">{service.description}</p>

                    {service.features && service.features.length > 0 && (
                      <div className="space-y-1 mb-4 text-xs text-brand-text-muted">
                        <div className="font-semibold text-brand-text mb-1">Key Features ({service.features.length}):</div>
                        <ul className="list-disc list-inside space-y-0.5">
                          {service.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="truncate">{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {service.status || "Available"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditServiceModal(service)}
                        className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition-all cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
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
        )
      )}

      {/* TAB 2: INDUSTRY SOLUTIONS CARDS */}
      {activeTab === "solutions" && (
        solutionsLoading ? (
          <div className="text-center py-16 text-brand-text-muted">Loading solution cards from database...</div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-16 bg-brand-card rounded-2xl border border-brand-border text-brand-text-muted">
            No industry solution cards found. Click "Add Solution Card" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((item) => {
              const IconComp = availableIcons[item.icon] || Factory;
              const featuresText = typeof item.features === "string" ? item.features : Array.isArray(item.features) ? item.features.join(" + ") : "";
              return (
                <div
                  key={item.id || item.title}
                  className="bg-brand-card border border-brand-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-cyan/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan">
                        {item.badge || "Custom"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-text mb-1">{item.title}</h3>
                    {item.subtitle && <p className="text-xs font-medium text-brand-cyan mb-2">{item.subtitle}</p>}
                    <p className="text-xs text-brand-text-muted line-clamp-3 mb-4">{item.description}</p>

                    {featuresText && (
                      <div className="space-y-1 mb-4 text-xs text-brand-text-muted">
                        <div className="font-semibold text-brand-text mb-1">Modules:</div>
                        <p className="text-xs text-brand-cyan font-mono line-clamp-2">{featuresText}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Production Ready
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditSolutionModal(item)}
                        className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition-all cursor-pointer"
                        title="Edit Solution"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSolution(item.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                        title="Delete Solution"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* EDIT / ADD SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <h2 className="text-xl font-bold text-brand-text">
                {editingService.id ? `Edit Service Card: ${editingService.title}` : "Add New Service Card"}
              </h2>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-brand-text-muted hover:text-brand-text">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
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
                <label className="block text-xs font-semibold text-brand-text mb-1">Tagline / Headline</label>
                <input
                  type="text"
                  value={editingService.tagline || ""}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  placeholder="e.g. Custom ERP Systems Tailored for Growing Businesses"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Short Description (For Card)</label>
                <textarea
                  rows={2}
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Short summary shown on main service cards..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Full Detailed Description (For /services/[id] detail page)</label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  placeholder="Comprehensive description explaining what this service delivers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Custom Inventory Management&#10;Automated Purchase Orders&#10;Real-Time Sales Ledger"
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
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text transition-all text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all text-sm shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Service Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ADD SOLUTION MODAL */}
      {isSolutionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <h2 className="text-xl font-bold text-brand-text">
                {editingSolution.id ? `Edit Solution Card: ${editingSolution.title}` : "Add New Solution Card"}
              </h2>
              <button onClick={() => setIsSolutionModalOpen(false)} className="text-brand-text-muted hover:text-brand-text">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveSolution} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingSolution.title || ""}
                    onChange={(e) => setEditingSolution({ ...editingSolution, title: e.target.value })}
                    placeholder="e.g. Manufacturing or E-Commerce"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">Icon *</label>
                  <select
                    value={editingSolution.icon || "Factory"}
                    onChange={(e) => setEditingSolution({ ...editingSolution, icon: e.target.value })}
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
                <label className="block text-xs font-semibold text-brand-text mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingSolution.subtitle || ""}
                  onChange={(e) => setEditingSolution({ ...editingSolution, subtitle: e.target.value })}
                  placeholder="e.g. Factory & Production ERP"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={editingSolution.badge || "Custom"}
                  onChange={(e) => setEditingSolution({ ...editingSolution, badge: e.target.value })}
                  placeholder="e.g. Industry 4.0 or Logistics"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingSolution.description || ""}
                  onChange={(e) => setEditingSolution({ ...editingSolution, description: e.target.value })}
                  placeholder="Summary of what this business solution delivers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">Core Modules Included (Separated by +)</label>
                <input
                  type="text"
                  value={editingSolution.features || ""}
                  onChange={(e) => setEditingSolution({ ...editingSolution, features: e.target.value })}
                  placeholder="Production + Inventory + Sales + Purchasing + Accounts"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-sm focus:border-brand-cyan outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border/60">
                <button
                  type="button"
                  onClick={() => setIsSolutionModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text transition-all text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all text-sm shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Solution Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
