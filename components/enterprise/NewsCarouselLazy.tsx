"use client";

import dynamic from "next/dynamic";
import type { NewsCarouselProps } from "./NewsCarousel";

const NewsCarousel = dynamic(() => import("./NewsCarousel").then((m) => ({ default: m.NewsCarousel })), { ssr: false });

export function NewsCarouselLazy(props: NewsCarouselProps) {
  return <NewsCarousel {...props} />;
}
