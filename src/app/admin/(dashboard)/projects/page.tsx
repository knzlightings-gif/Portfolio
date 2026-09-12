"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Upload, Loader2, Save, ExternalLink, KeyRound } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  modules: string[];
  tech: string[];
  image: string;
  demoUrl?: string;
  demoCredentials?: string;
  hasCaseStudy?: boolean;
  order?: number;
};

export default function ProjectsAdmin() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const emptyForm: Partial<Project> = {
    title: "", category: "", problem: "", solution: "",
    modules: [], tech: [], image: "", demoUrl: "", demoCredentials: "", hasCaseStudy: false,
  };
  const [formData, setFormData] = useState<Partial<Project>>(emptyForm);

  // Load projects from Firestore
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectList(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        demoUrl: project.demoUrl || "",
        demoCredentials: project.demoCredentials || "",
      });
      setImagePreview(project.image || null);
    } else {
      setEditingProject(null);
      setFormData(emptyForm);
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setImagePreview(data.url);
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Upload error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      id: editingProject?.id,
      order: editingProject?.order ?? projectList.length,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedProject = await res.json();
        if (editingProject) {
          setProjectList((prev) =>
            prev.map((p) =>
              p.id === editingProject.id
                ? ({ ...p, ...formData, id: editingProject.id, order: editingProject.order ?? 0 } as Project)
                : p
            )
          );
        } else {
          setProjectList((prev) => [...prev, savedProject]);
        }
        handleCloseModal();
      } else {
        alert("Failed to save project. Please try again.");
      }
    } catch (err: any) {
      alert("Save error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjectList((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project.");
      }
    } catch (err: any) {
      alert("Delete error: " + err.message);
    } finally {
      setDeletingId(null);
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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Manage Projects & Live Demos</h1>
          <p className="text-brand-text-muted">Add, edit, or remove portfolio ERP projects and live demo links.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add New Project
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-bg border-b border-brand-border">
              <tr>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Project Name</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Category</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm hidden md:table-cell">Live Demo Link</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
              {projectList.map((project) => (
                <tr key={project.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-bg border border-brand-border overflow-hidden shrink-0 flex items-center justify-center">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-brand-text-muted" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-brand-text">{project.title}</div>
                      <div className="text-xs text-brand-text-muted truncate max-w-[200px]">{project.problem}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-brand-bg border border-brand-border rounded-full text-xs text-brand-text font-medium">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo Active
                      </a>
                    ) : (
                      <span className="text-xs text-brand-text-muted">No demo link</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(project)} className="p-2 text-brand-text-muted hover:text-brand-cyan transition-colors" title="Edit project">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="p-2 text-brand-text-muted hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Delete project"
                      >
                        {deletingId === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projectList.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-brand-text-muted">
                    No projects yet. Click &quot;Add New Project&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-brand-card border border-brand-border w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-brand-card border-b border-brand-border p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-brand-text">
                {editingProject ? "Edit Project & Demo Link" : "Add New Project"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-brand-text-muted hover:text-brand-text rounded-full hover:bg-brand-bg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">Project Image / Screenshot</label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-brand-border bg-brand-bg flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-brand-text-muted" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text hover:border-brand-cyan transition-colors">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isUploading} />
                    </label>
                    <p className="text-xs text-brand-text-muted">High resolution (Recommended: 1200x800px)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Project Title</label>
                  <input required value={formData.title || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="e.g. Manufacturing ERP" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Category</label>
                  <input required value={formData.category || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="e.g. ERP / Manufacturing" />
                </div>
              </div>

              {/* Live Demo Fields */}
              <div className="p-5 rounded-xl bg-brand-bg/80 border border-brand-border/80 space-y-4">
                <div className="flex items-center gap-2 text-brand-cyan font-bold text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo & Credentials Settings
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-muted">Live Demo URL</label>
                    <input
                      type="url"
                      value={formData.demoUrl || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, demoUrl: e.target.value }))}
                      className="px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                      placeholder="https://demo-erp.vercel.app"
                    />
                    <span className="text-[11px] text-brand-text-muted">Leave blank if no live demo is available yet.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-muted">Demo Credentials (Optional Note)</label>
                    <input
                      type="text"
                      value={formData.demoCredentials || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, demoCredentials: e.target.value }))}
                      className="px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                      placeholder="e.g. Email: demo@company.com | Pass: demo123"
                    />
                    <span className="text-[11px] text-brand-text-muted">Helps prospective clients login instantly.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">The Problem</label>
                <textarea required rows={2} value={formData.problem || ""}
                  onChange={(e) => setFormData((p) => ({ ...p, problem: e.target.value }))}
                  className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none"
                  placeholder="Describe the issue before your software..." />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">The Solution</label>
                <textarea required rows={2} value={formData.solution || ""}
                  onChange={(e) => setFormData((p) => ({ ...p, solution: e.target.value }))}
                  className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none"
                  placeholder="Describe how your software fixed the problem..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Key Modules (Comma separated)</label>
                  <input value={formData.modules?.join(", ") || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, modules: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="Sales, Inventory, HR" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Tech Stack (Comma separated)</label>
                  <input value={formData.tech?.join(", ") || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="React, Node.js, Firebase" />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-brand-border/50">
                <button type="button" onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-brand-bg text-brand-text border border-brand-border font-medium rounded-lg hover:bg-brand-border transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving}
                  className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> {editingProject ? "Update Project" : "Save Project"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
