import { Metadata } from "next";
import { AktualitaList } from "@/components/aktuality";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllPublishedAktuality } from "@/lib/queries/aktuality";
import { generatePageMetadata } from "@/lib/seo";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Aktuality | Dôležité informácie a varovania",
  description: "Sledujte najnovšie aktuality, varovania a dôležité oznámenia pre majiteľov zvierat. Informácie o zdraví, prevencii a aktuálnych témach.",
  path: "/vase-zvieratko/aktuality",
});

export default async function AktualityPage() {
  const aktuality = await getAllPublishedAktuality();

  return (
    <>
      <Breadcrumbs 
        items={[
          { name: "Vaše zvieratko", href: "/vase-zvieratko" },
          { name: "Aktuality", href: "/vase-zvieratko/aktuality" }
        ]} 
      />
      
      <section className="section-padding bg-white" aria-labelledby="aktuality-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4 inline-flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> Aktuality
            </span>
            <h1
              id="aktuality-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Aktuality a novinky
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Sledujte najnovšie informácie, varovania a dôležité oznámenia pre majiteľov zvierat.
              Zostaňte informovaní o aktuálnych témach týkajúcich sa zdravia a starostlivosti o zvieratá.
            </p>
          </div>

          <AktualitaList aktuality={aktuality} />
        </div>
      </section>
    </>
  );
}
