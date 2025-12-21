"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { siteConfig } from "@/config/site";
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
  Calendar,
  Phone,
  LucideIcon
} from "lucide-react";

interface ServiceDetailProps {
  service: Service;
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

export function ServiceDetail({ service }: ServiceDetailProps) {
  const IconComponent = service.icon ? serviceIcons[service.icon] : null;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-[#F2F7F5] rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          {IconComponent && (
            <div className="w-16 h-16 bg-[#3C8C80]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-8 h-8 text-[#3C8C80]" />
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A]">
            {service.title}
          </h1>
        </div>
        <p className="text-xl text-[#5C5C5C]">
          {service.shortDescription}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
          {service.fullDescription}
        </p>
      </div>

      {(service.price || service.duration) && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {service.price && (
            <div className="bg-[#E6B84C]/10 border border-[#E6B84C] rounded-xl p-6">
              <h2 className="font-semibold text-lg text-[#2A2A2A] mb-2">
                Orientačná cena
              </h2>
              <p className="text-2xl font-bold text-[#3C8C80]">
                {service.price}
              </p>
              <p className="text-sm text-[#5C5C5C] mt-2">
                Presná cena závisí od konkrétneho prípadu.
              </p>
            </div>
          )}
          {service.duration && service.duration !== "-" && (
            <div className="bg-[#3C8C80]/10 border border-[#3C8C80]/30 rounded-xl p-6">
              <h2 className="font-semibold text-lg text-[#2A2A2A] mb-2">
                Trvanie
              </h2>
              <p className="text-2xl font-bold text-[#3C8C80]">
                {service.duration}
              </p>
              <p className="text-sm text-[#5C5C5C] mt-2">
                Čas sa môže líšiť podľa náročnosti.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-center inline-flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Objednať sa
        </Link>
        <a
          href={`tel:${siteConfig.phone}`}
          className="btn-secondary text-center inline-flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          {siteConfig.phone}
        </a>
      </div>
    </article>
  );
}
