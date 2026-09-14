import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, doc, setDoc, getDoc } from "@/lib/firebase-server";
import { defaultServices, ServiceItem } from "@/data/servicesData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultServices);

    const metaRef = doc(db, "settings", "services_meta");
    const metaSnap = await getDoc(metaRef);

    const snapshot = await getDocs(collection(db, "services"));

    // If never seeded before and collection is empty, seed defaults into Firestore
    if (snapshot.empty && !metaSnap.exists()) {
      const seeded: ServiceItem[] = [];
      for (const s of defaultServices) {
        const docRef = doc(db, "services", s.id);
        const serviceData = {
          ...s,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(docRef, serviceData);
        seeded.push(serviceData);
      }
      await setDoc(metaRef, { seeded: true, initializedAt: new Date().toISOString() });
      return NextResponse.json(seeded);
    }

    if (snapshot.empty && metaSnap.exists()) {
      return NextResponse.json([]);
    }

    const services = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services from Firestore:", error);
    return NextResponse.json(defaultServices);
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

    if (!id) {
      return NextResponse.json({ error: "Service ID / slug is required" }, { status: 400 });
    }

    // Mark services as initialized
    await setDoc(doc(db, "settings", "services_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    const docRef = doc(db, "services", id);
    const servicePayload = {
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, servicePayload, { merge: true });

    return NextResponse.json(servicePayload, { status: 200 });
  } catch (error: any) {
    console.error("Error creating/updating service in Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to save service" }, { status: 500 });
  }
}
