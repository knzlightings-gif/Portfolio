import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple session management using secure HTTP-only cookies.
// The Firebase ID token is stored briefly — for production you'd
// verify the token server-side using Firebase Admin SDK.
export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Set a secure, HTTP-only cookie with the session token.
    // MaxAge: 7 days (604800 seconds)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 604800, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to clear session" }, { status: 500 });
  }
}
