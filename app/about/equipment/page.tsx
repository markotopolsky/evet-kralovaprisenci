import { Metadata } from "next";
import { EquipmentGrid } from "@/components/about/EquipmentGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Vybavenie | Moderná veterinárna klinika",
  description: "Naša klinika je vybavená moderným diagnostickým a liečebným zariadením vrátane digitálneho röntgenu, USG, laboratórneho vybavenia a dentálnej jednotky.",
  path: "/about/equipment",
});

export default function EquipmentPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "O nás", href: "/about" },
          { name: "Vybavenie", href: "/about/equipment" },
        ]}
      />
      
      <section className="section-padding bg-white" aria-labelledby="equipment-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">🏥 Naše vybavenie</span>
            <h1
              id="equipment-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Moderné vybavenie pre najlepšiu starostlivosť
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Disponujeme najmodernejším vybavením pre diagnostiku a liečbu vašich miláčikov.
            </p>
          </div>

          <EquipmentGrid />
        </div>
      </section>
    </>
  );
}



