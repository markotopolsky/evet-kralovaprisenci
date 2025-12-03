"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { useLanguage } from "@/context/LanguageContext";

interface ServicesPreviewProps {
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

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-[#F2F7F5]" aria-labelledby="services-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4">
            🏥 {t.services.badge}
          </span>
          <h2
            id="services-preview-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {t.services.title}
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.slice(0, 6).map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="card-friendly p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#3C8C80]/20 transition-colors">
                  <span className="text-2xl">
                    {serviceIcons[service.slug] || serviceIcons.default}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#5C5C5C] line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-primary">
            {t.services.allServices} →
          </Link>
        </div>
      </div>
    </section>
  );
}

