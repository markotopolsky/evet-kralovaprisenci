import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/animals/ArticleDetail";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrevNextNav } from "@/components/ui/PrevNextNav";
import { getAllAnimalTypes, getAnimalTypeBySlug, getArticlesByAnimalType, getArticleBySlug, getAdjacentArticles } from "@/lib/queries/animals";
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
  const [animalType, article, adjacent] = await Promise.all([
    getAnimalTypeBySlug(slug),
    getArticleBySlug(slug, articleSlug),
    getAdjacentArticles(slug, articleSlug),
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
          
          <PrevNextNav
            prev={adjacent.prev ? {
              title: adjacent.prev.title,
              slug: adjacent.prev.slug,
              href: `/vase-zvieratko/${adjacent.prev.animalTypeSlug}/${adjacent.prev.slug}`,
            } : null}
            next={adjacent.next ? {
              title: adjacent.next.title,
              slug: adjacent.next.slug,
              href: `/vase-zvieratko/${adjacent.next.animalTypeSlug}/${adjacent.next.slug}`,
            } : null}
            backLink={{
              href: `/vase-zvieratko/${slug}`,
              label: `Späť na ${animalType.name}`,
            }}
          />
        </div>
      </section>
    </>
  );
}

