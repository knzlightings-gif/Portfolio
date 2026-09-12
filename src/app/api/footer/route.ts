import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";

const defaultFooter = {
  ctaHeading1: "Let's build something",
  ctaHeading2: "extraordinary.",
  ctaSubtext: "Ready to streamline your business operations, automate workflows, or launch a custom web platform? Let's discuss your requirements.",
  primaryButtonText: "Schedule a Discovery Call",
  primaryButtonLink: "https://calendly.com",
  secondaryButtonText: "Start a Conversation",
  secondaryButtonLink: "https://wa.me/1234567890",
  tagline: "Building scalable ERP & web solutions that drive business efficiency and growth.",
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Featured Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    whatsapp: "https://wa.me/1234567890",
  },
  copyright: "© 2026 ERP & Web Developer. All rights reserved.",
  statusText: "Open for Q1/Q2 Projects",
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
    return NextResponse.json({ error: error?.message || "Failed to save footer" }, { status: 500 });
  }
}
