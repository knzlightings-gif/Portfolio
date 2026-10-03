import { NextResponse } from "next/server";
import {
  getServerDb,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "@/lib/firebase-server";
import { verifyAdminSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.isValid && authCheck.response) {
      return authCheck.response;
    }

    const db = getServerDb();
    if (!db) {
      return NextResponse.json([]);
    }

    const snapshot = await getDocs(collection(db, "messages"));
    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const messages = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || "Anonymous",
        company: data.company || "",
        email: data.email || "",
        phone: data.phone || "",
        projectType: data.projectType || "",
        budget: data.budget || "",
        message: data.message || "",
        read: Boolean(data.read),
        createdAt: data.createdAt || null,
      };
    });

    // Sort by createdAt descending (newest first)
    messages.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("Error fetching messages from Firestore:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load messages" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.isValid && authCheck.response) {
      return authCheck.response;
    }

    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    await updateDoc(doc(db, "messages", id), {
      read: Boolean(read),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.isValid && authCheck.response) {
      return authCheck.response;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    await deleteDoc(doc(db, "messages", id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete message" },
      { status: 500 }
    );
  }
}
