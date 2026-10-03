import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Server-side security check to ensure requests to mutating endpoints
 * (POST, PUT, DELETE) are performed by an authenticated admin session.
 */
export async function verifyAdminSession(): Promise<{ isValid: boolean; response?: NextResponse }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || !session.value || session.value.trim().length === 0) {
      return {
        isValid: false,
        response: NextResponse.json(
          { error: "Unauthorized: Admin session required to perform this action." },
          { status: 401 }
        ),
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error("Auth session check failed:", error);
    return {
      isValid: false,
      response: NextResponse.json(
        { error: "Unauthorized: Authentication check failed." },
        { status: 401 }
      ),
    };
  }
}
