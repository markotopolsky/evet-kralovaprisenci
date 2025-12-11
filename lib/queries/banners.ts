import { Banner, BannerDocument } from "@/lib/models/Banner";
import { getDb } from "@/lib/db";
import { env } from "@/config/env";

// InfoBar type from settings collection
export interface InfoBarSettings {
  enabled: boolean;
  message: string;
  updatedAt?: Date;
}

// Konverzia MongoDB dokumentu na Banner interface
function documentToBanner(doc: BannerDocument): Banner {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    shortTitle: doc.shortTitle,
    description: doc.description,
    imageUrl: doc.imageUrl,
    link: doc.link,
    startDate: new Date(doc.startDate),
    endDate: doc.endDate ? new Date(doc.endDate) : undefined,
    isActive: doc.isActive,
    priority: doc.priority,
  };
}

// Fallback mock data ak nie je DB nakonfigurovaná
const mockBanners: Banner[] = [];

/**
 * Získa infoBar nastavenia z settings kolekcie
 * Toto je jednoduchší systém - jeden text spravovaný cez /admin
 */
export async function getInfoBarSettings(): Promise<InfoBarSettings> {
  if (!env.isDatabaseConfigured()) {
    return { enabled: false, message: "" };
  }

  try {
    const db = await getDb();
    const settings = await db
      .collection("settings")
      .findOne({ _id: "global" });

    if (!settings || !settings.infoBar) {
      return { enabled: false, message: "" };
    }

    return {
      enabled: settings.infoBar.enabled,
      message: settings.infoBar.message,
      updatedAt: settings.infoBar.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching infoBar settings:", error);
    return { enabled: false, message: "" };
  }
}

/**
 * Získa všetky aktívne bannery z MongoDB
 * Filtruje podľa: isActive, startDate <= now, endDate >= now (ak existuje)
 * Zoradené podľa priority (zostupne)
 */
export async function getActiveBanners(): Promise<Banner[]> {
  if (!env.isDatabaseConfigured()) {
    return mockBanners;
  }

  try {
    const db = await getDb();
    const collection = db.collection<BannerDocument>("banners");

    const now = new Date();

    const documents = await collection
      .find({
        isActive: true,
        startDate: { $lte: now },
        $or: [
          { endDate: { $exists: false } },
          { endDate: null },
          { endDate: { $gte: now } },
        ],
      })
      .sort({ priority: -1 })
      .toArray();

    return documents.map(documentToBanner);
  } catch (error) {
    console.error("Error fetching banners from MongoDB:", error);
    return mockBanners;
  }
}

/**
 * Získa všetky bannery (aj neaktívne) - pre admin
 */
export async function getAllBanners(): Promise<Banner[]> {
  if (!env.isDatabaseConfigured()) {
    return mockBanners;
  }

  try {
    const db = await getDb();
    const collection = db.collection<BannerDocument>("banners");

    const documents = await collection
      .find({})
      .sort({ priority: -1, startDate: -1 })
      .toArray();

    return documents.map(documentToBanner);
  } catch (error) {
    console.error("Error fetching all banners:", error);
    return mockBanners;
  }
}

/**
 * Získa jeden banner podľa ID
 */
export async function getBannerById(id: string): Promise<Banner | null> {
  if (!env.isDatabaseConfigured()) {
    return mockBanners.find((b) => b._id === id) || null;
  }

  try {
    const { ObjectId } = await import("mongodb");
    const db = await getDb();
    const collection = db.collection<BannerDocument>("banners");

    const document = await collection.findOne({ _id: new ObjectId(id) });
    return document ? documentToBanner(document) : null;
  } catch (error) {
    console.error("Error fetching banner by ID:", error);
    return null;
  }
}
