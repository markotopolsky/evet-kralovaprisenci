import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

interface PromoData {
  enabled: boolean;
  barText: string;
  imageBase64: string | null;
  updatedAt?: Date;
}

const defaultPromo: PromoData = {
  enabled: false,
  barText: "",
  imageBase64: null,
};

/**
 * GET /api/admin/promo
 * Returns the current promo settings
 */
export async function GET() {
  try {
    const db = await getDb();
    const doc = await db
      .collection("promotions")
      .findOne({ _id: "current" as unknown as import("mongodb").ObjectId });

    if (!doc) {
      return NextResponse.json(defaultPromo);
    }

    return NextResponse.json({
      enabled: doc.enabled ?? false,
      barText: doc.barText ?? "",
      imageBase64: doc.imageBase64 ?? null,
      updatedAt: doc.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching promo:", error);
    return NextResponse.json(
      { error: "Failed to fetch promo" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/promo
 * Updates the promo settings
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (typeof body.enabled !== "boolean") {
      return NextResponse.json(
        { error: "Invalid 'enabled' field" },
        { status: 400 }
      );
    }
    if (typeof body.barText !== "string") {
      return NextResponse.json(
        { error: "Invalid 'barText' field" },
        { status: 400 }
      );
    }
    if (body.imageBase64 !== null && typeof body.imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Invalid 'imageBase64' field" },
        { status: 400 }
      );
    }

    const promoData = {
      enabled: body.enabled,
      barText: body.barText,
      imageBase64: body.imageBase64,
      updatedAt: new Date(),
    };

    const db = await getDb();
    await db.collection("promotions").updateOne(
      { _id: "current" as unknown as import("mongodb").ObjectId },
      { $set: promoData },
      { upsert: true }
    );

    return NextResponse.json(promoData);
  } catch (error) {
    console.error("Error updating promo:", error);
    return NextResponse.json(
      { error: "Failed to update promo" },
      { status: 500 }
    );
  }
}
