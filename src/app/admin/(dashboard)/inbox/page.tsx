"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, CheckCircle2, Trash2, Loader2, RefreshCw, AlertCircle, Building2, Phone, Calendar, DollarSign, Layers } from "lucide-react";

interface Message {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
  read: boolean;
  createdAt: any;
}

export default function InboxAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  const fetchMessages = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/inbox", { cache: "no-store" });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (err: any) {
      console.error("Failed to load inbox messages:", err);
      setError(err?.message || "Failed to load messages from server");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();

    // Auto poll every 45s for new incoming contact inquiries
    const interval = setInterval(() => {
      fetchMessages();
    }, 45000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    setMarkingId(id);
    try {
      const res = await fetch("/api/inbox", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
      }
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    } finally {
      setMarkingId(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/inbox?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateVal: any) => {
    if (!dateVal) return "Recently";
    try {
      // 1. If it's a Firestore Timestamp object with .toDate()
      if (typeof dateVal === "object" && typeof dateVal.toDate === "function") {
        const d = dateVal.toDate();
        return `${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      }
      // 2. If it's a Firestore Timestamp object with { seconds }
      if (typeof dateVal === "object" && "seconds" in dateVal) {
        const d = new Date(dateVal.seconds * 1000);
        return `${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      }
      // 3. If it's an ISO date string or timestamp number
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return `${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      }
    } catch (_) {}
    return "Recently";
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-card/70 border border-brand-border/80 p-6 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">Inbox</h1>
            {unreadCount > 0 ? (
              <span className="px-2.5 py-1 text-xs bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan rounded-full font-bold animate-pulse">
                {unreadCount} unread
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full font-semibold">
                All caught up
              </span>
            )}
          </div>
          <p className="text-sm text-brand-text-muted mt-1">
            Client inquiries received from your website contact form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchMessages(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-bg hover:bg-brand-card border border-brand-border text-xs font-semibold text-brand-text transition-all cursor-pointer disabled:opacity-60"
            title="Refresh messages"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-brand-cyan" : ""}`} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Error Notice if any */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-red-500 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchMessages(true)}
            className="underline font-bold text-xs hover:opacity-80"
          >
            Retry
          </button>
        </div>
      )}

      {/* Body Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-brand-text-muted gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-brand-cyan" />
          <span className="text-sm font-medium">Loading inbox messages...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                msg.read
                  ? "bg-brand-bg/90 border-brand-border/70 opacity-90 hover:opacity-100"
                  : "bg-brand-card border-brand-cyan/60 shadow-[0_4px_20px_rgba(0,172,193,0.08)] ring-1 ring-brand-cyan/30"
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.read
                        ? "bg-brand-card border border-brand-border text-brand-text-muted"
                        : "bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan"
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-base font-bold ${msg.read ? "text-brand-text" : "text-brand-text font-black"}`}>
                        {msg.name}
                      </h3>
                      {msg.company && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-bg border border-brand-border/60 text-xs text-brand-text-muted font-medium">
                          <Building2 className="w-3 h-3 text-brand-cyan" />
                          {msg.company}
                        </span>
                      )}
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-brand-text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(msg.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      disabled={markingId === msg.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Read</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(msg.id)}
                    disabled={deletingId === msg.id}
                    className="p-2 rounded-lg text-brand-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-50"
                    title="Delete message"
                  >
                    {deletingId === msg.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 p-3.5 rounded-xl bg-brand-card/60 border border-brand-border/60 text-xs">
                <div>
                  <span className="block font-semibold text-brand-text-muted uppercase text-[10px] tracking-wider mb-0.5">Email</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="font-medium text-brand-cyan hover:underline break-all"
                  >
                    {msg.email}
                  </a>
                </div>

                {msg.phone && (
                  <div>
                    <span className="block font-semibold text-brand-text-muted uppercase text-[10px] tracking-wider mb-0.5">Phone / WhatsApp</span>
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {msg.phone}
                    </a>
                  </div>
                )}

                {msg.projectType && (
                  <div>
                    <span className="block font-semibold text-brand-text-muted uppercase text-[10px] tracking-wider mb-0.5">Project Scope</span>
                    <span className="font-medium text-brand-text flex items-center gap-1">
                      <Layers className="w-3 h-3 text-brand-purple" />
                      {msg.projectType}
                    </span>
                  </div>
                )}

                {msg.budget && (
                  <div>
                    <span className="block font-semibold text-brand-text-muted uppercase text-[10px] tracking-wider mb-0.5">Budget</span>
                    <span className="font-medium text-brand-text flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-amber-500" />
                      {msg.budget}
                    </span>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 text-sm leading-relaxed text-brand-text whitespace-pre-line font-normal">
                {msg.message}
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="p-16 bg-brand-card/70 border border-brand-border rounded-2xl text-center text-brand-text-muted flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-muted mb-4">
                <Mail className="w-7 h-7 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-brand-text">Your inbox is empty</h3>
              <p className="text-xs text-brand-text-muted mt-1 max-w-sm">
                When visitors submit your website contact form, their inquiries and project requests will appear here automatically.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
