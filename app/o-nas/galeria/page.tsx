import { Metadata } from "next";
import { Gallery } from "@/components/about/Gallery";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { urls } from "@/config/urls";

export const metadata: Metadata = generatePageMetadata({
  title: "Galéria | Prehliadka veterinárnej kliniky",
  description: "Pozrite si fotografie našej veterinárnej kliniky - prijímacia miestnosť, vyšetrovne, operačná sála, čakáreň a hospitalizácia.",
  path: urls.gallery,
});

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "O nás", href: urls.about },
          { name: "Galéria", href: urls.gallery },
        ]}
      />
      
      <section className="section-padding bg-white" aria-labelledby="gallery-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">📷 Galéria</span>
            <h1
              id="gallery-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Prehliadka našej kliniky
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Pozrite si priestory našej modernej veterinárnej kliniky.
            </p>
          </div>

          <Gallery />
        </div>
      </section>
    </>
  );
}




