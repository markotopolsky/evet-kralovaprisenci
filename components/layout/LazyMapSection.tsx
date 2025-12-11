"use client";

import dynamic from "next/dynamic";
import { MapSkeleton } from "@/components/ui/Skeleton";
import { useLanguage } from "@/context/LanguageContext";

const MapEmbed = dynamic(
  () => import("./MapEmbed").then((mod) => ({ default: mod.MapEmbed })),
  {
    loading: () => <MapSkeleton />,
    ssr: false,
  }
);

export function LazyMapSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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



