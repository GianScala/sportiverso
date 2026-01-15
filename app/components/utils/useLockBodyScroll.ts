"use client";

import { useEffect, useRef } from "react";

type LockOptions = {
  enabled: boolean;
};

export function useLockBodyScroll({ enabled }: LockOptions) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;

    const lock = () => {
      scrollYRef.current = window.scrollY || 0;

      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    };

    const unlock = () => {
      const top = body.style.top; // like "-123px"
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      // Restore previous scroll position
      if (top) {
        const y = Math.abs(parseInt(top, 10)) || scrollYRef.current || 0;
        window.scrollTo({ top: y, left: 0, behavior: "auto" });
      }
    };

    if (enabled) lock();
    else unlock();

    // Always cleanup on unmount or when enabled toggles
    return () => {
      unlock();
    };
  }, [enabled]);
}
