import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real production app, you'd save this to a CRM, Database, or send an email via Resend here.
    // For this demo, we simulate a successful lead capture.
    console.log("New Lead Captured:", body);

    return NextResponse.json(
      { message: "Strategy session request received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { message: "Failed to submit request" },
      { status: 500 }
    );
  }
}
