"use client";

import { useRef, useEffect } from "react";
import type { ValueItem } from "@/lib/about-data";
import { Container } from "@/components/layout/Container";

interface ValuesSliderProps {
  values: ValueItem[];
  fromColor?: string;
}

export function ValuesSlider({ values, fromColor = "from-neutral-50" }: ValuesSliderProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const halfW = el.scrollWidth / 2;
    let last = performance.now();
    const tick = (now: number) => {
      offset.current = (offset.current + (now - last) * 0.04) % halfW;
      el.style.transform = `translateX(-${offset.current}px)`;
      last = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <section className="bg-neutral-50">
      <Container>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h2 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">What We Stand For</h2>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        {/* Continuous marquee label strip */}
        <div className="overflow-hidden mb-8">
          <div ref={marqueeRef} className="flex gap-8 will-change-transform" style={{ width: "max-content" }}>
            {[...values, ...values].map((v, i) => (
              <span key={i} className="font-technical text-xs uppercase tracking-widest whitespace-nowrap">
                {v.label} <span className="text-brand mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
