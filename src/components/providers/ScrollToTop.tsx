"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Forcefully release any lingering body or html overflow lock
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // 2. Instant scroll reset to top of page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
