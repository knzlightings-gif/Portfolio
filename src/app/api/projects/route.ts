import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, addDoc, doc, setDoc, getDoc } from "@/lib/firebase-server";
import { featuredProjects } from "@/data/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(featuredProjects);

    const metaRef = doc(db, "settings", "projects_meta");
    const metaSnap = await getDoc(metaRef);

    const snapshot = await getDocs(collection(db, "projects"));

    // If never seeded before and collection is empty, seed defaults into Firestore so they are real persistent documents
    if (snapshot.empty && !metaSnap.exists()) {
      const seededProjects = [];
      for (const p of featuredProjects) {
        const docRef = doc(db, "projects", p.id);
        await setDoc(docRef, {
          ...p,
          createdAt: new Date().toISOString(),
        });
        seededProjects.push({ ...p });
      }
      await setDoc(metaRef, { seeded: true, initializedAt: new Date().toISOString() });
      return NextResponse.json(seededProjects);
    }

    // If user has already initialized / modified, return exactly what is in Firestore (even if empty, don't resurrect deleted ones)
    if (snapshot.empty && metaSnap.exists()) {
      return NextResponse.json([]);
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
    const { id, ...data } = body;

    // Mark projects as initialized
    await setDoc(doc(db, "settings", "projects_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    if (id) {
      // Update existing document
      await setDoc(doc(db, "projects", id), {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      return NextResponse.json({ id, ...data }, { status: 200 });
    } else {
      // Create new document
      const docRef = await addDoc(collection(db, "projects"), {
        ...data,
        createdAt: new Date().toISOString(),
      });

      return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error creating/updating project in Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to save project" }, { status: 500 });
  }
}
