import { getDb } from "@/lib/db";
import { Promo } from "@/lib/models/Promo";

/**
 * Get the current active promo from MongoDB
 * Returns null if promo doesn't exist or is disabled
 */
export async function getCurrentPromo(): Promise<Promo | null> {
  try {
    const db = await getDb();
    const doc = await db
      .collection("promotions")
      .findOne({ _id: "current" as unknown as import("mongodb").ObjectId });

    if (!doc || !doc.enabled) {
      return null;
    }

    return {
      enabled: doc.enabled,
      barText: doc.barText || "",
      imageBase64: doc.imageBase64 || null,
      updatedAt: doc.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching current promo:", error);
    return null;
  }
}
