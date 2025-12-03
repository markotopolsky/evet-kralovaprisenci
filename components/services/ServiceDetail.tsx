"use client";

import Link from "next/link";
import { Service } from "@/lib/models/Service";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const { language } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-[#F2F7F5] rounded-2xl p-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4">
          {service.title}
        </h1>
        <p className="text-xl text-[#5C5C5C]">
          {service.shortDescription}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
          {service.fullDescription}
        </p>
      </div>

      {service.price && (
        <div className="bg-[#E6B84C]/10 border border-[#E6B84C] rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg text-[#2A2A2A] mb-2">
            {language === "sk" ? "Orientačná cena" : "Richtwert"}
          </h2>
          <p className="text-2xl font-bold text-[#3C8C80]">
            {service.price}
          </p>
          <p className="text-sm text-[#5C5C5C] mt-2">
            {language === "sk"
              ? "Presná cena závisí od konkrétneho prípadu. Kontaktujte nás pre cenovú ponuku."
              : "Der genaue Preis hängt vom jeweiligen Fall ab. Kontaktieren Sie uns für ein Angebot."}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-center"
        >
          📅 {language === "sk" ? "Objednať sa" : "Termin buchen"}
        </Link>
        <a
          href={`tel:${siteConfig.phone}`}
          className="btn-secondary text-center"
        >
          📞 {siteConfig.phone}
        </a>
      </div>
    </article>
  );
}

