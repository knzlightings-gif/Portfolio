import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";
import defaultAbout from "@/data/about.json";

const DOC_PATH = { collection: "settings", doc: "about" };

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultAbout);

    const docRef = doc(db, DOC_PATH.collection, DOC_PATH.doc);
    const snap = await getDoc(docRef);

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
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const updatedData = await request.json();
    const docRef = doc(db, DOC_PATH.collection, DOC_PATH.doc);
    await setDoc(docRef, updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving about to Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to save about data" }, { status: 500 });
  }
}
