"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle2, Trash2, Loader2, RefreshCw } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  createdAt: Timestamp | null;
}

export default function InboxAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    // Real-time listener — auto-updates when new messages arrive
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs: Message[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Message, "id">),
        }));
        setMessages(msgs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Firestore inbox error:", err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "messages", id), { read: true });
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const deleteMessage = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "Just now";
    const date = ts.toDate();
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Inbox</h1>
          <p className="text-brand-text-muted">
            Messages from your portfolio contact form.{" "}
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-brand-cyan/20 text-brand-cyan rounded-full font-semibold">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-text-muted">
          <RefreshCw className="w-3 h-3" />
          Live updates
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-brand-text-muted">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          Loading messages...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-colors ${
                msg.read
                  ? "bg-brand-bg border-brand-border"
                  : "bg-brand-card border-brand-cyan shadow-sm shadow-brand-cyan/5"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.read ? "bg-brand-card border border-brand-border" : "bg-brand-cyan/20"
                    }`}
                  >
                    <Mail className={`w-5 h-5 ${msg.read ? "text-brand-text-muted" : "text-brand-cyan"}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${msg.read ? "text-brand-text-muted" : "text-brand-text"}`}>
                      {msg.name}{" "}
                      {msg.company && (
                        <>
                          <span className="font-normal opacity-70">from</span> {msg.company}
                        </>
                      )}
                    </h3>
                    <p className="text-xs text-brand-text-muted">{formatDate(msg.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="p-2 text-brand-text-muted hover:text-green-500 transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    disabled={deletingId === msg.id}
                    className="p-2 text-brand-text-muted hover:text-red-500 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === msg.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 rounded-xl bg-brand-bg border border-brand-border/50">
                <div>
                  <span className="block text-xs font-medium text-brand-text-muted uppercase mb-1">Email</span>
                  <a href={`mailto:${msg.email}`} className="text-sm text-brand-cyan hover:underline">
                    {msg.email}
                  </a>
                </div>
                {msg.phone && (
                  <div>
                    <span className="block text-xs font-medium text-brand-text-muted uppercase mb-1">WhatsApp</span>
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-cyan hover:underline"
                    >
                      {msg.phone}
                    </a>
                  </div>
                )}
                {msg.projectType && (
                  <div>
                    <span className="block text-xs font-medium text-brand-text-muted uppercase mb-1">Project Type</span>
                    <span className="text-sm text-brand-text">{msg.projectType}</span>
                  </div>
                )}
                {msg.budget && (
                  <div>
                    <span className="block text-xs font-medium text-brand-text-muted uppercase mb-1">Budget</span>
                    <span className="text-sm text-brand-text">{msg.budget}</span>
                  </div>
                )}
              </div>

              <div className="text-brand-text-muted leading-relaxed">
                <span className="block text-xs font-medium text-brand-text-muted uppercase mb-2">Message</span>
                {msg.message}
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="p-12 bg-brand-card border border-brand-border rounded-2xl text-center text-brand-text-muted">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Your inbox is empty.</p>
              <p className="text-sm mt-1 opacity-70">Messages from your contact form will appear here in real-time.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
