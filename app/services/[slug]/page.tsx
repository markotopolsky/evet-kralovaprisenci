import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrevNextNav } from "@/components/ui/PrevNextNav";
import { getAllServices, getServiceBySlug, getAdjacentServices } from "@/lib/queries/services";
import { generatePageMetadata, generateServiceSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return generatePageMetadata({
      title: "Služba nenájdená",
      description: "Táto služba neexistuje.",
      path: `/services/${slug}`,
    });
  }

  return generatePageMetadata({
    title: `${service.title} | Veterinárne služby`,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const [service, adjacent] = await Promise.all([
    getServiceBySlug(slug),
    getAdjacentServices(slug),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={generateServiceSchema({
        name: service.title,
        description: service.shortDescription,
        slug: service.slug,
        price: service.price,
      })} />
      <Breadcrumbs
        items={[
          { name: "Služby", href: "/services" },
          { name: service.title, href: `/services/${slug}` },
        ]}
      />
      
      <section className="section-padding bg-white">
        <div className="container-friendly">
          <ServiceDetail service={service} />
          
          <PrevNextNav
            prev={adjacent.prev ? {
              title: adjacent.prev.title,
              slug: adjacent.prev.slug,
              href: `/services/${adjacent.prev.slug}`,
            } : null}
            next={adjacent.next ? {
              title: adjacent.next.title,
              slug: adjacent.next.slug,
              href: `/services/${adjacent.next.slug}`,
            } : null}
            backLink={{
              href: "/services",
              label: "Späť na všetky služby",
            }}
          />
        </div>
      </section>
    </>
  );
}

