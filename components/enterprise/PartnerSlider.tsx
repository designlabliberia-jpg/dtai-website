"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PartnerLogo } from "@/lib/partners-data";

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 3).map((w) => w[0].toUpperCase()).join("");

function LogoCell({ logo }: { logo: PartnerLogo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center justify-center h-20 rounded-md border border-neutral-100 bg-white grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
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
          className="object-contain max-h-10 w-auto"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function PartnerSlider({ logos }: { logos: PartnerLogo[] }) {
  const [offset, setOffset] = useState(0);
  const ROW_H = 96;
  const totalH = Math.ceil(logos.length / 3) * ROW_H;
  const doubled = [...logos, ...logos];

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
    <div className="relative h-[384px] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 z-10 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 z-10 bg-gradient-to-t from-white to-transparent" />
      <div className="grid grid-cols-4" style={{ transform: `translateY(-${offset}px)` }}>
        {doubled.map((logo, i) => <LogoCell key={i} logo={logo} />)}
      </div>
    </div>
  );
}
