import { NextRequest, NextResponse } from "next/server";
import { deleteAktualita, getAktualitaById, AktualitaSlugConflictError, updateAktualita } from "@/lib/queries/aktuality";

type RouteContext = { params: Promise<{ id: string }> };

function invalidIdResponse() {
  return NextResponse.json({ error: "Invalid aktualita id" }, { status: 400 });
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  const aktualita = await getAktualitaById(id);
  if (!aktualita) {
    return NextResponse.json({ error: "Aktualita not found" }, { status: 404 });
  }

  return NextResponse.json(aktualita);
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
    const updated = await updateAktualita(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Aktualita not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof AktualitaSlugConflictError) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    console.error("Error updating aktualita:", error);
    return NextResponse.json({ error: "Failed to update aktualita" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  if (!id) return invalidIdResponse();

  try {
    const deleted = await deleteAktualita(id);
    if (!deleted) {
      return NextResponse.json({ error: "Aktualita not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting aktualita:", error);
    return NextResponse.json({ error: "Failed to delete aktualita" }, { status: 500 });
  }
}

