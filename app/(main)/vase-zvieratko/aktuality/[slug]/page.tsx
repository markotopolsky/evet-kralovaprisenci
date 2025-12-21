import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AktualitaDetail } from "@/components/aktuality";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPublishedAktuality, getAktualitaPostBySlug, getAdjacentAktuality } from "@/lib/queries/aktuality";
import { generatePageMetadata, generateArticleSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const aktuality = await getAllPublishedAktuality();
  return aktuality.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const aktualita = await getAktualitaPostBySlug(slug);
  
  if (!aktualita) {
    return generatePageMetadata({
      title: "Aktualita nenájdená",
      description: "Táto aktualita neexistuje.",
      path: `/vase-zvieratko/aktuality/${slug}`,
    });
  }

  return generatePageMetadata({
    title: aktualita.title,
    description: aktualita.excerpt,
    path: `/vase-zvieratko/aktuality/${slug}`,
  });
}

export default async function AktualitaPage({ params }: PageProps) {
  const { slug } = await params;
  const [aktualita, adjacent] = await Promise.all([
    getAktualitaPostBySlug(slug),
    getAdjacentAktuality(slug),
  ]);

  if (!aktualita) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: aktualita.title,
    description: aktualita.excerpt,
    slug: `vase-zvieratko/aktuality/${slug}`,
    datePublished: new Date(aktualita.createdAt).toISOString(),
    dateModified: new Date(aktualita.updatedAt || aktualita.createdAt).toISOString(),
    authorName: aktualita.author || siteConfig.name,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumbs
        items={[
          { name: "Vaše zvieratko", href: "/vase-zvieratko" },
          { name: "Aktuality", href: "/vase-zvieratko/aktuality" },
          { name: aktualita.title, href: `/vase-zvieratko/aktuality/${slug}` },
        ]}
      />
      
      <section className="section-padding bg-white">
        <div className="container-friendly">
          <AktualitaDetail 
            aktualita={aktualita} 
            adjacentAktuality={adjacent}
          />
        </div>
      </section>
    </>
  );
}

