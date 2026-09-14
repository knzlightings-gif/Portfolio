import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, deleteDoc } from "@/lib/firebase-server";
import { defaultServices } from "@/data/servicesData";

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
      const docRef = doc(db, "services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
      }
    }

    // Fallback to default services by ID
    const found = defaultServices.find((s) => s.id === id);
    if (found) {
      return NextResponse.json(found);
    }

    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error fetching single service:", error);
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

    await deleteDoc(doc(db, "services", id));
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete service" }, { status: 500 });
  }
}
