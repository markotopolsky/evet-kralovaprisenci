"use client";

import { siteConfig } from "@/config/site";
import { text } from "@/lib/i18n/translations";
import { Phone } from "lucide-react";

interface MapEmbedProps {
  className?: string;
  height?: string;
}

export function MapEmbed({ className = "", height = "400px" }: MapEmbedProps) {
  const simpleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, Slovakia`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-gentle ${className}`}>
      <iframe
        src={simpleMapUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${siteConfig.name} - ${text.map.title}`}
        className="w-full"
      />

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center sm:justify-start">
        <a
          href={siteConfig.googleMaps.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {text.map.navigate}
        </a>
        <a
          href={`tel:${siteConfig.phone}`}
          className="px-4 py-2 bg-white text-text rounded-lg hover:bg-primary-light transition-colors shadow-lg flex items-center gap-2 font-medium"
        >
          <Phone className="w-4 h-4" />
          {text.map.call}
        </a>
      </div>
    </div>
  );
}
