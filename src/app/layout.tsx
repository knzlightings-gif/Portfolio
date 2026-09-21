import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import PromotionBanner from "@/components/ui/PromotionBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional ERP & Web Developer Portfolio",
  description: "I build practical ERP systems, business web applications and custom digital solutions for small and growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <ThemeProvider>
          {/* Animated ambient blobs — fixed, behind everything */}
          <BackgroundBlobs />

          {/* Particles Network — floating dots with connecting lines */}
          <AnimatedBackground />
          
          {/* Top Animated Promotion / Discount Banner */}
          <PromotionBanner />

          {/* All page content sits above the blobs */}
          <div className="site-content flex flex-col flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
