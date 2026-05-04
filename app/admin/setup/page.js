"use client";

import { useState, useEffect } from "react";
import { createInitialAdmin, getAllAdmins } from "../../authActions";
import { useRouter } from "next/navigation";

export default function AdminSetup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("loading");
  const router = useRouter();

  useEffect(() => {
    async function checkExistingAdmins() {
      const admins = await getAllAdmins();
      if (admins && admins.length > 0) {
        router.push("/admin/login");
      } else {
        setStatus(null);
      }
    }
    checkExistingAdmins();
  }, [router]);

  if (status === "loading") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("processing");
    
    const result = await createInitialAdmin(username, password);
    
    if (result.success) {
      setStatus("success");
      setTimeout(() => router.push("/admin/login"), 2000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full glass p-8 rounded-3xl border border-primary/20">
        <h1 className="text-3xl font-bold mb-2 text-center">Admin Setup</h1>
        <p className="text-foreground-muted text-center mb-8">Create the initial administrator account.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-foreground-dim">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-border focus:border-primary outline-none transition-all"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-foreground-dim">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-border focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "processing"}
            className="w-full py-4 rounded-xl bg-primary text-background font-bold hover:bg-primary-light transition-all disabled:opacity-50"
          >
            {status === "processing" ? "Creating..." : "Create Admin Account"}
          </button>

          {status === "success" && (
            <p className="text-success text-center font-medium animate-fadeIn">
              Admin created! Redirecting to login...
            </p>
          )}
          {status === "error" && (
            <p className="text-error text-center font-medium animate-fadeIn">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
