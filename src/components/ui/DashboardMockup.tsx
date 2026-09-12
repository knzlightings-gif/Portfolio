"use client";

import { motion } from "framer-motion";

export default function DashboardMockup({
  title,
  themeColor = "cyan",
}: {
  title: string;
  themeColor?: "cyan" | "purple";
}) {
  const isCyan = themeColor === "cyan";
  const primary = isCyan ? "bg-brand-cyan" : "bg-brand-purple";
  const primaryText = isCyan ? "text-brand-cyan" : "text-brand-purple";

  return (
    <div className="w-full h-full bg-brand-bg rounded-t-xl overflow-hidden border-b border-brand-border/50 flex flex-col font-sans">
      {/* Topbar */}
      <div className="h-10 border-b border-brand-border flex items-center px-4 justify-between bg-brand-card">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[10px] text-brand-text-muted font-medium px-3 py-1 bg-brand-bg rounded-full">
          {title} - Admin Panel
        </div>
        <div className="w-6 h-6 rounded-full bg-brand-border/50" />
      </div>

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Sidebar */}
        <div className="w-16 md:w-32 hidden sm:flex flex-col gap-3">
          <div className={`h-8 w-full rounded ${primary}/20`} />
          <div className="h-4 w-3/4 bg-brand-border rounded mt-4" />
          <div className="h-4 w-full bg-brand-border rounded" />
          <div className="h-4 w-5/6 bg-brand-border rounded" />
          <div className="h-4 w-full bg-brand-border rounded" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-lg p-3 border border-brand-border flex flex-col gap-2">
                <div className="h-3 w-1/2 bg-brand-border rounded" />
                <div className="h-5 w-3/4 bg-brand-text/80 rounded" />
              </div>
            ))}
          </div>

          {/* Chart & Table Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chart */}
            <div className="md:col-span-2 bg-brand-card rounded-lg border border-brand-border p-4 flex flex-col justify-end gap-2">
              <div className="flex justify-between items-end h-full w-full px-2">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-6 sm:w-10 rounded-t-sm ${primary} opacity-80`}
                  />
                ))}
              </div>
            </div>
            
            {/* Activity/Table */}
            <div className="bg-brand-card rounded-lg border border-brand-border p-4 flex flex-col gap-3">
              <div className="h-4 w-1/2 bg-brand-border rounded mb-2" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${primary}`} />
                  <div className="h-2 w-full bg-brand-border/50 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
