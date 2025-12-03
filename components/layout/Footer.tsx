"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: t.footer.preventiveExams, href: "/services/preventivne-prehliadky" },
      { name: t.footer.vaccination, href: "/services/vakcinacia" },
      { name: t.footer.surgery, href: "/services/chirurgia" },
      { name: t.footer.dentistry, href: "/services/stomatologia" },
    ],
    info: [
      { name: t.nav.about, href: urls.about },
      { name: t.footer.equipment, href: urls.equipment },
      { name: t.nav.blog, href: urls.blog },
      { name: t.nav.promotions, href: urls.promotions },
    ],
  };

  return (
    <footer className="bg-[#2d2d2d] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label={`${siteConfig.shortName} - Domov`}>
              <Image
                src="/logo/logo-small.svg"
                alt=""
                width={44}
                height={44}
                className="h-11 w-auto brightness-0 invert"
                aria-hidden="true"
              />
              <div>
                <span className="font-semibold text-lg block">{siteConfig.shortName}</span>
                <span className="text-sm text-white/60">Veterinárna klinika</span>
              </div>
            </Link>
            <p className="text-white/70 mb-5 leading-relaxed text-sm">
              Vytvárame hlbšie, starostlivé spojenie medzi vami a vaším miláčikom.
            </p>
            <div className="flex gap-3" role="list" aria-label="Sociálne siete">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#3C8C80] transition-colors"
                aria-label="Facebook"
                role="listitem"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.googleMaps.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#3C8C80] transition-colors"
                aria-label="Google recenzie"
                role="listitem"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="font-semibold text-base mb-4">
              {t.footer.services}
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#3C8C80] transition-colors text-sm"
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
              {t.footer.information}
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.info.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#3C8C80] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li role="listitem">
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-[#3C8C80] transition-colors text-sm"
                >
                  Cenník
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-base mb-4">{t.footer.contact}</h2>
            <address className="not-italic text-sm space-y-3 text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/50" />
                <span>
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}
                </span>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 hover:text-[#3C8C80] transition-colors"
                  aria-label={`Zavolať na ${siteConfig.phone}`}
                >
                  <Phone className="w-4 h-4 text-white/50" />
                  <span className="font-medium text-white">{siteConfig.phone}</span>
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-[#3C8C80] transition-colors"
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
                {t.footer.openingHours}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/70 ml-6">
                <span>{t.hours.monWed}:</span><span>9:00 - 17:00</span>
                <span>{t.hours.tueThuFri}:</span><span>13:00 - 20:00</span>
                <span>{t.hours.saturday}:</span><span>11:00 - 15:00</span>
                <span>{t.hours.sunday}:</span><span>18:00 - 20:00</span>
              </div>
            </div>
            
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#3C8C80] text-white rounded-lg font-medium hover:bg-[#2d6b62] transition-colors text-sm"
              aria-label="Objednať sa online - otvorí sa v novom okne"
            >
              <ExternalLink className="w-4 h-4" />
              {t.nav.bookOnline}
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>
            © {currentYear} {siteConfig.name}. {t.footer.allRightsReserved}.
          </p>
        </div>
      </div>
    </footer>
  );
}
