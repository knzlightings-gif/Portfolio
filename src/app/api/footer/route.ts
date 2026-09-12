import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";
import { footerContent as defaultFooter } from "@/data/content";

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultFooter);

    const snap = await getDoc(doc(db, "settings", "footer"));
    if (snap.exists()) {
      return NextResponse.json({
        ...defaultFooter,
        ...snap.data(),
      });
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
