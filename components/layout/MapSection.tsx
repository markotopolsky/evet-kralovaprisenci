"use client";

import { MapEmbed } from "./MapEmbed";
import { useLanguage } from "@/context/LanguageContext";

export function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white" aria-labelledby="location-heading">
      <div className="container-friendly">
        <div className="text-center mb-8">
          <h2
            id="location-heading"
            className="text-3xl font-bold text-[#2A2A2A] mb-4"
          >
            {t.map.title}
          </h2>
          <p className="text-lg text-[#5C5C5C]">
            {t.map.subtitle}
          </p>
        </div>
        <MapEmbed height="400px" />
      </div>
    </section>
  );
}



