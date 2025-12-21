"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { text } from "@/lib/i18n/translations";
import { Phone, Calendar } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
}

// =============================================================================
// CONTACT CTA COMPONENT
// =============================================================================

export function ContactCTA({ title, subtitle }: ContactCTAProps) {
  return (
    <section className="section-padding bg-primary" aria-labelledby="cta-heading">
      <div className="container-friendly text-center">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold !text-white mb-4">
          {title || text.contactCta.title}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {subtitle || text.contactCta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-accent text-center inline-flex items-center justify-center gap-2"
            aria-label={`Zavolať na ${siteConfig.phone}`}
          >
            <Phone className="w-5 h-5" />
            {siteConfig.phone}
          </a>
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center bg-white text-primary border-white hover:bg-primary-light inline-flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            {text.nav.bookOnline}
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
          <p className="text-white font-semibold mb-2 text-lg">{text.contactCta.emergency}</p>
          <p className="text-white/90">
            {text.contactCta.emergencyText.split("{phone}")[0]}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-semibold underline hover:text-white"
            >
              {siteConfig.phone}
            </a>
            {text.contactCta.emergencyText.split("{phone}")[1] || ""}
          </p>
        </div>
      </div>
    </section>
  );
}
