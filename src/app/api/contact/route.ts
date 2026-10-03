import { NextResponse } from "next/server";
import { getServerDb, collection, addDoc } from "@/lib/firebase-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, budget, message, honeypot } = body;

    // Honeypot anti-spam check (if hidden honeypot field has a value, silently reject bot)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // Limit maximum text length to prevent DB abuse
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long (maximum 5,000 characters)." }, { status: 400 });
    }

    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Service unavailable. Please reach out via WhatsApp or Email." }, { status: 503 });
    }

    const messageData = {
      name: name.trim().slice(0, 100),
      company: typeof company === "string" ? company.trim().slice(0, 100) : "",
      email: email.trim().toLowerCase().slice(0, 120),
      phone: typeof phone === "string" ? phone.trim().slice(0, 50) : "",
      projectType: typeof projectType === "string" ? projectType.trim().slice(0, 100) : "",
      budget: typeof budget === "string" ? budget.trim().slice(0, 50) : "",
      message: message.trim().slice(0, 5000),
      read: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "messages"), messageData);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
