"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export function FadeInImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Subtle pulsing placeholder shown until the real image finishes loading */}
      <div
        className={`absolute inset-0 bg-neutral-800 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        }`}
        aria-hidden
      />
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        className={`${props.className ?? ""} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
