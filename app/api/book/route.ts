import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email, day, time } = await req.json();

    if (!email || !day || !time) {
      return new NextResponse("Missing details", { status: 400 });
    }

    // Send Booking Confirmation Email
    await sendBookingNotification(email, { day, time });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BOOKING_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
