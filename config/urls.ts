export const urls = {
  home: "/",
  services: "/sluzby",
  service: (slug: string) => `/sluzby/${slug}`,
  about: "/o-nas",
  equipment: "/o-nas/vybavenie",
  gallery: "/o-nas/galeria",
  animals: "/vase-zvieratko",
  animalType: (slug: string) => `/vase-zvieratko/${slug}`,
  animalArticle: (typeSlug: string, articleSlug: string) =>
    `/vase-zvieratko/${typeSlug}/${articleSlug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  promotions: "/akcie",
  contact: "/kontakt",
  pricing: "/cennik",
} as const;






