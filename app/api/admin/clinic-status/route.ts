import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

interface ClinicStatusData {
  forceClosed: boolean;
  forceClosedDate: string;
  updatedAt?: Date;
}

const STATUS_KEY = "current";

// Always fetch fresh data (no static caching)
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * GET /api/admin/clinic-status
 * Returns the current clinic status
 */
export async function GET() {
  try {
    const db = await getDb();
    const doc = await db
      .collection("clinicStatus")
      .findOne({ statusId: STATUS_KEY });

    const today = getTodayDate();

    // If no doc or the date is old, return default (not force closed)
    if (!doc || doc.forceClosedDate !== today) {
      return NextResponse.json({
        forceClosed: false,
        forceClosedDate: today,
      });
    }

    return NextResponse.json({
      forceClosed: doc.forceClosed ?? false,
      forceClosedDate: doc.forceClosedDate,
      updatedAt: doc.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching clinic status:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic status" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/clinic-status
 * Updates the clinic status (force closed today)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (typeof body.forceClosed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid 'forceClosed' field" },
        { status: 400 }
      );
    }

    const today = getTodayDate();

    const statusData = {
      statusId: STATUS_KEY,
      forceClosed: body.forceClosed,
      forceClosedDate: today,
      updatedAt: new Date(),
    };

    const db = await getDb();
    await db.collection("clinicStatus").updateOne(
      { statusId: STATUS_KEY },
      { $set: statusData },
      { upsert: true }
    );

    return NextResponse.json({
      forceClosed: statusData.forceClosed,
      forceClosedDate: statusData.forceClosedDate,
      updatedAt: statusData.updatedAt,
    });
  } catch (error) {
    console.error("Error updating clinic status:", error);
    return NextResponse.json(
      { error: "Failed to update clinic status" },
      { status: 500 }
    );
  }
}


