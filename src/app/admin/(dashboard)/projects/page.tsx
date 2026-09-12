"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, X, Image as ImageIcon, Upload } from "lucide-react";
import { featuredProjects } from "@/data/content";

type Project = typeof featuredProjects[0];

export default function ProjectsAdmin() {
  const [projectList, setProjectList] = useState(featuredProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
      setImagePreview(project.image);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "",
        problem: "",
        solution: "",
        modules: [],
        tech: [],
        image: ""
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local blob URL for preview (Mocking the upload process)
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing
      setProjectList(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...formData } as Project : p));
    } else {
      // Add new
      const newProject = {
        ...formData,
        id: formData.title?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(),
        hasCaseStudy: false
      } as Project;
      setProjectList(prev => [newProject, ...prev]);
    }
    
    handleCloseModal();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Manage Projects</h1>
          <p className="text-brand-text-muted">Add, edit, or remove portfolio projects.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-bg border-b border-brand-border">
              <tr>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Project Name</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Category</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm hidden md:table-cell">Tech Stack</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
              {projectList.map((project) => (
                <tr key={project.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    {project.image ? (
                      <div className="w-12 h-12 rounded-lg bg-brand-bg border border-brand-border overflow-hidden shrink-0">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 text-brand-text-muted" />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-brand-text">{project.title}</div>
                      <div className="text-xs text-brand-text-muted truncate max-w-[200px]">{project.problem}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-brand-bg border border-brand-border rounded-full text-xs text-brand-text">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap max-w-[200px]">
                      {project.tech?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-brand-text-muted bg-brand-bg px-2 py-0.5 rounded border border-brand-border/50">
                          {tag}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 2 && <span className="text-xs text-brand-text-muted">+{project.tech.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(project)} className="p-2 text-brand-text-muted hover:text-brand-purple transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setProjectList(prev => prev.filter(p => p.id !== project.id))}
                        className="p-2 text-brand-text-muted hover:text-red-500 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-brand-text-muted hover:text-brand-text rounded-full hover:bg-brand-bg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              
              {/* Image Upload Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">Project Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-brand-border bg-brand-bg flex items-center justify-center overflow-hidden relative">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-brand-text-muted" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text hover:border-brand-cyan transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <p className="text-xs text-brand-text-muted">High resolution image (Recommended: 1200x800px)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Project Title</label>
                  <input 
                    required
                    value={formData.title || ""} 
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} 
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" 
                    placeholder="e.g. Manufacturing ERP"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Category</label>
                  <input 
                    required
                    value={formData.category || ""} 
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))} 
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" 
                    placeholder="e.g. ERP / Manufacturing"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">The Problem (Client's pain point)</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.problem || ""} 
                  onChange={e => setFormData(prev => ({ ...prev, problem: e.target.value }))} 
                  className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" 
                  placeholder="Describe the issue before your software..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-text-muted">The Solution (What you built)</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.solution || ""} 
                  onChange={e => setFormData(prev => ({ ...prev, solution: e.target.value }))} 
                  className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan resize-none" 
                  placeholder="Describe how your software fixed the problem..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Key Modules (Comma separated)</label>
                  <input 
                    value={formData.modules?.join(", ") || ""} 
                    onChange={e => setFormData(prev => ({ ...prev, modules: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} 
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" 
                    placeholder="Sales, Inventory, HR"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Tech Stack (Comma separated)</label>
                  <input 
                    value={formData.tech?.join(", ") || ""} 
                    onChange={e => setFormData(prev => ({ ...prev, tech: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} 
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan" 
                    placeholder="React, Node.js, Firebase"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-brand-border/50">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 bg-brand-bg text-brand-text border border-brand-border font-medium rounded-lg hover:bg-brand-border transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-colors">
                  {editingProject ? "Update Project" : "Save Project"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
