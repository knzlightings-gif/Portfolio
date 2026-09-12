"use client";

import { motion } from "framer-motion";
import { Briefcase, Mailbox, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Total Projects", value: "0", icon: Briefcase, color: "text-brand-cyan", bg: "bg-brand-cyan/10" },
  { name: "Unread Messages", value: "0", icon: Mailbox, color: "text-brand-purple", bg: "bg-brand-purple/10" },
  { name: "Profile Views", value: "0", icon: Eye, color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Conversion Rate", value: "0%", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
];

export default function AdminDashboard() {
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
            className="p-6 bg-brand-card border border-brand-border rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-brand-text-muted">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-brand-card border border-brand-border rounded-2xl">
          <h2 className="text-xl font-bold text-brand-text mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/admin/personal-info" className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-cyan transition-colors group">
              <div>
                <h3 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">Edit Personal Info</h3>
                <p className="text-sm text-brand-text-muted">Update your name, role, and bio.</p>
              </div>
            </Link>
            <Link href="/admin/projects" className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-cyan transition-colors group">
              <div>
                <h3 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">Manage Projects</h3>
                <p className="text-sm text-brand-text-muted">Add new work to your portfolio.</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="p-6 bg-brand-card border border-brand-border rounded-2xl">
          <h2 className="text-xl font-bold text-brand-text mb-6">Recent Messages</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-4">
              <Mailbox className="w-8 h-8 text-brand-text-muted/50" />
            </div>
            <p className="text-brand-text-muted">No recent messages.</p>
            <Link href="/admin/inbox" className="text-brand-cyan text-sm font-medium mt-2 hover:underline">
              View all messages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
