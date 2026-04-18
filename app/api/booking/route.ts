import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = "force-dynamic";

// POST /api/booking — create a booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, time, name, email, phone, notes } = body;

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bookingDate = new Date(date);
    bookingDate.setUTCHours(0, 0, 0, 0);

    // 1. Fetch availability for that day
    const availability = await prisma.availability.findUnique({
      where: { date: bookingDate },
    });

    if (!availability) {
      return NextResponse.json({ error: "No availability found for this date" }, { status: 400 });
    }

    const currentSlots = availability.slots as string[];

    // 2. Check if slot is still available
    if (!currentSlots.includes(time)) {
      return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 });
    }

    // 3. Get session for userId (optional – works for guests too)
    const session = await getServerSession(authOptions);

    // 4. Create the booking atomically + remove slot
    const [booking] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          date: bookingDate,
          time,
          name,
          email,
          phone: phone || null,
          notes: notes || null,
          status: "booked",
          userId: session?.user?.email
            ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id || null
            : null,
        },
      }),
      prisma.availability.update({
        where: { date: bookingDate },
        data: {
          slots: currentSlots.filter((s) => s !== time),
        },
      }),
    ]);

    // Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: "Arcline AI <onboarding@resend.dev>", // using default resend domain for testing, replace with verified domain in production
        to: email,
        subject: "Booking Confirmation - Arcline AI",
        html: `
          <h1>Booking Confirmation</h1>
          <p>Hi ${name},</p>
          <p>Your appointment has been successfully booked for <strong>${bookingDate.toDateString()}</strong> at <strong>${time}</strong>.</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          <p>Thank you for choosing Arcline AI.</p>
        `,
      });
      console.log("Confirmation email sent to", email);
    } catch (emailError) {
      console.error("FAILED_TO_SEND_EMAIL", emailError);
      // We don't fail the whole request if email fails, just log it
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("BOOKING_POST_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/booking — cancel a booking
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "cancelled") {
      return NextResponse.json({ error: "Booking already cancelled" }, { status: 400 });
    }

    // Restore the slot
    const bookingDate = new Date(booking.date);
    bookingDate.setUTCHours(0, 0, 0, 0);

    const availability = await prisma.availability.findUnique({ where: { date: bookingDate } });

    const updatedSlots = availability
      ? [...(availability.slots as string[]), booking.time].sort()
      : [booking.time];

    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "cancelled" },
      }),
      availability
        ? prisma.availability.update({
            where: { date: bookingDate },
            data: { slots: updatedSlots },
          })
        : prisma.availability.create({
            data: { date: bookingDate, slots: updatedSlots },
          }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BOOKING_DELETE_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/booking?email=x — fetch bookings by email
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: { email, status: "booked" },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ bookings });
}
