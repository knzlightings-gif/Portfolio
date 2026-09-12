"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!auth) {
        throw new Error("Firebase is not configured. Please try again later.");
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Set a session cookie via API so middleware can verify auth
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error("Session creation failed. Please try again.");
      }

      // Redirect to admin dashboard
      window.location.href = "/admin";
    } catch (err: any) {
      // Map Firebase error codes to friendly messages
      const code = err?.code;
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password. Please check your credentials.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message || "Failed to login. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-brand-text-muted hover:text-brand-cyan transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" />
        Back to Website
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-brand-bg border border-brand-border rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-cyan/5">
            <Lock className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-brand-text">Admin Login</h1>
          <p className="text-sm text-brand-text-muted mt-2 text-center">
            Secure access to manage your portfolio content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-text-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full py-3.5 bg-brand-text text-brand-bg font-bold rounded-lg hover:bg-brand-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Secure Login"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
