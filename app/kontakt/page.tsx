import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";

export const metadata: Metadata = generatePageMetadata({
  title: "Kontakt | Veterinárna klinika Kráľová pri Senci",
  description: `Kontaktujte nás: ${siteConfig.phone}. Adresa: ${siteConfig.address.street}, ${siteConfig.address.city}. Objednajte sa online alebo nás navštívte osobne.`,
  path: urls.contact,
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Kontakt", href: urls.contact }]} />
      
      <section className="section-padding bg-white" aria-labelledby="contact-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">📞 Kontakt</span>
            <h1
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Kontaktujte nás
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Sme tu pre vás a vaše miláčiky. Neváhajte nás kontaktovať.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="card-friendly p-8 mb-6">
                <h2 className="font-semibold text-xl text-[#2A2A2A] mb-6">
                  Kontaktné údaje
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2A2A2A] mb-1">Adresa</h3>
                      <address className="not-italic text-[#5C5C5C]">
                        <p>{siteConfig.address.street}</p>
                        <p>{siteConfig.address.city}</p>
                        <p>{siteConfig.address.country}</p>
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2A2A2A] mb-1">Telefón</h3>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-[#3C8C80] font-semibold text-lg hover:underline"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2A2A2A] mb-1">Email</h3>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-[#3C8C80] hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-friendly p-8">
                <h2 className="font-semibold text-xl text-[#2A2A2A] mb-6">
                  Otváracie hodiny
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E4]">
                    <span className="text-[#5C5C5C]">Pondelok, Streda</span>
                    <span className="font-medium text-[#2A2A2A]">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E4]">
                    <span className="text-[#5C5C5C]">Utorok, Štvrtok, Piatok</span>
                    <span className="font-medium text-[#2A2A2A]">13:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E4]">
                    <span className="text-[#5C5C5C]">Sobota</span>
                    <span className="font-medium text-[#2A2A2A]">11:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#5C5C5C]">Nedeľa</span>
                    <span className="font-medium text-[#2A2A2A]">18:00 - 20:00</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn-primary text-center flex-1"
                >
                  📞 Zavolať
                </a>
                <Link
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center flex-1"
                >
                  📅 Objednať sa
                </Link>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-xl text-[#2A2A2A] mb-4">
                Kde nás nájdete
              </h2>
              <MapEmbed height="500px" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
