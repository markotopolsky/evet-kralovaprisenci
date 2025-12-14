import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

interface PromoData {
  enabled: boolean;
  barText: string;
  imageBase64: string | null;
  updatedAt?: Date;
}

const PROMO_KEY = "current";

const defaultPromo: PromoData = {
  enabled: false,
  barText: "",
  imageBase64: null,
};

// Always fetch fresh data (no static caching)
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/admin/promo
 * Returns the current promo settings
 */
export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("promotions");

    // Query handles legacy documents:
    // - promoId field (new)
    // - _id equal to string "current" (old)
    // - _id equal to ObjectId("current") (very old cast)
    const filters = [
      { promoId: PROMO_KEY },
      { _id: PROMO_KEY },
      (() => {
        try {
          return { _id: new ObjectId(PROMO_KEY) };
        } catch {
          return null;
        }
      })(),
    ].filter(Boolean) as Record<string, unknown>[];

    let doc =
      (await collection.findOne({ $or: filters })) ||
      (await collection.findOne({}, { sort: { updatedAt: -1 } }));

    if (!doc) {
      console.log("No promo document found, returning default");
      const defaultResponse = NextResponse.json(defaultPromo);
      defaultResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      defaultResponse.headers.set("Pragma", "no-cache");
      return defaultResponse;
    }

    console.log("Found promo document:", { 
      enabled: doc.enabled, 
      barText: doc.barText,
      hasImage: !!doc.imageBase64 
    });

    const response = NextResponse.json({
      enabled: !!doc.enabled,
      barText: typeof doc.barText === "string" ? doc.barText : "",
      imageBase64: typeof doc.imageBase64 === "string" ? doc.imageBase64 : null,
      updatedAt: doc.updatedAt,
    });
    
    // Prevent caching
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    
    return response;
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
      promoId: PROMO_KEY,
      enabled: !!body.enabled,
      barText: typeof body.barText === "string" ? body.barText : "",
      imageBase64: typeof body.imageBase64 === "string" ? body.imageBase64 : null,
      updatedAt: new Date(),
    };

    console.log("Saving promo:", { 
      enabled: promoData.enabled, 
      barText: promoData.barText,
      hasImage: !!promoData.imageBase64 
    });

    const db = await getDb();
    const collection = db.collection("promotions");

    const filters = [
      { promoId: PROMO_KEY },
      { _id: PROMO_KEY },
      (() => {
        try {
          return { _id: new ObjectId(PROMO_KEY) };
        } catch {
          return null;
        }
      })(),
    ].filter(Boolean) as Record<string, unknown>[];

    await collection.updateOne({ $or: filters }, { $set: promoData }, { upsert: true });

    return NextResponse.json({
      enabled: promoData.enabled,
      barText: promoData.barText,
      imageBase64: promoData.imageBase64,
      updatedAt: promoData.updatedAt,
    });
  } catch (error) {
    console.error("Error updating promo:", error);
    return NextResponse.json(
      { error: "Failed to update promo" },
      { status: 500 }
    );
  }
}
