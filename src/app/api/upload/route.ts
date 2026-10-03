import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

export async function POST(request: Request) {
  try {
    // 1. Verify admin session
    const authCheck = await verifyAdminSession();
    if (!authCheck.isValid && authCheck.response) {
      return authCheck.response;
    }

    const formData = await request.formData();
    // Detect if local filesystem uploads are available (e.g. local dev)
    let isFsWritable = false;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!process.env.VERCEL) {
      try {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        isFsWritable = true;
      } catch {
        isFsWritable = false;
      }
    }

    // Support multiple files under "files" or "file"
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const allFiles = files.length > 0 ? files : (singleFile ? [singleFile] : []);

    if (allFiles.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate size and file type for all files
    for (const file of allFiles) {
      if (!file || typeof file === "string") continue;
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 5MB size limit.` },
          { status: 400 }
        );
      }
      const ext = (path.extname(file.name) || "").toLowerCase();
      if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: `File type "${ext}" is not permitted. Only images are allowed.` },
          { status: 400 }
        );
      }
    }

    const uploadedUrls: string[] = [];

    for (const file of allFiles) {
      if (!file || typeof file === "string") continue;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (isFsWritable) {
        try {
          const ext = path.extname(file.name) || ".png";
          const randomId = Math.random().toString(36).substring(2, 8);
          const filename = `upload-${Date.now()}-${randomId}${ext}`;
          const filepath = path.join(uploadsDir, filename);

          fs.writeFileSync(filepath, buffer);
          uploadedUrls.push(`/uploads/${filename}`);
          continue;
        } catch {
          // Fall back to data URL if writing fails
        }
      }

      // Safe Serverless Fallback (Vercel): Return Base64 Data URL
      const mimeType = file.type || "image/png";
      const base64 = buffer.toString("base64");
      uploadedUrls.push(`data:${mimeType};base64,${base64}`);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
