import { Metadata } from "next";
import { ServicesList } from "@/components/services/ServicesList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllServices } from "@/lib/queries/services";
import { generatePageMetadata } from "@/lib/seo";
import { urls } from "@/config/urls";

export const metadata: Metadata = generatePageMetadata({
  title: "Veterinárne služby | Kompletná starostlivosť pre vaše zvieratá",
  description: "Ponúkame širokú škálu veterinárnych služieb: interná medicína, krvné vyšetrenia, USG, RTG, chirurgia, dentálna hygiena, hospitalizácia 24H a pohotovosť.",
  path: urls.services,
});

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Služby", href: urls.services }]} />
      
      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">🏥 Naše služby</span>
            <h1
              id="services-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Kompletná veterinárna starostlivosť
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Ponúkame širokú škálu veterinárnych služieb od preventívnych prehliadok
              cez vakcináciu až po špecializované chirurgické zákroky.
            </p>
          </div>

          <ServicesList services={services} />
        </div>
      </section>
    </>
  );
}




