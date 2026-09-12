import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";

const defaultFooter = {
  ctaHeading1: "Let's build something",
  ctaHeading2: "extraordinary.",
  ctaSubtext: "Ready to transform your business with custom software tailored to your workflow?",
  ctaButtonText: "Start",
  brandDescription:
    "I build practical ERP systems, business web applications and custom digital solutions for small and growing businesses.",
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
  ],
  servicesLinks: [
    { name: "ERP Development", href: "#services" },
    { name: "Web Applications", href: "#services" },
    { name: "Business Automation", href: "#services" },
    { name: "API Integrations", href: "#services" },
  ],
};

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultFooter);

    const snap = await getDoc(doc(db, "settings", "footer"));
    if (snap.exists()) {
      return NextResponse.json(snap.data());
    }
    return NextResponse.json(defaultFooter);
  } catch (error) {
    console.error("Error reading footer from Firestore:", error);
    return NextResponse.json(defaultFooter);
  }
}

export async function POST(request: Request) {
  // Verify admin session cookie
  const cookieHeader = request.headers.get("cookie") || "";
  const hasSession = cookieHeader.includes("admin_session=");
  if (!hasSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const updatedData = await request.json();
    await setDoc(doc(db, "settings", "footer"), updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving footer to Firestore:", error);
    return NextResponse.json({ error: "Failed to save footer settings" }, { status: 500 });
  }
}
