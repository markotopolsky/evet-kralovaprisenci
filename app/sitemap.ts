import { MetadataRoute } from "next";
import { getAllServices } from "@/lib/queries/services";
import { getAllBlogPosts } from "@/lib/queries/blog";
import { getAllAnimalTypes, getArticlesByAnimalType } from "@/lib/queries/animals";
import { baseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, blogPosts, animalTypes] = await Promise.all([
    getAllServices(),
    getAllBlogPosts(),
    getAllAnimalTypes(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/equipment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vase-zvieratko`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt || service.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Animal type pages and articles
  const animalPages: MetadataRoute.Sitemap = [];
  
  for (const animal of animalTypes) {
    animalPages.push({
      url: `${baseUrl}/vase-zvieratko/${animal.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });

    const articles = await getArticlesByAnimalType(animal.slug);
    for (const article of articles) {
      animalPages.push({
        url: `${baseUrl}/vase-zvieratko/${animal.slug}/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...servicePages, ...blogPages, ...animalPages];
}
