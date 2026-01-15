"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser scroll restoration (Safari/Chrome mobile restores previous scroll otherwise)
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Scroll after paint (important on iOS Safari + route transitions)
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        // iOS sometimes needs a second nudge
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }, 50);
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
}
