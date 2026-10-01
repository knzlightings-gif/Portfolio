import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";

const defaultPersonalInfo = {
  name: "E For ERP",
  logoUrl: "",
  tagline: "We Build Smart Business Software That Actually Works.",
  description:
    "We build practical ERP systems, business web applications and custom digital solutions for small and growing businesses — combining real-world business understanding with modern development technologies.",
  availability: "Available for Selected Projects",
  roleDescriptor: "ERP Developer • Web Applications • Business Solutions",
  aboutHeadline: "From Business Operations to Software Development",
  contact: {
    email: "hello@example.com",
    whatsapp: "+1234567890",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};

export async function GET() {
  try {
    const headers = { 
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    };
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultPersonalInfo, { headers });

    const snap = await getDoc(doc(db, "settings", "personal-info"));
    if (snap.exists()) {
      return NextResponse.json(snap.data(), { headers });
    }
    return NextResponse.json(defaultPersonalInfo, { headers });
  } catch (error) {
    console.error("Error reading personal-info from Firestore:", error);
    return NextResponse.json(defaultPersonalInfo, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const updatedData = await request.json();
    await setDoc(doc(db, "settings", "personal-info"), updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving personal-info to Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to save personal info" }, { status: 500 });
  }
}
