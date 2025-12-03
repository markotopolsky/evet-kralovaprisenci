"use client";

import Link from "next/link";
import { Phone, Calendar, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#f8f8f6] overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="badge mb-6">
              🐾 {t.hero.badge}
            </span>
            
            <h1 
              id="hero-heading" 
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#2A2A2A] mb-6 leading-[1.1]"
            >
              {t.hero.title}{" "}
              <span className="text-[#3C8C80]">{t.hero.titleHighlight}</span>{" "}
              {t.hero.titleEnd}
            </h1>
            
            <p className="text-lg sm:text-xl text-[#5C5C5C] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Vytvárame hlbšie, starostlivé spojenie medzi vami a vaším miláčikom.
              Profesionálna veterinárna starostlivosť s individuálnym prístupom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3C8C80] text-white rounded-lg font-semibold text-base hover:bg-[#2d6b62] transition-colors"
              >
                <Calendar className="w-5 h-5" />
                {t.hero.bookAppointment}
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#3C8C80] text-[#3C8C80] rounded-lg font-semibold text-base hover:bg-[#3C8C80]/5 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.phone}
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-[#5C5C5C]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#3C8C80]" />
                {t.hero.modernEquipment}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#3C8C80]" />
                {t.hero.experiencedTeam}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#3C8C80]" />
                {t.hero.individualCare}
              </div>
            </div>
          </div>
          
          {/* Simplified visual - no heavy images */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-[#3C8C80]/10 rounded-full transform -translate-x-4 translate-y-4" />
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg p-6 border border-[#e8e6e1]">
                <div className="aspect-square bg-[#f8f8f6] rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-8xl block mb-4" role="img" aria-label="Pes">🐕</span>
                    <span className="text-6xl block" role="img" aria-label="Mačka">🐈</span>
                  </div>
                </div>
              </div>
              
              {/* Stats badges */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-[#e8e6e1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E6B84C]/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#2A2A2A] text-sm">4.9/5</p>
                    <p className="text-xs text-[#5C5C5C]">127+ recenzií</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-[#e8e6e1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3C8C80]/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏥</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#2A2A2A] text-sm">15+ rokov</p>
                    <p className="text-xs text-[#5C5C5C]">skúseností</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
