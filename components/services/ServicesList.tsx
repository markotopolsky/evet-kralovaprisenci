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
  LucideIcon
} from "lucide-react";

interface ServicesListProps {
  services: Service[];
}

const serviceIcons: Record<string, LucideIcon> = {
  "stethoscope": Stethoscope,
  "droplet": Droplet,
  "waves": Waves,
  "bone": Bone,
  "bandage": Bandage,
  "dog": Dog,
  "smile": Smile,
  "sun": Sun,
  "hospital": Hospital,
  "ambulance": Ambulance,
  "shopping-bag": ShoppingBag,
  "message-circle": MessageCircle,
};

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const IconComponent = service.icon ? serviceIcons[service.icon] : null;
        
        return (
          <Link
            key={service._id}
            href={urls.service(service.slug)}
            className="card-friendly p-6 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#3C8C80]/20 transition-colors">
                {IconComponent ? (
                  <IconComponent className="w-8 h-8 text-[#3C8C80]" />
                ) : (
                  <span className="text-3xl">🐾</span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-[#5C5C5C] line-clamp-3">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
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
