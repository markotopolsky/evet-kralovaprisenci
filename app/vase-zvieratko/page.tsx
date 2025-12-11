import { Metadata } from "next";
import { AnimalTypesList } from "@/components/animals/AnimalTypesList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllAnimalTypes } from "@/lib/queries/animals";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Vaše zvieratko | Rady a tipy pre starostlivosť",
  description: "Užitočné články a rady pre starostlivosť o psov, mačky, hlodavce a ďalšie domáce miláčiky. Preventívna starostlivosť, výživa a zdravie.",
  path: "/vase-zvieratko",
});

export default async function AnimalsPage() {
  const animalTypes = await getAllAnimalTypes();

  return (
    <>
      <Breadcrumbs items={[{ name: "Vaše zvieratko", href: "/vase-zvieratko" }]} />
      
      <section className="section-padding bg-white" aria-labelledby="animals-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">🐾 Vaše zvieratko</span>
            <h1
              id="animals-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Rady a tipy pre starostlivosť
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Vyberte si typ zvieratka a prečítajte si užitočné články o starostlivosti,
              výžive a zdraví vášho miláčika.
            </p>
          </div>

          <AnimalTypesList animalTypes={animalTypes} />
        </div>
      </section>
    </>
  );
}



