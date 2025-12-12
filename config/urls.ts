export const urls = {
  home: "/",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  about: "/about",
  equipment: "/about/equipment",
  gallery: "/about/gallery",
  animals: "/vase-zvieratko",
  animalType: (slug: string) => `/vase-zvieratko/${slug}`,
  animalArticle: (typeSlug: string, articleSlug: string) =>
    `/vase-zvieratko/${typeSlug}/${articleSlug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  promotions: "/promotions",
  contact: "/contact",
  pricing: "/pricing",
} as const;




