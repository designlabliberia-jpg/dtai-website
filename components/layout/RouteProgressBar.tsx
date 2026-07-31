"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={`fixed left-0 top-0 z-[60] h-0.5 w-full bg-tech-blue transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 400ms ease-out, opacity 200ms ease-out",
      }}
    />
  );
}
