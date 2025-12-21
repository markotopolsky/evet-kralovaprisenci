"use client";

import { MapEmbed } from "./MapEmbed";
import { text } from "@/lib/i18n/translations";

export function MapSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="location-heading">
      <div className="container-friendly">
        <div className="text-center mb-8">
          <h2 id="location-heading" className="text-3xl font-bold text-text mb-4">
            {text.map.title}
          </h2>
          <p className="text-lg text-text-muted">{text.map.subtitle}</p>
        </div>
        <MapEmbed height="400px" />
      </div>
    </section>
  );
}
