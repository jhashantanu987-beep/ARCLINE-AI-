import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Send Welcome Email
    await sendWelcomeEmail(email, name);

    return NextResponse.json(user);
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
