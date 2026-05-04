"use client";

import { useState } from "react";
import { loginAdmin } from "../../authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAdmin(username, password);
    
    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        
        <div className="text-center mb-8 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:opacity-80 transition-opacity uppercase text-xl">
            Sushi Siema
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-foreground-muted mt-2">Enter credentials to access dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-accent text-sm text-center animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-foreground-dim ml-1">Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 outline-none transition-all"
              placeholder="admin"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-foreground-dim ml-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-background font-bold hover:bg-primary-light transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <p className="text-center text-[10px] text-foreground-dim mt-8 uppercase tracking-widest">
          Secure Access Only
        </p>
      </div>
    </div>
  );
}
