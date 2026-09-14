import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, deleteDoc, setDoc } from "@/lib/firebase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getServerDb();
    if (db) {
      const docRef = doc(db, "promotions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
      }
    }

    return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    await deleteDoc(doc(db, "promotions", id));
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error deleting promotion:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete promotion" }, { status: 500 });
  }
}
