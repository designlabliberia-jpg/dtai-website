"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollToHash() {
  const pathname = usePathname();
  const lastScrolled = useRef("");

  function scrollToHash() {
    const hash = window.location.hash.split("#").filter(Boolean)[0];
    if (!hash) return;
    const key = `${window.location.pathname}#${hash}`;
    if (lastScrolled.current === key) return;
    lastScrolled.current = key;
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  useEffect(() => {
    scrollToHash();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
