import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/animals/ArticleDetail";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllAnimalTypes, getAnimalTypeBySlug, getArticlesByAnimalType, getArticleBySlug } from "@/lib/queries/animals";
import { generatePageMetadata, generateArticleSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string; articleSlug: string }>;
}

export async function generateStaticParams() {
  const animalTypes = await getAllAnimalTypes();
  const params: { slug: string; articleSlug: string }[] = [];

  for (const animal of animalTypes) {
    const articles = await getArticlesByAnimalType(animal.slug);
    for (const article of articles) {
      params.push({
        slug: animal.slug,
        articleSlug: article.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, articleSlug } = await params;
  const article = await getArticleBySlug(slug, articleSlug);
  
  if (!article) {
    return generatePageMetadata({
      title: "Článok nenájdený",
      description: "Tento článok neexistuje.",
      path: `/vase-zvieratko/${slug}/${articleSlug}`,
    });
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/vase-zvieratko/${slug}/${articleSlug}`,
  });
}

export default async function AnimalArticlePage({ params }: PageProps) {
  const { slug, articleSlug } = await params;
  const [animalType, article] = await Promise.all([
    getAnimalTypeBySlug(slug),
    getArticleBySlug(slug, articleSlug),
  ]);

  if (!animalType || !article) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.excerpt,
    slug: articleSlug,
    datePublished: new Date(article.createdAt).toISOString(),
    dateModified: new Date(article.updatedAt || article.createdAt).toISOString(),
    authorName: siteConfig.name,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumbs
        items={[
          { name: "Vaše zvieratko", href: "/vase-zvieratko" },
          { name: animalType.name, href: `/vase-zvieratko/${slug}` },
          { name: article.title, href: `/vase-zvieratko/${slug}/${articleSlug}` },
        ]}
      />
      
      <section className="section-padding bg-white">
        <div className="container-friendly">
          <ArticleDetail
            article={article}
            animalSlug={slug}
            animalName={animalType.name}
          />
        </div>
      </section>
    </>
  );
}

