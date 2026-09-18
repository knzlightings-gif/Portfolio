import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, doc, setDoc, getDoc } from "@/lib/firebase-server";
import { solutionsByBusiness } from "@/data/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultSolutions = solutionsByBusiness.map((s, idx) => ({
  id: s.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  title: s.title,
  subtitle: s.title === "Manufacturing" ? "Factory & Production ERP" :
            s.title === "Retail" ? "Multi-Store POS & Sales" :
            s.title === "Distribution" ? "Supply Chain & Wholesale" :
            s.title === "Services" ? "Agency & Operations Hub" :
            s.title === "Education" ? "School & Academy Portal" :
            s.title === "Healthcare" ? "Clinic & Hospital System" : "Custom Business System",
  description: s.title === "Manufacturing" ? "End-to-end management for raw materials, batch schedules, inventory valuation & costing." :
               s.title === "Retail" ? "Fast barcode billing, customer credit ledgers, multi-branch stock sync & daily P&L." :
               s.title === "Distribution" ? "Bulk order dispatch, delivery route management, warehouse bin tracking & live aging." :
               s.title === "Services" ? "Job scheduling, timesheet tracking, automated invoicing & recurring subscriptions." :
               s.title === "Education" ? "Student admission records, digital fee vouchers, automated alerts & exam grading." :
               s.title === "Healthcare" ? "Doctor appointment bookings, EHR records, pharmacy stock & patient billing." : "Custom digital workflow system tailored to your exact operational challenges.",
  badge: s.title === "Manufacturing" ? "Industry 4.0" :
         s.title === "Retail" ? "Omnichannel" :
         s.title === "Distribution" ? "Logistics" :
         s.title === "Services" ? "Workflow" :
         s.title === "Education" ? "EdTech" :
         s.title === "Healthcare" ? "HealthTech" : "Custom",
  features: s.features,
  icon: s.icon,
  order: idx + 1,
}));

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultSolutions);

    const metaRef = doc(db, "settings", "solutions_meta");
    const metaSnap = await getDoc(metaRef);

    const snapshot = await getDocs(collection(db, "solutions"));

    if (snapshot.empty && !metaSnap.exists()) {
      const seeded = [];
      for (const item of defaultSolutions) {
        const docRef = doc(db, "solutions", item.id);
        await setDoc(docRef, item);
        seeded.push(item);
      }
      await setDoc(metaRef, { seeded: true, initializedAt: new Date().toISOString() });
      return NextResponse.json(seeded);
    }

    if (snapshot.empty && metaSnap.exists()) {
      return NextResponse.json([]);
    }

    const solutions = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json(solutions);
  } catch (error) {
    console.error("Error fetching solutions from Firestore:", error);
    return NextResponse.json(defaultSolutions);
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });

    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "Solution ID is required" }, { status: 400 });

    await setDoc(doc(db, "settings", "solutions_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    const docRef = doc(db, "solutions", id);
    const payload = { id, ...data, updatedAt: new Date().toISOString() };
    await setDoc(docRef, payload, { merge: true });

    return NextResponse.json(payload, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to save solution" }, { status: 500 });
  }
}
