"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Calendar } from "lucide-react";
import { siteConfig, getTodayOpeningHours } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const dayNamesDE: Record<string, string> = {
  "Pondelok": "Montag",
  "Utorok": "Dienstag",
  "Streda": "Mittwoch",
  "Štvrtok": "Donnerstag",
  "Piatok": "Freitag",
  "Sobota": "Samstag",
  "Nedeľa": "Sonntag",
};

export function InfoBar() {
  const { t, language } = useLanguage();
  const [todayInfo, setTodayInfo] = useState<{
    day: string;
    hours: string;
    isOpen: boolean;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTodayInfo(getTodayOpeningHours());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getLocalizedDay = (day: string) => {
    if (language === "de") {
      return dayNamesDE[day] || day;
    }
    return day;
  };

  return (
    <div className="bg-[#3C8C80] text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 opacity-80" />
              <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
            </span>
            
            {todayInfo && (
              <span className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                    todayInfo.isOpen
                      ? "bg-white/20 text-white"
                      : "bg-red-500/30 text-white"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${todayInfo.isOpen ? "bg-green-300 animate-pulse" : "bg-red-300"}`} />
                  {todayInfo.isOpen ? t.infoBar.open : t.infoBar.closed}
                </span>
                <span className="hidden sm:inline text-white/90">
                  <Clock className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                  {getLocalizedDay(todayInfo.day)}: <strong>{todayInfo.hours}</strong>
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium"
            >
              <Phone className="w-4 h-4 opacity-80" />
              <span>{siteConfig.phone}</span>
            </a>
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-md font-medium transition-colors"
            >
              <Calendar className="w-4 h-4 opacity-90" />
              <span>{t.nav.book}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
