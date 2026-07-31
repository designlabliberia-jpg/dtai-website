"use client";

import Image from "next/image";
import { Landmark, Code2, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LeadershipMember } from "@/lib/leadership-data";

const divisionIcon: Record<LeadershipMember["division"], LucideIcon> = {
  Executive: Landmark,
  Engineering: Code2,
  Operations: Server,
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Props {
  member: LeadershipMember;
  isActive: boolean;
}

export function LeadershipCard({ member, isActive }: Props) {
  const Icon = divisionIcon[member.division];

  return (
    <div
      className={`flex overflow-hidden rounded-2xl transition-all duration-500 ${
        isActive
          ? "scale-100 opacity-100 shadow-2xl flex-col sm:flex-row h-auto sm:h-[280px]"
          : "scale-90 opacity-40 shadow-none flex-col h-[220px]"
      }`}
    >
      {/* Portrait */}
      <div className={`relative overflow-hidden rounded-2xl bg-neutral-100 flex-shrink-0 ${
        isActive ? "w-full h-[260px] sm:w-[45%] sm:h-full" : "w-full h-full"
      }`}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, 80vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-infra-midnight">
            <span className="font-technical text-3xl tracking-wide text-tech-blue">
              {initials(member.name)}
            </span>
          </div>
        )}

        {member.linkedin && isActive && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 backdrop-blur transition-colors duration-micro hover:bg-white hover:text-brand"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>

      {/* Details — only visible when active */}
      {isActive && (
        <div className="flex flex-col justify-center overflow-y-auto px-4 py-4 text-left">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Icon size={12} strokeWidth={1.75} />
            <span className="font-technical text-[9px] uppercase tracking-wide">
              {member.division}
            </span>
          </div>
          <h3 className="mt-1 font-primary text-sm font-semibold tracking-tight text-neutral-900">
            {member.name}
          </h3>
          <p className="mt-0.5 font-technical text-[9px] uppercase tracking-wide text-brand">
            {member.title}
          </p>
          <p className="mt-1.5 text-xs font-medium leading-snug text-neutral-800">
            {member.focus}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            {member.bio}
          </p>
        </div>
      )}
    </div>
  );
}
