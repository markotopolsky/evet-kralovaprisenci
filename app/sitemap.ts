import { MetadataRoute } from "next";
import { getAllServices } from "@/lib/queries/services";
import { getAllBlogPosts } from "@/lib/queries/blog";
import { getAllAnimalTypes, getArticlesByAnimalType } from "@/lib/queries/animals";
import { baseUrl } from "@/lib/seo";
import { urls } from "@/config/urls";

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
      url: `${baseUrl}${urls.services}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${urls.about}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${urls.equipment}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${urls.gallery}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${urls.blog}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${urls.animals}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${urls.promotions}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${urls.pricing}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${urls.contact}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}${urls.service(service.slug)}`,
    lastModified: new Date(service.updatedAt || service.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}${urls.blogPost(post.slug)}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Animal type pages and articles
  const animalPages: MetadataRoute.Sitemap = [];
  
  for (const animal of animalTypes) {
    animalPages.push({
      url: `${baseUrl}${urls.animalType(animal.slug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });

    const articles = await getArticlesByAnimalType(animal.slug);
    for (const article of articles) {
      animalPages.push({
        url: `${baseUrl}${urls.animalArticle(animal.slug, article.slug)}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...servicePages, ...blogPages, ...animalPages];
}
