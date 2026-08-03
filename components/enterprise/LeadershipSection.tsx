"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { LeadershipCard } from "@/components/enterprise/LeadershipCard";
import { leadershipTeam } from "@/lib/leadership-data";

export function LeadershipSection() {
  const middleIndex = Math.floor(leadershipTeam.length / 2);
  const [activeIndex, setActiveIndex] = useState(middleIndex);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const middleChild = container.children[middleIndex] as HTMLElement;
    if (!middleChild) return;
    container.scrollLeft = middleChild.offsetLeft - (container.clientWidth - middleChild.offsetWidth) / 2;
  }, [middleIndex]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  return (
    <section id="team" className="flex flex-col items-center justify-center bg-neutral-50 mb-6 overflow-hidden">
      {/* Header */}
      <Container className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h2 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">
            The Foundation of Everything
          </h2>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>
        <p className="font-primary text-base font-light text-neutral-400 leading-snug">
          Built by <span className="font-bold text-neutral-900">Experts</span>
          <br />
          Backed by <span className="font-bold text-neutral-900">Passion</span>
        </p>
      </Container>

      {/* Scroll Slider */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", paddingLeft: "calc(50% - 12vw - 8px)", paddingRight: "calc(50% - 12vw - 8px)" }}
        data-active={activeIndex}
      >
        {leadershipTeam.map((member, i) => {
          const dist = Math.abs(i - activeIndex);
          const wClass = dist === 0
            ? "w-[85vw] sm:w-[28vw]"
            : dist === 1
            ? "w-[55vw] sm:w-[20vw]"
            : "w-[38vw] sm:w-[13vw]";
          return (
            <div key={member.id} className={`snap-center flex-shrink-0 ${wClass}`}>
              <LeadershipCard member={member} isActive={i === activeIndex} dist={dist} />
            </div>
          );
        })}
      </div>

    </section>
  );
}
