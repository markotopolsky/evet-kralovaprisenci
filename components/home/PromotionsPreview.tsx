"use client";

import Link from "next/link";
import { Promotion } from "@/lib/models/Promotion";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

interface PromotionsPreviewProps {
  promotions: Promotion[];
}

export function PromotionsPreview({ promotions }: PromotionsPreviewProps) {
  const { language } = useLanguage();

  if (!promotions.length) return null;

  return (
    <section className="section-padding bg-[#E6B84C]/10" aria-labelledby="promotions-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge bg-[#E6B84C]/20 text-[#2A2A2A] mb-4">
            🎁 {language === "sk" ? "Akcie a zľavy" : "Aktionen und Rabatte"}
          </span>
          <h2
            id="promotions-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {language === "sk" ? "Aktuálne akcie" : "Aktuelle Aktionen"}
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            {language === "sk"
              ? "Využite naše špeciálne ponuky a ušetrite na veterinárnej starostlivosti."
              : "Nutzen Sie unsere Sonderangebote und sparen Sie bei der tierärztlichen Versorgung."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {promotions.slice(0, 3).map((promo) => (
            <div
              key={promo._id}
              className="card-friendly p-6 border-2 border-[#E6B84C]"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">🎁</span>
                {promo.discount && (
                  <span className="px-3 py-1 bg-[#E6B84C] text-[#2A2A2A] rounded-full text-sm font-bold">
                    -{promo.discount}%
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2">
                {promo.title}
              </h3>
              <p className="text-sm text-[#5C5C5C] mb-4">
                {promo.description}
              </p>
              {promo.endDate && (
                <p className="text-xs text-[#5C5C5C]">
                  {language === "sk" ? "Platí do" : "Gültig bis"}: {formatDate(promo.endDate, language)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/promotions" className="btn-accent">
            {language === "sk" ? "Všetky akcie" : "Alle Aktionen"} →
          </Link>
        </div>
      </div>
    </section>
  );
}



