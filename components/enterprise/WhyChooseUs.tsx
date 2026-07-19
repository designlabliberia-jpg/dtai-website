"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { WhyChooseCard } from "@/components/enterprise/WhyChooseCard";
import type { WhyChooseItem } from "@/lib/about-data";

interface WhyChooseUsProps {
  items: WhyChooseItem[];
  heading?: string;
  headingAccent?: string;
  slideSize?: number;
}

export function WhyChooseUs({
  items,
  heading = "At DTAI, our clients",
  headingAccent = "enjoy services that",
  slideSize = 3,
}: WhyChooseUsProps) {
  const totalSlides = Math.ceil(items.length / slideSize);
  const [slide, setSlide] = useState(0);
  const visible = items.slice(slide * slideSize, slide * slideSize + slideSize);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h1 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">Why Choose Us</h1>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        <div className="border-t border-neutral-200 pt-8 mb-12 text-center">
          <h3 className="font-primary font-bold text-neutral-900 max-w-2xl mx-auto leading-tight">
            {heading} <span className="text-brand">{headingAccent}</span> are:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {visible.map((r) => (
            <WhyChooseCard key={r.title} title={r.title} description={r.description} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setSlide((s) => Math.max(s - 1, 0))} disabled={slide === 0} aria-label="Previous" className="text-neutral-400 hover:text-brand disabled:opacity-30 transition-colors">
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-10 bg-brand" : "w-6 bg-neutral-300"}`} />
          ))}
          <button onClick={() => setSlide((s) => Math.min(s + 1, totalSlides - 1))} disabled={slide === totalSlides - 1} aria-label="Next" className="text-neutral-400 hover:text-brand disabled:opacity-30 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </Container>
    </section>
  );
}
