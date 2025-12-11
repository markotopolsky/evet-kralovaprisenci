"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export function BasicInfoCards() {
  const { t } = useLanguage();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Opening Hours Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <span className="text-4xl block mb-4">🕐</span>
          <h3 className="font-semibold text-lg text-[#2A2A2A] mb-4">
            {t.cards.openingHours}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="bg-[#F2F7F5] p-3 rounded-lg">
              <span className="block font-medium text-[#3C8C80] uppercase text-xs mb-1">
                {t.hours.monWed}
              </span>
              <span className="text-[#2A2A2A]">9:00 - 17:00</span>
            </div>
            <div className="bg-[#F2F7F5] p-3 rounded-lg">
              <span className="block font-medium text-[#3C8C80] uppercase text-xs mb-1">
                {t.hours.tueThuFri}
              </span>
              <span className="text-[#2A2A2A]">13:00 - 20:00</span>
            </div>
            <div className="bg-[#F2F7F5] p-3 rounded-lg">
              <span className="block font-medium text-[#3C8C80] uppercase text-xs mb-1">
                {t.hours.saturday}
              </span>
              <span className="text-[#2A2A2A]">11:00 - 15:00</span>
            </div>
            <div className="bg-[#F2F7F5] p-3 rounded-lg">
              <span className="block font-medium text-[#3C8C80] uppercase text-xs mb-1">
                {t.hours.sunday}
              </span>
              <span className="text-[#2A2A2A]">18:00 - 20:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <span className="text-4xl block mb-4">📍</span>
          <h3 className="font-semibold text-lg text-[#2A2A2A] mb-4">
            {t.cards.findUs}
          </h3>
          <address className="not-italic text-sm text-[#5C5C5C] mb-4">
            <p className="font-medium text-[#2A2A2A]">{siteConfig.address.street}</p>
            <p>{siteConfig.address.city}</p>
            <p>{siteConfig.address.country}</p>
          </address>
          <a
            href={siteConfig.googleMaps.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#3C8C80] font-medium hover:underline"
          >
            {t.cards.showOnMap} →
          </a>
        </div>
      </div>

      {/* Contact Card */}
      <div className="card-friendly p-6">
        <div className="text-center">
          <span className="text-4xl block mb-4">📞</span>
          <h3 className="font-semibold text-lg text-[#2A2A2A] mb-4">
            {t.cards.contact}
          </h3>
          <div className="space-y-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="block text-xl font-bold text-[#3C8C80] hover:underline"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm text-[#5C5C5C] hover:text-[#3C8C80]"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Online Booking Card */}
      <div className="card-friendly p-6 bg-[#3C8C80] text-white">
        <div className="text-center">
          <span className="text-4xl block mb-4">📅</span>
          <h3 className="font-semibold text-lg mb-4">
            {t.cards.onlineBooking}
          </h3>
          <p className="text-sm text-white/80 mb-6">
            {t.cards.bookComfortably}
          </p>
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-white text-[#3C8C80] rounded-lg font-semibold hover:bg-[#F2F7F5] transition-colors"
          >
            {t.nav.book}
          </Link>
        </div>
      </div>
    </div>
  );
}



