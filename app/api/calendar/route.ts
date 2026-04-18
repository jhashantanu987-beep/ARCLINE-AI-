import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/calendar?date=2024-04-20
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const date = new Date(dateStr);
  date.setUTCHours(0, 0, 0, 0);

  try {
    let availability = await prisma.availability.findUnique({
      where: { date },
    });

    // Auto-generate availability for the date if it doesn't exist
    if (!availability) {
      const defaultSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30",
      ];
      availability = await prisma.availability.create({
        data: { date, slots: defaultSlots },
      });
    }

    return NextResponse.json({ slots: availability.slots as string[] });
  } catch (error) {
    console.error("CALENDAR_API_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
