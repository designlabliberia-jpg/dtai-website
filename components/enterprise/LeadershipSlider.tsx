"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { LeadershipCard } from "@/components/enterprise/LeadershipCard";
import { LeadershipModal } from "@/components/enterprise/LeadershipModal";
import type { LeadershipMember } from "@/lib/leadership-data";

export function LeadershipSlider({ members }: { members: LeadershipMember[] }) {
  const middleIndex = Math.floor(members.length / 2);
  const [activeIndex, setActiveIndex] = useState(middleIndex);
  const [modalMember, setModalMember] = useState<LeadershipMember | null>(null);
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
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", paddingLeft: "calc(50% - 12vw - 8px)", paddingRight: "calc(50% - 12vw - 8px)" }}
        data-active={activeIndex}
      >
        {members.map((member, i) => {
          const dist = Math.abs(i - activeIndex);
          const wClass = dist === 0 ? "w-[85vw] sm:w-[28vw]" : dist === 1 ? "w-[55vw] sm:w-[20vw]" : "w-[38vw] sm:w-[13vw]";
          return (
            <div key={member.id} className={`snap-center flex-shrink-0 ${wClass}`}>
              <LeadershipCard
                member={member}
                isActive={i === activeIndex}
                dist={dist}
                onReadMore={() => setModalMember(member)}
              />
            </div>
          );
        })}
      </div>
      {modalMember && <LeadershipModal member={modalMember} onClose={() => setModalMember(null)} />}
    </>
  );
}
