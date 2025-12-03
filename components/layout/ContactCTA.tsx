"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
}

export function ContactCTA({ title, subtitle }: ContactCTAProps) {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-[#3C8C80]" aria-labelledby="cta-heading">
      <div className="container-friendly text-center">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {title || t.contactCta.title}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {subtitle || t.contactCta.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-accent text-center"
            aria-label={`Zavolať na ${siteConfig.phone}`}
          >
            <span>📞</span>
            {siteConfig.phone}
          </a>
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center bg-white text-[#3C8C80] border-white hover:bg-[#F2F7F5]"
          >
            <span>📅</span>
            {t.nav.bookOnline}
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
          <p className="text-white font-semibold mb-2 text-lg">Pohotovosť</p>
          <p className="text-white/90">
            Pre akútne prípady počas našich ordinačných hodín nás kontaktujte na{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-semibold underline hover:text-white"
            >
              {siteConfig.phone}
            </a>
            . Pre nočné pohotovosti odporúčame kontaktovať najbližšiu veterinárnu pohotovosť v Bratislave.
          </p>
        </div>
      </div>
    </section>
  );
}

