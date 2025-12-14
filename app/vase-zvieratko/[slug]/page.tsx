import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlesList } from "@/components/animals/ArticlesList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllAnimalTypes, getAnimalTypeBySlug, getArticlesByAnimalType } from "@/lib/queries/animals";
import { generatePageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const animalTypes = await getAllAnimalTypes();
  return animalTypes.map((animal) => ({
    slug: animal.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const animalType = await getAnimalTypeBySlug(slug);
  
  if (!animalType) {
    return generatePageMetadata({
      title: "Typ zvieratka nenájdený",
      description: "Tento typ zvieratka neexistuje.",
      path: `/vase-zvieratko/${slug}`,
    });
  }

  return generatePageMetadata({
    title: `${animalType.name} | Rady a tipy pre starostlivosť`,
    description: animalType.description,
    path: `/vase-zvieratko/${slug}`,
  });
}

export default async function AnimalTypePage({ params }: PageProps) {
  const { slug } = await params;
  const animalType = await getAnimalTypeBySlug(slug);

  if (!animalType) {
    notFound();
  }

  const articles = await getArticlesByAnimalType(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Vaše zvieratko", href: "/vase-zvieratko" },
          { name: animalType.name, href: `/vase-zvieratko/${slug}` },
        ]}
      />
      
      <section className="section-padding bg-white" aria-labelledby="animal-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <h1
              id="animal-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              {animalType.name}
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              {animalType.description}
            </p>
          </div>

          <ArticlesList articles={articles} animalSlug={slug} />
        </div>
      </section>
    </>
  );
}






