import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { slugify, truncate } from "@/lib/utils";
import { Blog, BlogDto } from "@/lib/models/Blog";

const COLLECTION = "blogs";

class SlugConflictError extends Error {
  constructor() {
    super("Slug already exists");
    this.name = "SlugConflictError";
  }
}

async function getCollection() {
  const db = await getDb();
  return db.collection<Blog>(COLLECTION);
}

function serializeBlog(doc: Blog): BlogDto {
  return {
    ...doc,
    _id: doc._id?.toString() ?? "",
    excerpt: truncate(doc.content, 160),
  };
}

export interface CreateBlogInput {
  title: string;
  slug?: string;
  content: string;
  imageBase64?: string | null;
  author: string;
  published?: boolean;
}

export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  content?: string;
  imageBase64?: string | null;
  author?: string;
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

export async function getAllBlogs(): Promise<BlogDto[]> {
  const col = await getCollection();
  const blogs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return blogs.map(serializeBlog);
}

export async function getPublishedBlogs(limit?: number): Promise<BlogDto[]> {
  const col = await getCollection();
  let cursor = col
    .find({ published: true })
    .sort({ createdAt: -1 });

  if (limit) {
    cursor = cursor.limit(limit);
  }

  const blogs = await cursor.toArray();
  return blogs.map(serializeBlog);
}

export async function getBlogBySlug(slug: string, publishedOnly = false): Promise<BlogDto | null> {
  const col = await getCollection();
  const blog = await col.findOne({
    slug,
    ...(publishedOnly ? { published: true } : {}),
  });
  return blog ? serializeBlog(blog) : null;
}

export async function getBlogById(id: string): Promise<BlogDto | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await getCollection();
  const blog = await col.findOne({ _id: new ObjectId(id) });
  return blog ? serializeBlog(blog) : null;
}

export async function createBlog(input: CreateBlogInput): Promise<BlogDto> {
  const col = await getCollection();
  const now = new Date();
  const generatedSlug = slugify(input.slug || input.title);

  await ensureUniqueSlug(generatedSlug);

  const newBlog: Blog = {
    title: input.title,
    slug: generatedSlug,
    content: input.content,
    imageBase64: input.imageBase64 ?? null,
    author: input.author,
    createdAt: now,
    updatedAt: now,
    published: input.published ?? false,
  };

  const result = await col.insertOne(newBlog);
  return serializeBlog({ ...newBlog, _id: result.insertedId });
}

export async function updateBlog(id: string, updates: UpdateBlogInput): Promise<BlogDto | null> {
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

  const setData: Partial<Blog> = {
    updatedAt: new Date(),
    slug: nextSlug,
  };

  if (updates.title !== undefined) setData.title = updates.title;
  if (updates.content !== undefined) setData.content = updates.content;
  if (updates.imageBase64 !== undefined) setData.imageBase64 = updates.imageBase64;
  if (updates.author !== undefined) setData.author = updates.author;
  if (updates.published !== undefined) setData.published = updates.published;

  await col.updateOne(
    { _id: objectId },
    { $set: setData }
  );

  const updated = await col.findOne({ _id: objectId });
  return updated ? serializeBlog(updated) : null;
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// Public blog page helpers - return only published blogs
export async function getAllBlogPosts(): Promise<BlogDto[]> {
  return getPublishedBlogs();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogDto | null> {
  return getBlogBySlug(slug, true);
}

export async function getRecentBlogPosts(limit: number): Promise<BlogDto[]> {
  return getPublishedBlogs(limit);
}

export { SlugConflictError };