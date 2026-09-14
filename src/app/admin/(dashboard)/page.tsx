"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mailbox, Eye, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: any;
}

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch live projects count
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjectCount(data.length);
        } else {
          setProjectCount(0);
        }
      })
      .catch((err) => {
        console.error("Error fetching projects count:", err);
        setProjectCount(0);
      });

    // 2. Realtime listener for Firestore Messages
    if (!db) {
      setIsLoading(false);
      return;
    }

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
        console.error("Error fetching inbox messages:", err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const unreadCount = messages.filter((m) => !m.read).length;
  const recentMessages = messages.slice(0, 3);

  const stats = [
    {
      name: "Total Projects",
      value: projectCount !== null ? projectCount.toString() : "...",
      icon: Briefcase,
      color: "text-brand-cyan",
      bg: "bg-brand-cyan/10",
      href: "/admin/projects",
    },
    {
      name: "Unread Messages",
      value: isLoading ? "..." : unreadCount.toString(),
      icon: Mailbox,
      color: "text-brand-purple",
      bg: "bg-brand-purple/10",
      href: "/admin/inbox",
    },
    {
      name: "Profile Views",
      value: "148+",
      icon: Eye,
      color: "text-green-500",
      bg: "bg-green-500/10",
      href: "/admin/settings",
    },
    {
      name: "Conversion Rate",
      value: messages.length > 0 ? `${Math.min(95, Math.round((messages.length / 15) * 100))}%` : "12%",
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      href: "/admin/inbox",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-text mb-2">Dashboard Overview</h1>
        <p className="text-brand-text-muted">Welcome back. Here is what&apos;s happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block p-6 bg-brand-card border border-brand-border hover:border-brand-cyan transition-all rounded-2xl shadow-lg group hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs text-brand-text-muted group-hover:text-brand-cyan transition-colors flex items-center gap-1 font-semibold">
                  View →
                </span>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-text mb-1 flex items-center gap-2">
                  {stat.value}
                  {stat.value === "..." && <Loader2 className="w-5 h-5 animate-spin text-brand-cyan" />}
                </div>
                <div className="text-sm font-medium text-brand-text-muted">{stat.name}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Quick Actions */}
        <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-text mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/admin/personal-info" className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-cyan transition-colors group">
                <div>
                  <h3 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">Edit Personal Info</h3>
                  <p className="text-sm text-brand-text-muted">Update your name, role, availability, and bio.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/admin/projects" className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-cyan transition-colors group">
                <div>
                  <h3 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">Manage Projects & Screenshots</h3>
                  <p className="text-sm text-brand-text-muted">Add new work, paste screenshots (Ctrl+V) & YouTube links.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/admin/settings" className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-cyan transition-colors group">
                <div>
                  <h3 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">Theme & Color Settings</h3>
                  <p className="text-sm text-brand-text-muted">Change global website colors with 12 curated palettes.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-brand-text">Recent Messages</h2>
              <Link href="/admin/inbox" className="text-brand-cyan text-xs font-bold hover:underline flex items-center gap-1">
                View All ({messages.length}) →
              </Link>
            </div>

            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    href="/admin/inbox"
                    className={`block p-3.5 rounded-xl border transition-all ${
                      msg.read ? "bg-brand-bg/60 border-brand-border" : "bg-brand-bg border-brand-cyan/40 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-brand-text text-sm flex items-center gap-2">
                        {msg.name}
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />}
                      </span>
                      <span className="text-[11px] text-brand-text-muted">
                        {msg.read ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="text-xs text-brand-text-muted truncate">{msg.message}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 bg-brand-bg rounded-full flex items-center justify-center mb-3">
                  <Mailbox className="w-7 h-7 text-brand-text-muted/50" />
                </div>
                <p className="text-brand-text-muted text-sm font-medium">No recent messages in inbox.</p>
                <p className="text-xs text-brand-text-muted/70 mt-1">Contact form submissions will appear here instantly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
