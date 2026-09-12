import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultAbout from "@/data/about.json";

const ABOUT_FILE_PATH = path.join(process.cwd(), "src", "data", "about.json");

export async function GET() {
  try {
    if (fs.existsSync(ABOUT_FILE_PATH)) {
      const fileData = fs.readFileSync(ABOUT_FILE_PATH, "utf-8");
      const data = JSON.parse(fileData);
      return NextResponse.json(data);
    }
    return NextResponse.json(defaultAbout);
  } catch (error) {
    console.error("Error reading about.json:", error);
    return NextResponse.json(defaultAbout);
  }
}

export async function POST(request: Request) {
  try {
    const updatedData = await request.json();

    fs.writeFileSync(ABOUT_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Error saving about.json:", error);
    return NextResponse.json({ error: "Failed to save about configuration" }, { status: 500 });
  }
}
