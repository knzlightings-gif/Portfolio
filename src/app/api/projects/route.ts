import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, addDoc, doc, setDoc } from "@/lib/firebase-server";
import { featuredProjects } from "@/data/content";

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(featuredProjects);

    const snap = await getDocs(collection(db, "projects"));
    if (snap.empty) {
      return NextResponse.json(featuredProjects);
    }

    const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    projects.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error reading projects from Firestore:", error);
    return NextResponse.json(featuredProjects);
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

    const projectData = await request.json();
    const { id, ...data } = projectData;

    if (id) {
      await setDoc(doc(db, "projects", id), data, { merge: true });
      return NextResponse.json({ success: true, id, data });
    } else {
      const ref = await addDoc(collection(db, "projects"), data);
      return NextResponse.json({ success: true, id: ref.id, data });
    }
  } catch (error: any) {
    console.error("Error saving project to Firestore:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}
