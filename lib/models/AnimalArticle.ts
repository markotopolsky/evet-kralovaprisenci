export interface AnimalArticle {
  _id: string;
  title: string;
  slug: string;
  animalTypeSlug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  tags?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
}




