"use client";

import { useState, useEffect, ReactNode } from "react";

const ADMIN_PASSWORD = "evet"; // Heslo pre admin

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      setError("Nesprávne heslo");
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Načítavam...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-sm w-full mx-4">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Admin prihlásenie
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Heslo
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
                placeholder="Zadaj heslo"
                autoFocus
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#3C8C80] text-white font-medium rounded-lg hover:bg-[#2d6b62] transition-colors"
            >
              Prihlásiť sa
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

