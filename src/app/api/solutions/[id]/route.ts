import { NextResponse } from "next/server";
import { getServerDb, doc, deleteDoc, setDoc } from "@/lib/firebase-server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Solution ID is required" }, { status: 400 });

    await setDoc(doc(db, "settings", "solutions_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    await deleteDoc(doc(db, "solutions", id));

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete solution" }, { status: 500 });
  }
}
