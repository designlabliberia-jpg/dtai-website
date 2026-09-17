"use client";

import Image from "next/image";
import { useState } from "react";

export function PartnerLogo({ title, src }: { title: string; src: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex flex-col items-center shrink-0">
      <button
        type="button"
        aria-label={title}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
        className="w-16 h-16 rounded-full overflow-hidden border border-neutral-200 shadow-sm bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Image
          src={src}
          alt={title}
          width={64}
          height={64}
          className={`w-full h-full object-contain object-center transition-all duration-300 ${visible ? "grayscale-0" : "grayscale"}`}
        />
      </button>

      {/* Tooltip below the logo — avoids overflow-hidden clipping from html/body */}
      {visible && (
        <span className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white z-50 pointer-events-none">
          {title}
        </span>
      )}
    </div>
  );
}
