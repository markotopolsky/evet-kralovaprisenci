"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { useLanguage } from "@/context/LanguageContext";

interface ServicesListProps {
  services: Service[];
}

const serviceIcons: Record<string, string> = {
  "preventivne-prehliadky": "🩺",
  "vakcinacia": "💉",
  "chirurgia": "🏥",
  "stomatologia": "🦷",
  "diagnostika": "🔬",
  "laboratorium": "🧪",
  default: "🐾",
};

export function ServicesList({ services }: ServicesListProps) {
  const { language } = useLanguage();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link
          key={service._id}
          href={`/services/${service.slug}`}
          className="card-friendly p-6 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#3C8C80]/20 transition-colors">
              <span className="text-3xl">
                {serviceIcons[service.slug] || serviceIcons.default}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors">
                {service.title}
              </h2>
              <p className="text-sm text-[#5C5C5C] line-clamp-3">
                {service.shortDescription}
              </p>
              <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
                {language === "sk" ? "Viac informácií" : "Mehr Informationen"} →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

