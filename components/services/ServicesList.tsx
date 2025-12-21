"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { urls } from "@/config/urls";
import { getServiceIcon, PawPrint } from "@/lib/icons";

interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const IconComponent = getServiceIcon(service.icon);

        return (
          <Link
            key={service._id}
            href={urls.service(service.slug)}
            className="card-friendly p-6 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                {IconComponent ? (
                  <IconComponent className="w-8 h-8 text-primary" />
                ) : (
                  <PawPrint className="w-8 h-8 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-xl text-text mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-text-muted line-clamp-3">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
                  Viac informácií →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
