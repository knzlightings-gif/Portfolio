import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";

const defaultPhilosophy = {
  badge: "Core Engineering Philosophy",
  headingPart1: "Technology Is Only Useful When",
  headingPart2: "It Solves Real Problems.",
  description: "We combine deep domain comprehension with modern development standards to deliver software that drives efficiency, eliminates chaos, and fuels measurable growth.",
  principles: [
    {
      num: "01",
      tag: "Foundation",
      title: "Business Understanding",
      description: "We focus on understanding how your business actually operates — workflows, bottlenecks, and KPIs — before writing a single line of code.",
    },
    {
      num: "02",
      tag: "Execution",
      title: "Practical Solutions",
      description: "No unnecessary over-engineering. We build lean, high-impact features that directly solve operational friction and deliver tangible ROI.",
    },
    {
      num: "03",
      tag: "Usability",
      title: "User-Friendly Systems",
      description: "Software should empower people, not confuse them. Intuitive interfaces and zero learning-curve workflows tailored for non-technical teams.",
    },
    {
      num: "04",
      tag: "Tech Stack",
      title: "Modern Development",
      description: "Engineered with modern full-stack architectures, high-performance APIs, robust security, and AI-assisted workflows for rapid delivery.",
    },
    {
      num: "05",
      tag: "Scalability",
      title: "Long-Term Thinking",
      description: "Architected for tomorrow. Scalable databases, modular design patterns, and clean code that easily adapts as your business expands.",
    },
    {
      num: "06",
      tag: "Reliability",
      title: "Continuous Support",
      description: "Dedicated maintenance, proactive performance monitoring, and seamless updates so your critical systems stay 99.9% reliable.",
    },
  ],
};

const DOC_PATH = { collection: "settings", doc: "philosophy" };

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) return NextResponse.json(defaultPhilosophy);

    const docRef = doc(db, DOC_PATH.collection, DOC_PATH.doc);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return NextResponse.json({
        ...defaultPhilosophy,
        ...snap.data(),
      });
    }
    return NextResponse.json(defaultPhilosophy);
  } catch (error) {
    console.error("Error reading philosophy from Firestore:", error);
    return NextResponse.json(defaultPhilosophy);
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const updatedData = await request.json();
    const docRef = doc(db, DOC_PATH.collection, DOC_PATH.doc);
    await setDoc(docRef, updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving philosophy to Firestore:", error);
    return NextResponse.json({ error: error?.message || "Failed to save philosophy data" }, { status: 500 });
  }
}
