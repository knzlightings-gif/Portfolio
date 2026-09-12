import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultTheme from "@/data/theme.json";
import { ThemeConfig } from "@/lib/themePresets";

const THEME_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");

export async function GET() {
  try {
    if (fs.existsSync(THEME_FILE_PATH)) {
      const fileData = fs.readFileSync(THEME_FILE_PATH, "utf-8");
      const config = JSON.parse(fileData);
      return NextResponse.json(config);
    }
    return NextResponse.json(defaultTheme);
  } catch (error) {
    console.error("Error reading theme.json:", error);
    return NextResponse.json(defaultTheme);
  }
}

export async function POST(request: Request) {
  try {
    const newConfig: ThemeConfig = await request.json();

    // Basic validation
    if (!newConfig.primary || !newConfig.secondary) {
      return NextResponse.json({ error: "Primary and Secondary colors are required." }, { status: 400 });
    }

    fs.writeFileSync(THEME_FILE_PATH, JSON.stringify(newConfig, null, 2), "utf-8");
    return NextResponse.json({ success: true, theme: newConfig });
  } catch (error) {
    console.error("Error writing theme.json:", error);
    return NextResponse.json({ error: "Failed to save theme configuration" }, { status: 500 });
  }
}
