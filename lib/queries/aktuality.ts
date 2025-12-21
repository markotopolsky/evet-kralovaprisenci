import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { slugify, truncate } from "@/lib/utils";
import { Aktualita, AktualitaDto } from "@/lib/models/Aktualita";

const COLLECTION = "aktuality";

class SlugConflictError extends Error {
  constructor() {
    super("Slug already exists");
    this.name = "SlugConflictError";
  }
}

async function getCollection() {
  const db = await getDb();
  return db.collection<Aktualita>(COLLECTION);
}

function serializeAktualita(doc: Aktualita): AktualitaDto {
  return {
    ...doc,
    _id: doc._id?.toString() ?? "",
    excerpt: truncate(doc.content, 160),
  };
}

export interface CreateAktualitaInput {
  title: string;
  slug?: string;
  content: string;
  imageBase64?: string | null;
  author: string;
  category?: Aktualita["category"];
  published?: boolean;
}

export interface UpdateAktualitaInput {
  title?: string;
  slug?: string;
  content?: string;
  imageBase64?: string | null;
  author?: string;
  category?: Aktualita["category"];
  published?: boolean;
}

async function ensureUniqueSlug(slug: string, excludeId?: ObjectId) {
  const col = await getCollection();
  const existing = await col.findOne({
    slug,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  });

  if (existing) {
    throw new SlugConflictError();
  }
}

export async function getAllAktuality(): Promise<AktualitaDto[]> {
  const col = await getCollection();
  const aktuality = await col.find({}).sort({ createdAt: -1 }).toArray();
  return aktuality.map(serializeAktualita);
}

export async function getPublishedAktuality(limit?: number): Promise<AktualitaDto[]> {
  const col = await getCollection();
  let cursor = col
    .find({ published: true })
    .sort({ createdAt: -1 });

  if (limit) {
    cursor = cursor.limit(limit);
  }

  const aktuality = await cursor.toArray();
  return aktuality.map(serializeAktualita);
}

export async function getAktualitaBySlug(slug: string, publishedOnly = false): Promise<AktualitaDto | null> {
  const col = await getCollection();
  const aktualita = await col.findOne({
    slug,
    ...(publishedOnly ? { published: true } : {}),
  });
  return aktualita ? serializeAktualita(aktualita) : null;
}

export async function getAktualitaById(id: string): Promise<AktualitaDto | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await getCollection();
  const aktualita = await col.findOne({ _id: new ObjectId(id) });
  return aktualita ? serializeAktualita(aktualita) : null;
}

export async function createAktualita(input: CreateAktualitaInput): Promise<AktualitaDto> {
  const col = await getCollection();
  const now = new Date();
  const generatedSlug = slugify(input.slug || input.title);

  await ensureUniqueSlug(generatedSlug);

  const newAktualita: Aktualita = {
    title: input.title,
    slug: generatedSlug,
    content: input.content,
    imageBase64: input.imageBase64 ?? null,
    author: input.author,
    category: input.category ?? "general",
    createdAt: now,
    updatedAt: now,
    published: input.published ?? false,
  };

  const result = await col.insertOne(newAktualita);
  return serializeAktualita({ ...newAktualita, _id: result.insertedId });
}

export async function updateAktualita(id: string, updates: UpdateAktualitaInput): Promise<AktualitaDto | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await getCollection();
  const objectId = new ObjectId(id);

  const existing = await col.findOne({ _id: objectId });
  if (!existing) {
    return null;
  }

  let nextSlug = existing.slug;
  if (updates.slug !== undefined) {
    nextSlug = slugify(updates.slug || updates.title || existing.title);
  } else if (updates.title) {
    nextSlug = slugify(updates.title);
  }

  if (nextSlug !== existing.slug) {
    await ensureUniqueSlug(nextSlug, objectId);
  }

  const setData: Partial<Aktualita> = {
    updatedAt: new Date(),
    slug: nextSlug,
  };

  if (updates.title !== undefined) setData.title = updates.title;
  if (updates.content !== undefined) setData.content = updates.content;
  if (updates.imageBase64 !== undefined) setData.imageBase64 = updates.imageBase64;
  if (updates.author !== undefined) setData.author = updates.author;
  if (updates.category !== undefined) setData.category = updates.category;
  if (updates.published !== undefined) setData.published = updates.published;

  await col.updateOne(
    { _id: objectId },
    { $set: setData }
  );

  const updated = await col.findOne({ _id: objectId });
  return updated ? serializeAktualita(updated) : null;
}

export async function deleteAktualita(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// Public page helpers - return only published aktuality
export async function getAllPublishedAktuality(): Promise<AktualitaDto[]> {
  return getPublishedAktuality();
}

export async function getAktualitaPostBySlug(slug: string): Promise<AktualitaDto | null> {
  return getAktualitaBySlug(slug, true);
}

export async function getRecentAktuality(limit: number): Promise<AktualitaDto[]> {
  return getPublishedAktuality(limit);
}

export type AdjacentAktuality = {
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
};

export async function getAdjacentAktuality(currentSlug: string): Promise<AdjacentAktuality> {
  const posts = await getPublishedAktuality();
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Posts are sorted by createdAt desc, so "prev" is actually newer (index - 1)
  // and "next" is older (index + 1)
  const prev = currentIndex > 0 
    ? { title: posts[currentIndex - 1].title, slug: posts[currentIndex - 1].slug }
    : null;
  
  const next = currentIndex < posts.length - 1
    ? { title: posts[currentIndex + 1].title, slug: posts[currentIndex + 1].slug }
    : null;

  return { prev, next };
}

export { SlugConflictError as AktualitaSlugConflictError };

