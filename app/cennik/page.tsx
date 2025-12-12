import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";

export const metadata: Metadata = generatePageMetadata({
  title: "Cenník | Veterinárne služby a ceny",
  description: "Orientačný cenník veterinárnych služieb. Vakcinácia, chirurgické zákroky, diagnostika, stomatológia a ďalšie služby.",
  path: urls.pricing,
});

const pricingCategories = [
  {
    title: "Základné úkony",
    items: [
      { name: "Konzultácia", price: "8€" },
      { name: "Výjazd príplatok", price: "30€" },
      { name: "Pohotovostný príplatok", price: "60€" },
    ],
  },
  {
    title: "Vakcinácia",
    items: [
      { name: "Vakcinácia – infekčné ochorenia", price: "30€" },
      { name: "Vakcinácia – infekčné + besnota", price: "35€" },
      { name: "Vakcinácia – len besnota", price: "28€" },
      { name: "Vakcinácia mačka – infekčné ochorenia", price: "28/32€" },
      { name: "Vakcinácia mačka – infekčné + besnota", price: "35/42€" },
      { name: "Vakcinácia kotercový kašeľ", price: "35€" },
    ],
  },
  {
    title: "Dokumenty a identifikácia",
    items: [
      { name: "Vystavenie PetPasu", price: "23€" },
      { name: "Čipovanie", price: "23€" },
    ],
  },
  {
    title: "Diagnostika",
    items: [
      { name: "USG vyšetrenie", price: "40€" },
      { name: "RTG vyšetrenie", price: "30€ (+5€ každý ďalší)" },
      { name: "Vyšetrenie krvi pes/mačka", price: "od 110€" },
      { name: "Progesterón – fenka", price: "35€" },
    ],
  },
  {
    title: "Chirurgia - Psy",
    items: [
      { name: "Sterilizácia fenka", price: "190–340€" },
      { name: "Kastrácia psa", price: "130–310€" },
    ],
  },
  {
    title: "Chirurgia - Mačky",
    items: [
      { name: "Sterilizácia mačka", price: "70€" },
      { name: "Kastrácia kocúr", price: "50€" },
    ],
  },
  {
    title: "Stomatológia",
    items: [
      { name: "Zubný kameň pes", price: "80–140€" },
      { name: "Zubný kameň mačka", price: "70€" },
    ],
  },
  {
    title: "Hospitalizácia",
    items: [
      { name: "Hospitalizácia 24h", price: "37€" },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cenník", href: urls.pricing }]} />
      
      <section className="section-padding bg-white" aria-labelledby="pricing-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">💰 Cenník</span>
            <h1
              id="pricing-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Orientačný cenník služieb
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Ceny sú orientačné a môžu sa líšiť v závislosti od konkrétneho prípadu.
              Pre presnú cenovú ponuku nás kontaktujte.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {pricingCategories.map((category, index) => (
              <div key={index} className="card-friendly overflow-hidden">
                <div className="bg-[#3C8C80] px-6 py-4">
                  <h2 className="font-semibold text-lg text-white">
                    {category.title}
                  </h2>
                </div>
                <div className="divide-y divide-[#E4E4E4]">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="px-6 py-4 flex justify-between items-center"
                    >
                      <span className="text-[#2A2A2A]">{item.name}</span>
                      <span className="font-semibold text-[#3C8C80]">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#F2F7F5] rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="font-semibold text-lg text-[#2A2A2A] mb-4">
              Dôležité informácie
            </h2>
            <ul className="space-y-2 text-[#5C5C5C] text-sm">
              <li>• Ceny sú orientačné a môžu sa líšiť podľa konkrétneho prípadu</li>
              <li>• Pri zložitejších zákrokoch vám poskytneme individuálnu cenovú ponuku</li>
              <li>• Prijímame platby v hotovosti aj kartou</li>
              <li>• Pre viac informácií nás neváhajte kontaktovať</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-primary text-center"
              >
                📞 {siteConfig.phone}
              </a>
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center"
              >
                📅 Objednať sa online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
