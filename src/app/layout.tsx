import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PersonalInfoProvider } from "@/components/providers/PersonalInfoProvider";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import PromotionBanner from "@/components/ui/PromotionBanner";
import NavigationProgressBar from "@/components/providers/NavigationProgressBar";
import ScrollToTop from "@/components/providers/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eforerp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "E For ERP | Custom ERP Systems & Business Web Applications",
    template: "%s | E For ERP",
  },
  description: "We build practical ERP systems, business web applications and custom digital solutions for small and growing businesses.",
  keywords: [
    "ERP Developer",
    "Custom ERP Systems",
    "Business Software",
    "Next.js Developer",
    "Web Applications",
    "Business Automation",
    "Inventory Management",
    "Point of Sale",
  ],
  authors: [{ name: "E For ERP" }],
  creator: "E For ERP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "E For ERP | Custom ERP Systems & Business Web Applications",
    description: "Practical ERP systems and custom software tailored to simplify business workflows.",
    siteName: "E For ERP",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "E For ERP Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "E For ERP | Custom ERP Systems & Business Web Applications",
    description: "Practical ERP systems and custom software tailored to simplify business workflows.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/hero-slide1.jpg" as="image" fetchPriority="high" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <ThemeProvider>
          <PersonalInfoProvider>
            {/* Top Navigation Instant Progress Bar */}
            <NavigationProgressBar />

            {/* Global Route Change Scroll-To-Top & Overflow Unlocker */}
            <ScrollToTop />

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
          </PersonalInfoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
