import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, addDoc, doc, setDoc, getDoc } from "@/lib/firebase-server";
import { Promotion } from "@/types/promotion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Sample initial default promotion for demonstration
const defaultPromotions: Promotion[] = [
  {
    id: "welcome-2026",
    title: "Special Limited Offer — Get 15% Off on ERP & Web App Development",
    description: "Book your project this month and receive free initial cloud setup & 3 months maintenance.",
    badgeText: "FLAT 15% OFF",
    promoCode: "SAVE15",
    discountPercentage: "15%",
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Started yesterday
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Ends in 14 days
    isActive: true,
    ctaText: "Claim Discount Now",
    ctaLink: "/contact",
    themeColor: "cyan",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get("public") === "true";

    const db = getServerDb();
    if (!db) {
      if (isPublic) {
        const now = new Date();
        const active = defaultPromotions.filter((p) => {
          if (!p.isActive) return false;
          const start = new Date(p.startDate);
          const end = new Date(p.endDate);
          return now >= start && now <= end;
        });
        return NextResponse.json(active);
      }
      return NextResponse.json(defaultPromotions);
    }

    const snapshot = await getDocs(collection(db, "promotions"));
    const metaRef = doc(db, "settings", "promotions_meta");
    const metaSnap = await getDoc(metaRef);

    // Auto-seed initial default promotion if collection is empty
    if (snapshot.empty && !metaSnap.exists()) {
      const seeded: Promotion[] = [];
      for (const p of defaultPromotions) {
        const docRef = doc(db, "promotions", p.id);
        const item = {
          ...p,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(docRef, item);
        seeded.push(item);
      }
      await setDoc(metaRef, { seeded: true, initializedAt: new Date().toISOString() });

      if (isPublic) {
        const now = new Date();
        return NextResponse.json(
          seeded.filter((p) => p.isActive && new Date(p.startDate) <= now && new Date(p.endDate) >= now)
        );
      }
      return NextResponse.json(seeded);
    }

    if (snapshot.empty && metaSnap.exists()) {
      return NextResponse.json([]);
    }

    let promotions = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Promotion[];

    if (isPublic) {
      const now = new Date();
      promotions = promotions.filter((p) => {
        if (!p.isActive) return false;
        const start = new Date(p.startDate);
        const end = new Date(p.endDate);
        return now >= start && now <= end;
      });
    }

    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(defaultPromotions);
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

    await setDoc(doc(db, "settings", "promotions_meta"), { seeded: true, updatedAt: new Date().toISOString() }, { merge: true });

    if (id) {
      const docRef = doc(db, "promotions", id);
      const payload = {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(docRef, payload, { merge: true });
      return NextResponse.json(payload, { status: 200 });
    } else {
      const docRef = await addDoc(collection(db, "promotions"), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error saving promotion:", error);
    return NextResponse.json({ error: error?.message || "Failed to save promotion" }, { status: 500 });
  }
}
