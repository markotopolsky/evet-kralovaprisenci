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
  const [forceClosed, setForceClosed] = useState(false);

  // Fetch promo and clinic status from API on mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch promo data
        const promoRes = await fetch("/api/admin/promo", { 
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });

        if (promoRes.ok) {
          const data = await promoRes.json();
          console.log("Banner: Fetched promo:", data);
          
          // Set promo if enabled and has text
          if (data.enabled && data.barText) {
            setPromo(data);
            
            // Check if user has seen the promo (for modal auto-open)
            const seen = localStorage.getItem(PROMO_SEEN_KEY);
            console.log("Banner: Promo seen in localStorage:", seen);
            
            if (!seen) {
              console.log("Banner: First visit - opening promo modal");
              setShowPromoModal(true);
            }
          } else {
            console.log("Banner: Promo not enabled or no barText", { enabled: data.enabled, barText: data.barText });
          }
        } else {
          console.error("Banner: Failed to fetch promo, status:", promoRes.status);
        }

        // Fetch clinic status separately
        const clinicStatusRes = await fetch("/api/admin/clinic-status", { 
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });

        if (clinicStatusRes.ok) {
          const clinicData = await clinicStatusRes.json();
          setForceClosed(clinicData.forceClosed);
        }
      } catch (error) {
        console.error("Banner: Error fetching data:", error);
      }
    }
    
    fetchData();
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
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-2 sm:gap-5 order-1 lg:order-2 text-center sm:text-left">
              <a
                href="https://www.google.com/maps/place/Veterin%C3%A1rna+klinika+E-VET/@48.1987493,17.4414865,16.22z/data=!4m6!3m5!1s0x476c9da3aba06909:0x60694c3550d7dbb6!8m2!3d48.1974295!4d17.442523!16s%2Fg%2F11qpxrcs7m?entry=tts&skid=e38c6fc2-10d7-41a2-b0b5-638fddc3e693"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/90 justify-center sm:justify-start"
              >
                <MapPin className="w-4 h-4" />
                <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 hover:text-white/80 transition-colors justify-center sm:justify-start"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.phone}</span>
              </a>
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
              {forceClosed ? (
                // Admin manually closed - show only closed indicator, no hours
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                    {t.infoBar.closed}
                  </span>
                </div>
              ) : todayInfo && (
                // Normal operation - show status with hours
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
