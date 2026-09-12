import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";
import defaultAbout from "@/data/about.json";

const DOC_PATH = { collection: "settings", doc: "about" };

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultAbout);

    const snap = await getDoc(doc(db, DOC_PATH.collection, DOC_PATH.doc));
    if (snap.exists()) {
      return NextResponse.json(snap.data());
    }
    return NextResponse.json(defaultAbout);
  } catch (error) {
    console.error("Error reading about from Firestore:", error);
    return NextResponse.json(defaultAbout);
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
    await setDoc(doc(db, DOC_PATH.collection, DOC_PATH.doc), updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving about to Firestore:", error);
    return NextResponse.json({ error: "Failed to save about configuration" }, { status: 500 });
  }
}
