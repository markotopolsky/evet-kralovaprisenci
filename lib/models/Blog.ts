import { ObjectId } from "mongodb";

export interface Blog {
  _id?: ObjectId;
  title: string;
  slug: string;
  content: string;
  imageBase64: string | null;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export type BlogDto = Omit<Blog, "_id"> & { 
  _id: string;
  excerpt: string;
};

