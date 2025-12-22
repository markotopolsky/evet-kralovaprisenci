import { NextRequest, NextResponse } from "next/server";
import { createBlog, getAllBlogs, SlugConflictError } from "@/lib/queries/blog";

function validateString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid '${field}' field`);
  }
}

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    const list = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      createdAt: blog.createdAt,
      published: blog.published,
    }));

    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    validateString(body.title, "title");
    validateString(body.content, "content");
    validateString(body.author, "author");

    if (body.slug !== undefined && typeof body.slug !== "string") {
      return NextResponse.json({ error: "Invalid 'slug' field" }, { status: 400 });
    }

    if (body.imageBase64 !== undefined && body.imageBase64 !== null && typeof body.imageBase64 !== "string") {
      return NextResponse.json({ error: "Invalid 'imageBase64' field" }, { status: 400 });
    }

    if (body.published !== undefined && typeof body.published !== "boolean") {
      return NextResponse.json({ error: "Invalid 'published' field" }, { status: 400 });
    }

    const created = await createBlog({
      title: body.title,
      slug: body.slug,
      content: body.content,
      imageBase64: body.imageBase64 ?? null,
      author: body.author,
      published: body.published ?? false,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof SlugConflictError) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}





