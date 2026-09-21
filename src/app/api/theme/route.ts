import { NextResponse } from "next/server";
import { getServerDb, doc, getDoc, setDoc } from "@/lib/firebase-server";
import defaultTheme from "@/data/theme.json";
import { ThemeConfig } from "@/lib/themePresets";

// Firestore: settings/theme document
const THEME_DOC = { collection: "settings", id: "theme" };

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) {
      // Firebase not configured — return file-based default
      return NextResponse.json(defaultTheme);
    }

    const snap = await getDoc(doc(db, THEME_DOC.collection, THEME_DOC.id));
    if (snap.exists()) {
      return NextResponse.json(snap.data());
    }
    // No saved theme yet — return default
    return NextResponse.json(defaultTheme);
  } catch (error) {
    console.error("Error reading theme from Firestore:", error);
    return NextResponse.json(defaultTheme);
  }
}

export async function POST(request: Request) {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json(
        { error: "Firebase not configured. Please set environment variables." },
        { status: 500 }
      );
    }

    const newConfig: ThemeConfig = await request.json();

    // Basic validation
    if (!newConfig.primary || !newConfig.secondary) {
      return NextResponse.json(
        { error: "Primary and Secondary colors are required." },
        { status: 400 }
      );
    }

    // Save to Firestore (works on Vercel — no file system needed)
    await setDoc(doc(db, THEME_DOC.collection, THEME_DOC.id), newConfig);

    return NextResponse.json({ success: true, theme: newConfig });
  } catch (error: any) {
    console.error("Error saving theme to Firestore:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save theme configuration" },
      { status: 500 }
    );
  }
}
