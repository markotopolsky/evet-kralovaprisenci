import { NextRequest, NextResponse } from "next/server";
import { deleteBlog, getBlogById, SlugConflictError, updateBlog } from "@/lib/queries/blog";

type RouteContext = { params: Promise<{ id: string }> };

function invalidIdResponse() {
  return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  const blog = await getBlogById(id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return updateHandler(request, id);
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return updateHandler(request, id);
}

async function updateHandler(request: NextRequest, id: string) {
  if (!id) return invalidIdResponse();

  try {
    const body = await request.json();
    const updated = await updateBlog(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof SlugConflictError) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  if (!id) return invalidIdResponse();

  try {
    const deleted = await deleteBlog(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

