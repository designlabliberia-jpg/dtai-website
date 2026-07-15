"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { coverImageUrl, getReadTimeMinutes, type Insight } from "@/sanity/lib/insights";

interface NewsCarouselProps {
  items: Insight[];
}

const ROTATE_MS = 6000;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-72 w-full sm:h-96">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/insights/${item.slug}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={coverImageUrl(item, 1400)}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 1280px, 100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-infra-midnight via-infra-midnight/50 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                {item.category}
              </span>
              <h3 className="mt-2 max-w-2xl font-primary text-xl font-semibold text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300">
                {item.summary}
              </p>
              <div className="mt-4 flex items-center gap-4 font-technical text-[11px] uppercase tracking-wide text-neutral-400">
                <span>{formatDate(item.publishDate)}</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {getReadTimeMinutes(item)} min read
                </span>
              </div>
              <Link
                href={`/insights/${item.slug}`}
                className="mt-4 inline-flex items-center gap-2 font-technical text-xs uppercase tracking-wide text-white transition-colors hover:text-tech-blue"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          </Link>
        ))}
      </div>

      {items.length > 1 && (
        <div className="absolute right-6 top-6 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show article ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-tech-blue" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
