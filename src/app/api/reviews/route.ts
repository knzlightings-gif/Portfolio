import { NextResponse } from "next/server";
import { getServerDb, collection, getDocs, addDoc } from "@/lib/firebase-server";
import { testimonials as defaultTestimonials } from "@/data/content";

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultTestimonials);

    const snapshot = await getDocs(collection(db, "reviews"));
    if (snapshot.empty) {
      return NextResponse.json(defaultTestimonials);
    }

    const firestoreReviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Client",
        role: data.role || "Verified Client",
        text: data.review || data.text || "",
        rating: data.rating || 5,
        createdAt: data.createdAt || "",
      };
    });

    // Merge custom firestore reviews first, followed by default placeholders
    return NextResponse.json([...firestoreReviews, ...defaultTestimonials]);
  } catch (error) {
    console.error("Error fetching reviews from Firestore:", error);
    return NextResponse.json(defaultTestimonials);
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { name, role, review, rating } = body;

    if (!name || !review) {
      return NextResponse.json({ error: "Name and Review are required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "reviews"), {
      name,
      role: role || "Client",
      review,
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    });

    const newReview = {
      id: docRef.id,
      name,
      role: role || "Client",
      text: review,
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: error?.message || "Failed to submit review" }, { status: 500 });
  }
}
