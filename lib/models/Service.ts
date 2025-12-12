export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  image?: string;
  price?: string;
  duration?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}




