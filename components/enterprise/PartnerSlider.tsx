"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PartnerLogo } from "@/lib/partners-data";

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 3).map((w) => w[0].toUpperCase()).join("");

function LogoCell({ logo }: { logo: PartnerLogo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="group/cell relative flex items-center justify-center h-20 rounded-md border border-neutral-100 bg-white grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 overflow-hidden">
      {failed ? (
        <span className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-technical font-semibold text-sm select-none">
          {initials(logo.name)}
        </span>
      ) : (
        <Image
          src={logo.src}
          alt={logo.name}
          width={120}
          height={48}
          loading="lazy"
          className="object-contain max-h-10 w-auto"
          onError={() => setFailed(true)}
        />
      )}
      {/* Name overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 px-2">
        <span className="text-[11px] font-technical font-semibold text-center leading-tight">
          {logo.name}
        </span>
      </div>
    </div>
  );
}

function MobileSlide({ logo }: { logo: PartnerLogo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 w-32 h-24 rounded-md border border-neutral-100 bg-white px-3">
      {failed ? (
        <span className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-technical font-semibold text-xs select-none">
          {initials(logo.name)}
        </span>
      ) : (
        <Image
          src={logo.src}
          alt={logo.name}
          width={80}
          height={32}
          loading="lazy"
          className="object-contain max-h-8 w-auto"
          onError={() => setFailed(true)}
        />
      )}
      <span className="text-center text-[10px] leading-tight text-neutral-600 font-technical line-clamp-2">
        {logo.name}
      </span>
    </div>
  );
}

export function PartnerSlider({ logos }: { logos: PartnerLogo[] }) {
  const [offset, setOffset] = useState(0);
  const ROW_H = 96;
  const totalH = Math.ceil(logos.length / 3) * ROW_H;
  const doubled = [...logos, ...logos];

  // Mobile: continuous marquee via rAF
  const mobileOffset = useRef(0);
  const mobileRaf = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ITEM_W = 128 + 12; // w-32 + gap-3
    const totalW = logos.length * ITEM_W;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      mobileOffset.current = (mobileOffset.current + delta * 0.04) % totalW;
      track.style.transform = `translateX(-${mobileOffset.current}px)`;
      mobileRaf.current = requestAnimationFrame(tick);
    };
    mobileRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(mobileRaf.current);
  }, [logos.length]);

  // Desktop: vertical auto-scroll
  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      setOffset((o) => (o + delta * 0.025) % totalH);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalH]);

  return (
    <>
      {/* Mobile: continuous marquee */}
      <div className="lg:hidden relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-white to-transparent" />
        <div ref={trackRef} className="flex gap-3 py-2 will-change-transform" style={{ width: "max-content" }}>
          {/* Triple the logos so the loop is seamless */}
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <MobileSlide key={i} logo={logo} />
          ))}
        </div>
      </div>

      {/* Desktop: vertical auto-scroll grid with hover name */}
      <div className="hidden lg:block relative h-[384px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 z-10 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 z-10 bg-gradient-to-t from-white to-transparent" />
        <div className="grid grid-cols-4" style={{ transform: `translateY(-${offset}px)` }}>
          {doubled.map((logo, i) => <LogoCell key={i} logo={logo} />)}
        </div>
      </div>
    </>
  );
}
