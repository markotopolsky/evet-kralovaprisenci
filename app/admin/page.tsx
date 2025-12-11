"use client";

import { useState, useEffect } from "react";

interface PromoData {
  enabled: boolean;
  barText: string;
  imageBase64: string | null;
}

export default function AdminPage() {
  const [enabled, setEnabled] = useState(false);
  const [barText, setBarText] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch current promo on mount
  useEffect(() => {
    async function fetchPromo() {
      try {
        const res = await fetch("/api/admin/promo");
        if (res.ok) {
          const data: PromoData = await res.json();
          setEnabled(data.enabled);
          setBarText(data.barText);
          setImageBase64(data.imageBase64);
        }
      } catch (error) {
        console.error("Error fetching promo:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPromo();
  }, []);

  // Handle file upload
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove the data:image/...;base64, prefix for storage
      const base64Data = base64.split(",")[1];
      setImageBase64(base64Data);
    };
    reader.readAsDataURL(file);
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          enabled, 
          barText,
          imageBase64 
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", text: "Úspešne uložené" });
      } else {
        const error = await res.json();
        setStatus({ type: "error", text: error.error || "Chyba pri ukladaní" });
      }
    } catch (error) {
      console.error("Error saving promo:", error);
      setStatus({ type: "error", text: "Chyba pri ukladaní" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Načítavam...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Promo nastavenia
          </h1>
          <p className="text-gray-500 mb-6">
            Nastav promo akciu - obrázok a text pre info bar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enabled checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enabled"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#3C8C80] focus:ring-[#3C8C80]"
              />
              <label htmlFor="enabled" className="text-gray-700 font-medium">
                Zapnúť promo
              </label>
            </div>

            {/* Bar Text */}
            <div>
              <label
                htmlFor="barText"
                className="block text-gray-700 font-medium mb-2"
              >
                Text v info bare
              </label>
              <input
                type="text"
                id="barText"
                value={barText}
                onChange={(e) => setBarText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
                placeholder="Napr.: 🎉 Letná akcia -20%"
              />
              <p className="text-sm text-gray-500 mt-1">
                Tento text sa zobrazí v hornom info bare. Kliknutím naň sa otvorí promo obrázok.
              </p>
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Promo obrázok
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#3C8C80] file:text-white hover:file:bg-[#2d6b62] file:cursor-pointer"
              />
              {imageBase64 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Náhľad obrázku:</p>
                  <img
                    src={`data:image/png;base64,${imageBase64}`}
                    alt="Preview"
                    className="max-w-full max-h-64 rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setImageBase64(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Odstrániť obrázok
                  </button>
                </div>
              )}
            </div>

            {/* Status message */}
            {status && (
              <div
                className={`px-4 py-3 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.text}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-[#3C8C80] text-white font-medium rounded-lg hover:bg-[#2d6b62] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Ukladám..." : "Uložiť"}
            </button>
          </form>

          {/* Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Náhľad info baru
            </h2>
            {enabled && barText ? (
              <div className="bg-[#3C8C80] text-white py-3 px-4 rounded-lg">
                <div className="flex items-center justify-center gap-3 text-sm font-medium">
                  <span className="px-2.5 py-0.5 bg-[#E6B84C] text-[#2A2A2A] rounded-full text-xs font-semibold cursor-pointer hover:bg-[#d4a43d]">
                    {barText}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm italic">
                Promo je vypnuté alebo nemá text
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
