import { NextRequest, NextResponse } from "next/server";
import { createAktualita, getAllAktuality, AktualitaSlugConflictError } from "@/lib/queries/aktuality";

function validateString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid '${field}' field`);
  }
}

export async function GET() {
  try {
    const aktuality = await getAllAktuality();
    const list = aktuality.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      author: item.author,
      category: item.category,
      createdAt: item.createdAt,
      published: item.published,
    }));

    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching aktuality:", error);
    return NextResponse.json({ error: "Failed to fetch aktuality" }, { status: 500 });
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

    const validCategories = ["warning", "disease", "info", "general"];
    if (body.category !== undefined && !validCategories.includes(body.category)) {
      return NextResponse.json({ error: "Invalid 'category' field" }, { status: 400 });
    }

    const created = await createAktualita({
      title: body.title,
      slug: body.slug,
      content: body.content,
      imageBase64: body.imageBase64 ?? null,
      author: body.author,
      category: body.category ?? "general",
      published: body.published ?? false,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof AktualitaSlugConflictError) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    console.error("Error creating aktualita:", error);
    return NextResponse.json({ error: "Failed to create aktualita" }, { status: 500 });
  }
}

