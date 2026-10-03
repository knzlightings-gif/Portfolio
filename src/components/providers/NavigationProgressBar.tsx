"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeNavigationRef = useRef(false);

  // When pathname changes, complete the progress bar
  useEffect(() => {
    if (activeNavigationRef.current || isVisible) {
      // Jump to 100%
      setProgress(100);
      const finishTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        activeNavigationRef.current = false;
      }, 250);

      return () => clearTimeout(finishTimer);
    }
  }, [pathname]);

  // Global click interceptor for internal links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      // Only trigger for internal links (starts with / and not # or external protocols)
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        href !== pathname &&
        targetAttr !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        // Start progress
        activeNavigationRef.current = true;
        setIsVisible(true);
        setProgress(25);

        if (timerRef.current) clearInterval(timerRef.current);

        // Step up progress smoothly to give instant feedback
        let current = 25;
        timerRef.current = setInterval(() => {
          if (current < 85) {
            current += Math.random() * 15;
            setProgress(Math.min(current, 85));
          } else {
            if (timerRef.current) clearInterval(timerRef.current);
          }
        }, 120);
      }
    };

    const handlePopState = () => {
      activeNavigationRef.current = true;
      setIsVisible(true);
      setProgress(40);
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pathname]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="h-[3px] bg-gradient-to-r from-brand-cyan via-emerald-400 to-brand-purple shadow-[0_0_12px_rgba(0,172,193,0.8)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
