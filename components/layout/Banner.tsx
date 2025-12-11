"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, X } from "lucide-react";
import { Promo } from "@/lib/models/Promo";
import { PromoModal } from "@/components/promo";
import { siteConfig, getTodayOpeningHours } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const PROMO_SEEN_KEY = "promo_seen";

const dayNamesDE: Record<string, string> = {
  "Pondelok": "Montag",
  "Utorok": "Dienstag",
  "Streda": "Mittwoch",
  "Štvrtok": "Donnerstag",
  "Piatok": "Freitag",
  "Sobota": "Samstag",
  "Nedeľa": "Sonntag",
};

export function Banner() {
  const { t, language } = useLanguage();
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [todayInfo, setTodayInfo] = useState<{
    day: string;
    hours: string;
    isOpen: boolean;
  } | null>(null);

  // Fetch promo from API on mount
  useEffect(() => {
    async function fetchPromo() {
      try {
        const res = await fetch("/api/admin/promo");
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched promo:", data);
          
          if (data.enabled && data.barText) {
            setPromo(data);
            
            // Check if user has seen the promo
            const seen = localStorage.getItem(PROMO_SEEN_KEY);
            console.log("Promo seen:", seen);
            
            if (!seen) {
              // First visit - show modal automatically
              console.log("Opening promo modal");
              setShowPromoModal(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching promo:", error);
      }
    }
    
    fetchPromo();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTodayInfo(getTodayOpeningHours());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle closing the modal - save to localStorage
  function handleCloseModal() {
    localStorage.setItem(PROMO_SEEN_KEY, "true");
    setShowPromoModal(false);
  }

  // Show promo text if promo is enabled and not dismissed
  const showPromo = promo && promo.enabled && promo.barText && !promoDismissed;

  return (
    <>
      <div className="bg-[#3C8C80] text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stacked on mobile/tablet, side by side on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-3 text-sm font-medium">
            
            {/* Top row on mobile: Phone + Location */}
            <div className="flex items-center justify-center lg:justify-end gap-4 sm:gap-5 order-1 lg:order-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.phone}</span>
              </a>
              <span className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{siteConfig.address.street}, </span>
                {siteConfig.address.city}
              </span>
            </div>

            {/* Bottom row on mobile: Promo + Open status */}
            <div className="flex items-center justify-center lg:justify-start gap-3 order-2 lg:order-1">
              {/* Promo text - clickable to open modal */}
              {showPromo && (
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="flex items-center gap-2 px-2.5 py-0.5 bg-[#E6B84C] text-[#2A2A2A] rounded-full text-xs font-semibold hover:bg-[#d4a43d] transition-colors cursor-pointer"
                >
                  {promo.barText}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setPromoDismissed(true);
                    }}
                    className="hover:opacity-70"
                    aria-label="Zatvoriť"
                  >
                    <X className="w-3 h-3" />
                  </span>
                </button>
              )}

              {/* Open/Closed status */}
              {todayInfo && (
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      todayInfo.isOpen
                        ? "bg-white/20"
                        : "bg-red-500/30"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${todayInfo.isOpen ? "bg-green-300 animate-pulse" : "bg-red-300"}`} />
                    {todayInfo.isOpen ? t.infoBar.open : t.infoBar.closed}
                  </span>
                  <span className="text-white/90 text-xs">
                    {todayInfo.hours}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Promo Modal - auto-shows on first visit */}
      {showPromoModal && promo && (
        <PromoModal promo={promo} onClose={handleCloseModal} />
      )}
    </>
  );
}
