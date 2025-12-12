export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category?: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  readTime?: number;
  createdAt: Date;
  updatedAt: Date;
}




