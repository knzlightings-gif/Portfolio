"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Briefcase, Settings, LogOut, Mailbox, UserCheck } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "About & Portrait", href: "/admin/about", icon: UserCheck },
  { name: "Personal Info", href: "/admin/personal-info", icon: User },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Inbox", href: "/admin/inbox", icon: Mailbox },
  { name: "Footer Settings", href: "/admin/footer", icon: LayoutDashboard },
  { name: "Settings & Colors", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase (auth may be null during build)
      if (auth) {
        await signOut(auth);
      }
      // Clear the session cookie via API
      await fetch("/api/auth/session", { method: "DELETE" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Always redirect to login
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 bg-brand-card border-r border-brand-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-brand-border/50">
        <Link href="/" className="text-xl font-bold text-brand-text flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-cyan/20 flex items-center justify-center">
            <span className="text-brand-cyan">ERP</span>
          </div>
          Admin Panel
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-brand-cyan/10 text-brand-cyan"
                  : "text-brand-text-muted hover:bg-brand-bg hover:text-brand-text"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-brand-cyan" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-border/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-brand-text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
