import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, addDoc, doc, setDoc } from "@/lib/firebase-server";
import { featuredProjects } from "@/data/content";

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(featuredProjects);

    const snapshot = await getDocs(collection(db, "projects"));
    if (snapshot.empty) {
      return NextResponse.json(featuredProjects);
    }

    const projects = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects from Firestore:", error);
    return NextResponse.json(featuredProjects);
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const docRef = await addDoc(collection(db, "projects"), {
      ...body,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project in Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to create project" }, { status: 500 });
  }
}
