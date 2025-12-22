"use client";

import { useState, useEffect } from "react";

interface PromoData {
  enabled: boolean;
  barText: string;
  imageBase64: string | null;
}

interface ClinicStatusData {
  forceClosed: boolean;
  forceClosedDate: string;
}

export default function AdminPage() {
  // Promo state
  const [enabled, setEnabled] = useState(false);
  const [barText, setBarText] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  
  // Clinic status state
  const [forceClosed, setForceClosed] = useState(false);
  const [clinicStatusDate, setClinicStatusDate] = useState("");
  const [savingClinicStatus, setSavingClinicStatus] = useState(false);
  const [clinicStatusMessage, setClinicStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Debug: Log when imageBase64 changes
  useEffect(() => {
    console.log("imageBase64 state changed:", {
      hasValue: !!imageBase64,
      length: imageBase64?.length || 0,
      preview: imageBase64?.substring(0, 50) || "none"
    });
  }, [imageBase64]);

  // Fetch current promo and clinic status on mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both in parallel with cache-busting
        const timestamp = Date.now();
        const [promoRes, clinicStatusRes] = await Promise.all([
          fetch(`/api/admin/promo?t=${timestamp}`, { 
            cache: "no-store",
            headers: { "Cache-Control": "no-cache" }
          }),
          fetch(`/api/admin/clinic-status?t=${timestamp}`, { 
            cache: "no-store",
            headers: { "Cache-Control": "no-cache" }
          }),
        ]);

        if (promoRes.ok) {
          const data: PromoData = await promoRes.json();
          console.log("Fetched promo data:", { 
            enabled: data.enabled, 
            barText: data.barText, 
            hasImage: !!data.imageBase64,
            imageLength: data.imageBase64?.length 
          });
          setEnabled(data.enabled);
          setBarText(data.barText);
          if (data.imageBase64 && typeof data.imageBase64 === 'string' && data.imageBase64.length > 0) {
          setImageBase64(data.imageBase64);
          } else {
            setImageBase64(null);
          }
        }

        if (clinicStatusRes.ok) {
          const data: ClinicStatusData = await clinicStatusRes.json();
          setForceClosed(data.forceClosed);
          setClinicStatusDate(data.forceClosedDate);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle clinic status toggle
  async function handleClinicStatusToggle(newValue: boolean) {
    setSavingClinicStatus(true);
    setClinicStatusMessage(null);

    try {
      const res = await fetch("/api/admin/clinic-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceClosed: newValue }),
      });

      if (res.ok) {
        const data: ClinicStatusData = await res.json();
        setForceClosed(data.forceClosed);
        setClinicStatusDate(data.forceClosedDate);
        setClinicStatusMessage({ 
          type: "success", 
          text: newValue ? "Klinika je dnes zatvorená" : "Klinika je otvorená podľa otváracích hodín" 
        });
      } else {
        const error = await res.json();
        setClinicStatusMessage({ type: "error", text: error.error || "Chyba pri ukladaní" });
      }
    } catch (error) {
      console.error("Error updating clinic status:", error);
      setClinicStatusMessage({ type: "error", text: "Chyba pri ukladaní" });
    } finally {
      setSavingClinicStatus(false);
    }
  }

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
        const savedData = await res.json();
        setImageBase64(savedData.imageBase64);
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
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Clinic Status Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Stav kliniky
          </h1>
          <p className="text-gray-500 mb-6">
            Ak nastane neočakávaná situácia, môžeš označiť kliniku ako zatvorenú na dnešný deň.
          </p>

          <div className="space-y-4">
            {/* Force Closed Toggle */}
            <div 
              className={`p-4 rounded-lg border-2 transition-colors ${
                forceClosed 
                  ? "border-red-300 bg-red-50" 
                  : "border-green-300 bg-green-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${forceClosed ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {forceClosed ? "Klinika je dnes ZATVORENÁ" : "Klinika funguje normálne"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {clinicStatusDate && `Dátum: ${clinicStatusDate}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleClinicStatusToggle(!forceClosed)}
                  disabled={savingClinicStatus}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    forceClosed
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {savingClinicStatus 
                    ? "Ukladám..." 
                    : forceClosed 
                      ? "Otvoriť kliniku" 
                      : "Zatvoriť kliniku dnes"
                  }
                </button>
              </div>
            </div>

            {/* Status message */}
            {clinicStatusMessage && (
              <div
                className={`px-4 py-3 rounded-lg ${
                  clinicStatusMessage.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {clinicStatusMessage.text}
              </div>
            )}

            <p className="text-sm text-gray-500">
              ⚠️ Ak označíš kliniku ako zatvorenú, návštevníkom webu sa zobrazí iba ikona „zatvorené" bez otváracích hodín. 
              Tento stav sa automaticky resetuje nasledujúci deň.
            </p>
          </div>
        </div>

        {/* Promo Settings Section */}
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
              {imageBase64 && imageBase64.length > 0 ? (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Náhľad obrázku:</p>
                  <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <img
                      src={`data:image/*;base64,${imageBase64}`}
                    alt="Preview"
                      className="max-w-full max-h-64 rounded-lg"
                      style={{ display: 'block' }}
                      onError={(e) => {
                        console.error("Image load error");
                        console.error("Image base64 length:", imageBase64?.length);
                        console.error("First 100 chars:", imageBase64?.substring(0, 100));
                      }}
                      onLoad={() => {
                        console.log("Image loaded successfully, length:", imageBase64?.length);
                      }}
                  />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageBase64(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Odstrániť obrázok
                  </button>
                </div>
              ) : !loading ? (
                <p className="text-sm text-gray-400 mt-2">Žiadny obrázok nahraný</p>
              ) : null}
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
