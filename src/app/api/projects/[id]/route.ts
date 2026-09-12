import { NextResponse } from "next/server";
import { getServerDb, doc, deleteDoc, setDoc } from "@/lib/firebase-server";

function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes("admin_session=");
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    await deleteDoc(doc(db, "projects", id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const data = await request.json();
    await setDoc(doc(db, "projects", id), data, { merge: true });
    return NextResponse.json({ success: true, id, data });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
