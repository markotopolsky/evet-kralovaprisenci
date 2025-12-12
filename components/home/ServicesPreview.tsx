"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { urls } from "@/config/urls";
import {
  Stethoscope,
  Droplet,
  Waves,
  Bone,
  Bandage,
  Dog,
  Smile,
  Sun,
  Hospital,
  Ambulance,
  ShoppingBag,
  MessageCircle,
  LucideIcon,
} from "lucide-react";

interface ServicesPreviewProps {
  services: Service[];
}

const serviceIcons: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  droplet: Droplet,
  waves: Waves,
  bone: Bone,
  bandage: Bandage,
  dog: Dog,
  smile: Smile,
  sun: Sun,
  hospital: Hospital,
  ambulance: Ambulance,
  "shopping-bag": ShoppingBag,
  "message-circle": MessageCircle,
};

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="section-padding bg-[#F2F7F5]" aria-labelledby="services-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4">🏥 Naše služby</span>
          <h2
            id="services-preview-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            Kompletná veterinárna starostlivosť
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            Rovnaké služby ako v sekcii Služby – vždy aktuálne a prehľadne.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.slice(0, 9).map((service) => {
            const IconComponent = service.icon ? serviceIcons[service.icon] : null;

            return (
              <Link
                key={service._id}
                href={urls.service(service.slug)}
                className="card-friendly p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#3C8C80]/20 transition-colors">
                    {IconComponent ? (
                      <IconComponent className="w-7 h-7 text-[#3C8C80]" />
                    ) : (
                      <span className="text-2xl">🐾</span>
                    )}
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
            );
          })}
        </div>

        <div className="text-center">
          <Link href={urls.services} className="btn-primary">
            Zobraziť všetky služby →
          </Link>
        </div>
      </div>
    </section>
  );
}
