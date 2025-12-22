import { ObjectId } from "mongodb";

export interface Aktualita {
  _id?: ObjectId;
  title: string;
  slug: string;
  content: string;
  imageBase64: string | null;
  author: string;
  // Optional: category for grouping (e.g., "warning", "disease", "info")
  category?: "warning" | "disease" | "info" | "general";
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export type AktualitaDto = Omit<Aktualita, "_id"> & { 
  _id: string;
  excerpt: string;
};


