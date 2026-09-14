"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Upload, Loader2, Save, ExternalLink, KeyRound, Star, CheckCircle, Eye, Images, Clipboard } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  modules: string[];
  tech: string[];
  image: string;
  gallery?: string[];
  demoUrl?: string;
  videoUrl?: string;
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const emptyForm: Partial<Project> = {
    title: "",
    category: "",
    problem: "",
    solution: "",
    modules: [],
    tech: [],
    image: "",
    gallery: [],
    demoUrl: "",
    videoUrl: "",
    demoCredentials: "",
    hasCaseStudy: false,
  };
  const [formData, setFormData] = useState<Partial<Project>>(emptyForm);

  // Load projects from Firestore
  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProjectList(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      const galleryList = Array.isArray(project.gallery) && project.gallery.length > 0
        ? project.gallery
        : (project.image ? [project.image] : []);

      setFormData({
        ...project,
        image: project.image || galleryList[0] || "",
        gallery: galleryList,
        demoUrl: project.demoUrl || "",
        videoUrl: project.videoUrl || "",
        demoCredentials: project.demoCredentials || "",
      });
    } else {
      setEditingProject(null);
      setFormData(emptyForm);
    }
    setUploadMessage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setUploadMessage(null);
  };

  // Client-side image compressor & Base64 encoder for 100% Vercel compatibility
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const processImageFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage(`Processing ${files.length} image(s)...`);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith("image/")) {
          const compressed = await compressImage(files[i]);
          newUrls.push(compressed);
        }
      }

      if (newUrls.length > 0) {
        setFormData((prev) => {
          const currentGallery = prev.gallery || [];
          const combined = [...currentGallery, ...newUrls];
          const primaryImg = prev.image || combined[0] || "";
          return {
            ...prev,
            gallery: combined,
            image: primaryImg,
          };
        });
        setUploadMessage(`Successfully added ${newUrls.length} screenshot(s) from clipboard/files!`);
      } else {
        setUploadMessage("No valid image found in clipboard.");
      }
    } catch (err: any) {
      alert("Image processing error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Clipboard Ctrl+V Paste Listener when modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const clipboardItems = e.clipboardData?.items;
      if (!clipboardItems) return;

      const imageFiles: File[] = [];
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault();
        processImageFiles(imageFiles);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isModalOpen]);

  const handleMultiImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processImageFiles(Array.from(files));
  };

  const handlePasteFromClipboard = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.read) {
        alert("Please press Ctrl + V on your keyboard to paste your copied screenshot!");
        return;
      }
      const items = await navigator.clipboard.read();
      const imageFiles: File[] = [];
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = new File([blob], `screenshot_${Date.now()}.png`, { type });
            imageFiles.push(file);
          }
        }
      }
      if (imageFiles.length > 0) {
        processImageFiles(imageFiles);
      } else {
        alert("No image found in clipboard! Copy a screenshot first (Snipping Tool / Win+Shift+S) and try again.");
      }
    } catch (err) {
      alert("Tip: Press Ctrl + V directly on your keyboard to paste your screenshot!");
    }
  };

  const handleAddExternalUrl = () => {
    const url = prompt("Enter Image URL (https://...):");
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();

    setFormData((prev) => {
      const currentGallery = prev.gallery || [];
      const combined = [...currentGallery, cleanUrl];
      const primaryImg = prev.image || combined[0] || "";
      return {
        ...prev,
        gallery: combined,
        image: primaryImg,
      };
    });
  };

  const handleSetPrimaryThumbnail = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedGallery = (prev.gallery || []).filter((_, i) => i !== indexToRemove);
      let newPrimary = prev.image;
      if (prev.image === prev.gallery?.[indexToRemove]) {
        newPrimary = updatedGallery[0] || "";
      }
      return {
        ...prev,
        gallery: updatedGallery,
        image: newPrimary,
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const gallery = formData.gallery || [];
    const primaryImage = formData.image || gallery[0] || "";

    const payload = {
      ...formData,
      image: primaryImage,
      gallery: gallery,
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
                ? ({ ...p, ...payload, id: editingProject.id, order: editingProject.order ?? 0 } as Project)
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
    if (!confirm("Are you sure you want to delete this project permanently?")) return;
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Manage ERP Projects & Galleries</h1>
          <p className="text-brand-text-muted">Upload 8+ screenshots per project, set primary thumbnails, and configure live demos.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-2 shadow-lg shrink-0"
        >
          <Plus className="w-5 h-5" /> Add New Project
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-bg border-b border-brand-border">
              <tr>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Project & Thumbnail</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Category</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm">Screenshots</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm hidden md:table-cell">Live Demo Link</th>
                <th className="px-6 py-4 font-medium text-brand-text-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
              {projectList.map((project) => {
                const galleryCount = (project.gallery && project.gallery.length > 0)
                  ? project.gallery.length
                  : (project.image ? 1 : 0);

                return (
                  <tr key={project.id} className="hover:bg-brand-bg/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-brand-bg border border-brand-border overflow-hidden shrink-0 flex items-center justify-center relative">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-brand-text-muted" />
                        )}
                        <span className="absolute bottom-0 right-0 bg-brand-cyan/90 text-[9px] font-bold text-brand-bg px-1 rounded-tl">
                          Cover
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-brand-text text-base">{project.title}</div>
                        <div className="text-xs text-brand-text-muted truncate max-w-[220px]">{project.problem}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-brand-bg border border-brand-border rounded-full text-xs text-brand-text font-medium">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-bg border border-brand-border rounded-full text-xs font-semibold text-brand-cyan">
                        <Images className="w-3.5 h-3.5" />
                        {galleryCount} Picture{galleryCount === 1 ? "" : "s"}
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
                );
              })}
              {projectList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brand-text-muted">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-brand-card border border-brand-border w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-brand-card/95 backdrop-blur-md border-b border-brand-border p-6 flex justify-between items-center z-20">
              <div>
                <h2 className="text-2xl font-bold text-brand-text">
                  {editingProject ? `Edit: ${editingProject.title}` : "Add New ERP Project"}
                </h2>
                <p className="text-xs text-brand-text-muted mt-0.5">
                  Upload multiple ERP screenshots (8+) and choose your primary front-page thumbnail.
                </p>
              </div>
              <button onClick={handleCloseModal} className="p-2 text-brand-text-muted hover:text-brand-text rounded-full hover:bg-brand-bg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-7">
              {/* MULTI-PICTURE GALLERY UPLOADER */}
              <div className="p-5 rounded-2xl bg-brand-bg/80 border border-brand-border space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-brand-cyan font-bold text-sm">
                      <Images className="w-4 h-4" />
                      ERP Screenshots & Multi-Picture Gallery
                    </div>
                    <p className="text-xs text-brand-text-muted mt-0.5">
                      Upload 8+ screenshots (Dashboard, Inventory, Invoices, Reports). Click &quot;Set as Thumbnail&quot; to pick the main cover.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePasteFromClipboard}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan font-bold text-xs rounded-lg hover:bg-brand-cyan hover:text-brand-bg transition-all shadow-sm"
                      title="Paste screenshot copied to clipboard (Ctrl+V)"
                    >
                      <Clipboard className="w-3.5 h-3.5" />
                      <span>Paste Clipboard (Ctrl+V)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddExternalUrl}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-card border border-brand-border text-brand-text font-semibold text-xs rounded-lg hover:border-brand-cyan hover:text-brand-cyan transition-all"
                    >
                      <span>+ Add Image URL</span>
                    </button>
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-cyan text-brand-bg font-bold text-xs rounded-lg hover:bg-brand-cyan/90 transition-all shadow-md">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{isUploading ? "Processing..." : "+ Upload Screenshots"}</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleMultiImageChange} disabled={isUploading} />
                    </label>
                  </div>
                </div>

                {uploadMessage && (
                  <div className="p-3 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {uploadMessage}
                  </div>
                )}

                {/* Gallery Grid */}
                {formData.gallery && formData.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.gallery.map((imgUrl, idx) => {
                      const isThumbnail = formData.image === imgUrl || (!formData.image && idx === 0);

                      return (
                        <div
                          key={idx}
                          className={`relative group rounded-xl overflow-hidden border-2 bg-brand-card transition-all aspect-video flex flex-col ${
                            isThumbnail ? "border-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]" : "border-brand-border hover:border-brand-text-muted"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />

                          {/* Primary Thumbnail Badge */}
                          {isThumbnail && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-brand-cyan text-brand-bg text-[10px] font-extrabold rounded shadow-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-brand-bg" /> Cover Thumbnail
                            </span>
                          )}

                          {/* Hover Controls */}
                          <div className="absolute inset-0 bg-brand-bg/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-xs">
                            {!isThumbnail && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryThumbnail(imgUrl)}
                                className="px-2.5 py-1 bg-brand-cyan text-brand-bg text-[11px] font-bold rounded hover:bg-brand-cyan/90 transition-all flex items-center gap-1 shadow"
                              >
                                <Star className="w-3 h-3" /> Set as Thumbnail
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="px-2.5 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[11px] font-bold rounded hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-brand-border rounded-xl p-8 text-center bg-brand-card/40">
                    <Images className="w-10 h-10 text-brand-text-muted mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold text-brand-text">No ERP Screenshots Added Yet</p>
                    <p className="text-xs text-brand-text-muted mt-1">
                      Click the &quot;Upload Screenshots&quot; button above to select at least 8 pictures of your ERP system.
                    </p>
                  </div>
                )}
                <div className="text-[11px] text-brand-text-muted flex justify-between items-center">
                  <span>Total Screenshots: <strong>{formData.gallery?.length || 0}</strong></span>
                  <span>Recommended: 8 to 12 clear screenshots for maximum client trust.</span>
                </div>
              </div>

              {/* Title & Category */}
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

              {/* Live Demo & YouTube Video Fields */}
              <div className="p-5 rounded-xl bg-brand-bg/80 border border-brand-border space-y-4">
                <div className="flex items-center gap-2 text-brand-cyan font-bold text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo & YouTube Video Settings
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-muted">Live Demo URL</label>
                    <input
                      type="url"
                      value={formData.demoUrl || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, demoUrl: e.target.value }))}
                      className="px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                      placeholder="https://demo-erp.vercel.app"
                    />
                    <span className="text-[11px] text-brand-text-muted">Direct link to live web app.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-muted">YouTube Video Link (Demo)</label>
                    <input
                      type="url"
                      value={formData.videoUrl || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, videoUrl: e.target.value }))}
                      className="px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <span className="text-[11px] text-brand-text-muted">Increases YouTube views & demo engagement.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-muted">Demo Credentials (Optional)</label>
                    <input
                      type="text"
                      value={formData.demoCredentials || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, demoCredentials: e.target.value }))}
                      className="px-3.5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-brand-text text-sm focus:outline-none focus:border-brand-cyan"
                      placeholder="e.g. Email: demo@co.com | Pass: 123"
                    />
                    <span className="text-[11px] text-brand-text-muted">Helps prospective clients login instantly.</span>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
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

              {/* Modules & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Key Modules (Comma separated)</label>
                  <input value={formData.modules?.join(", ") || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, modules: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="Sales, Inventory, Invoices, Production, Accounts, Reports" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-text-muted">Tech Stack (Comma separated)</label>
                  <input value={formData.tech?.join(", ") || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                    className="px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan"
                    placeholder="React, Next.js, Node.js, Firebase" />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-brand-border/50">
                <button type="button" onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-brand-bg text-brand-text border border-brand-border font-medium rounded-lg hover:bg-brand-border transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving || isUploading}
                  className="px-6 py-2.5 bg-brand-cyan text-brand-bg font-bold rounded-lg hover:bg-brand-cyan/90 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg">
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

