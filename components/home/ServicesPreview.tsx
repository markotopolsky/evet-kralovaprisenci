"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { urls } from "@/config/urls";
import { getServiceIcon, Hospital, PawPrint } from "@/lib/icons";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="section-padding bg-primary-light" aria-labelledby="services-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4 inline-flex items-center gap-2">
            <Hospital className="w-4 h-4" /> Naše služby
          </span>
          <h2
            id="services-preview-heading"
            className="text-3xl sm:text-4xl font-bold text-text mb-4"
          >
            Kompletná veterinárna starostlivosť
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Rovnaké služby ako v sekcii Služby – vždy aktuálne a prehľadne.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.slice(0, 9).map((service) => {
            const IconComponent = getServiceIcon(service.icon);

            return (
              <Link
                key={service._id}
                href={urls.service(service.slug)}
                className="card-friendly p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    {IconComponent ? (
                      <IconComponent className="w-7 h-7 text-primary" />
                    ) : (
                      <PawPrint className="w-7 h-7 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2">
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
