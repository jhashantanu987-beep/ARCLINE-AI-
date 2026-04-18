import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        appointments: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { patient: true }
        },
        calls: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { patient: true }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Manually fetch counts to avoid _count include issues in some Prisma versions
    const [patientCount, appointmentCount, callCount] = await Promise.all([
      prisma.patient.count({ where: { userId: user.id } }),
      prisma.appointment.count({ where: { userId: user.id } }),
      prisma.callLog.count({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({
      ...user,
      _count: {
        patients: patientCount,
        appointments: appointmentCount,
        calls: callCount,
      }
    });
  } catch (error) {
    console.error("DASHBOARD_API_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
