"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

interface MapEmbedProps {
  className?: string;
  height?: string;
}

export function MapEmbed({ className = "", height = "400px" }: MapEmbedProps) {
  const { t } = useLanguage();

  const simpleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, Slovakia`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-gentle-lg ${className}`}>
      <iframe
        src={simpleMapUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${siteConfig.name} - ${t.map.title}`}
        className="w-full"
      />
      
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center sm:justify-start">
        <a
          href={siteConfig.googleMaps.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#3C8C80] text-white rounded-lg hover:bg-[#2d6b62] transition-colors shadow-gentle-lg flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t.map.navigate}
        </a>
        <a
          href={`tel:${siteConfig.phone}`}
          className="px-4 py-2 bg-white text-[#2A2A2A] rounded-lg hover:bg-[#F2F7F5] transition-colors shadow-gentle-lg flex items-center gap-2 font-medium"
        >
          📞 {t.map.call}
        </a>
      </div>
    </div>
  );
}






