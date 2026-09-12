import { NextResponse } from "next/server";
import { getServerDb, doc, deleteDoc, setDoc } from "@/lib/firebase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const { id } = await params;
    await deleteDoc(doc(db, "projects", id));

    // Ensure projects_meta remains set so deleted projects are not resurrected
    await setDoc(doc(db, "settings", "projects_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    return NextResponse.json({ success: true, message: `Project ${id} deleted` });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const { id } = await params;
    const body = await request.json();
    await setDoc(doc(db, "projects", id), {
      ...body,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    await setDoc(doc(db, "settings", "projects_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    return NextResponse.json({ id, ...body });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: error?.message || "Failed to update project" }, { status: 500 });
  }
}
