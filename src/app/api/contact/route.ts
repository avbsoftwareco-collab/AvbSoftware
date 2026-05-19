import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message } = body;

    // Option 1: Use Resend (recommended)
    // npm install resend
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'AVB Software <noreply@avbsoftware.com>',
    //   to: ['contact@avbsoftware.com'],
    //   subject: `New inquiry from ${name}`,
    //   html: `...`
    // });

    // Option 2: Log to console (for testing)
    console.log("New Contact Form Submission:", {
      name,
      email,
      phone,
      service,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    // Option 3: Send to EmailJS or any other service

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}