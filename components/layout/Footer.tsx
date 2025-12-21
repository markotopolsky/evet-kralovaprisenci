"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";
import { text } from "@/lib/i18n/translations";
import { OpeningHours } from "@/components/shared";

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: text.footer.preventiveExams, href: "/services/preventivne-prehliadky" },
      { name: text.footer.vaccination, href: "/services/vakcinacia" },
      { name: text.footer.surgery, href: "/services/chirurgia" },
      { name: text.footer.dentistry, href: "/services/stomatologia" },
    ],
    info: [
      { name: text.nav.about, href: urls.about },
      { name: text.footer.equipment, href: urls.equipment },
      { name: text.nav.blog, href: urls.blog },
      { name: text.nav.promotions, href: urls.promotions },
    ],
  };

  return (
    <footer className="bg-bg-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center mb-4"
              aria-label={`${siteConfig.shortName} - Domov`}
            >
              <Image
                src="/logo/logo-small.svg"
                alt=""
                width={200}
                height={200}
                className="h-32 w-auto brightness-0 invert"
                aria-hidden="true"
              />
            </Link>
            <p className="text-white/70 leading-relaxed text-sm">
              {text.footer.tagline}
            </p>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="font-semibold text-base mb-4">
              {text.footer.services}
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information */}
          <nav aria-labelledby="footer-info-heading">
            <h2 id="footer-info-heading" className="font-semibold text-base mb-4">
              {text.footer.information}
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.info.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li role="listitem">
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-primary transition-colors text-sm"
                >
                  Cenník
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-base mb-4">{text.footer.contact}</h2>
            <address className="not-italic text-sm space-y-3 text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/50" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}
                </span>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  aria-label={`Zavolať na ${siteConfig.phone}`}
                >
                  <Phone className="w-4 h-4 text-white/50" />
                  <span className="font-medium text-white">{siteConfig.phone}</span>
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  aria-label={`Napísať email na ${siteConfig.email}`}
                >
                  <Mail className="w-4 h-4 text-white/50" />
                  {siteConfig.email}
                </a>
              </p>
            </address>

            <div className="mt-5 text-sm">
              <p className="flex items-center gap-2 font-medium text-white mb-2">
                <Clock className="w-4 h-4 text-white/50" />
                {text.footer.openingHours}
              </p>
              <div className="ml-6">
                <OpeningHours variant="compact" className="text-white/70" />
              </div>
            </div>

            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm"
              aria-label="Objednať sa online - otvorí sa v novom okne"
            >
              <ExternalLink className="w-4 h-4" />
              {text.nav.bookOnline}
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>
            © {currentYear} {siteConfig.name}. {text.footer.allRightsReserved}.
          </p>
        </div>
      </div>
    </footer>
  );
}
