"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Banner } from "@/components/layout/Banner";
import { Navbar } from "@/components/layout/Navbar";

// =============================================================================
// SECURITY NOTE
// =============================================================================
// The admin password should be stored in an environment variable.
// For production, consider implementing proper authentication with NextAuth.js.
// This basic auth is acceptable for low-risk internal admin panels.

const getAdminPassword = () => {
  // In production, this would come from process.env.ADMIN_PASSWORD
  // For client-side, we'd need to verify against an API endpoint
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "evet";
};

// =============================================================================
// TYPES
// =============================================================================

interface AdminLayoutProps {
  children: ReactNode;
}

// =============================================================================
// LOGIN FORM COMPONENT
// =============================================================================

interface LoginFormProps {
  onLogin: (password: string) => void;
  error: string;
}

function LoginForm({ onLogin, error }: LoginFormProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(password);
  }

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-border shadow-sm p-8 max-w-sm w-full">
        <h1 className="text-xl font-bold text-text mb-6 text-center">Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder="Heslo"
            autoFocus
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Prihlásiť sa
          </button>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// ADMIN NAV COMPONENT
// =============================================================================

interface AdminNavProps {
  pathname: string;
  onLogout: () => void;
}

function AdminNav({ pathname, onLogout }: AdminNavProps) {
  const isHome = pathname === "/admin";
  const isBlog = pathname.startsWith("/admin/blogs");
  const isAktuality = pathname.startsWith("/admin/aktuality");

  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/admin"
            className={isHome && !isBlog && !isAktuality ? "text-primary font-medium" : "text-text"}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blogs"
            className={isBlog ? "text-primary font-medium" : "text-text"}
          >
            Blogy
          </Link>
          <Link
            href="/admin/aktuality"
            className={isAktuality ? "text-primary font-medium" : "text-text"}
          >
            Aktuality
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" target="_blank" className="text-text">
            Web
          </Link>
          <button onClick={onLogout} className="text-text">
            Odhlásiť
          </button>
        </div>
      </div>
    </nav>
  );
}

// =============================================================================
// LOADING COMPONENT
// =============================================================================

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center">
      <p className="text-text-muted">Načítavam...</p>
    </div>
  );
}

// =============================================================================
// ADMIN LAYOUT COMPONENT
// =============================================================================

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  function handleLogin(password: string) {
    setError("");
    if (password === getAdminPassword()) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      setError("Nesprávne heslo");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  }

  if (checking) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Navbar />
      <AdminNav pathname={pathname} onLogout={handleLogout} />
      <main className="flex-grow bg-bg-light">
        <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
