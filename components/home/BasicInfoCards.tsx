"use client";

import Link from "next/link";
import { Clock3, MapPin, Phone, CalendarClock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { text } from "@/lib/i18n/translations";
import { OpeningHours } from "@/components/shared";

export function BasicInfoCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Opening Hours Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <Clock3 className="w-10 h-10 mx-auto mb-4 text-primary" aria-hidden />
          <h3 className="font-semibold text-lg text-text mb-4">{text.cards.openingHours}</h3>
          <OpeningHours variant="grid" />
        </div>
      </div>

      {/* Location Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <MapPin className="w-10 h-10 mx-auto mb-4 text-primary" aria-hidden />
          <h3 className="font-semibold text-lg text-text mb-4">{text.cards.findUs}</h3>
          <address className="not-italic text-sm text-text-muted mb-4">
            <p className="font-medium text-text">{siteConfig.address.street}</p>
            <p>{siteConfig.address.city}</p>
            <p>{siteConfig.address.country}</p>
          </address>
          <a
            href={siteConfig.googleMaps.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {text.cards.showOnMap} →
          </a>
        </div>
      </div>

      {/* Contact Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <Phone className="w-10 h-10 mx-auto mb-4 text-primary" aria-hidden />
          <h3 className="font-semibold text-lg text-text mb-4">{text.cards.contact}</h3>
          <div className="space-y-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="block text-xl font-bold text-primary hover:underline"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm text-text-muted hover:text-primary"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Online Booking Card */}
      <div className="card-friendly p-6 bg-primary-light">
        <div className="text-center">
          <CalendarClock className="w-10 h-10 mx-auto mb-4 text-primary" aria-hidden />
          <h3 className="font-semibold text-lg text-text mb-4">{text.cards.onlineBooking}</h3>
          <p className="text-sm text-text-muted mb-6">{text.cards.bookComfortably}</p>
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {text.nav.book}
          </Link>
        </div>
      </div>
    </div>
  );
}
