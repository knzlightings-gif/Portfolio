import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";
import defaultAbout from "@/data/about.json";
import { verifyAdminSession } from "@/lib/auth-server";

const DOC_PATH = { collection: "settings", doc: "about" };

export async function GET() {
  const headers = {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  };
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultAbout, { headers });

    const docRef = doc(db, DOC_PATH.collection, DOC_PATH.doc);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return NextResponse.json(snap.data(), { headers });
    }
    return NextResponse.json(defaultAbout, { headers });
  } catch (error) {
    console.error("Error reading about from Firestore:", error);
    return NextResponse.json(defaultAbout, { headers });
  }
}

export async function POST(request: Request) {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.isValid && authCheck.response) {
      return authCheck.response;
    }

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
