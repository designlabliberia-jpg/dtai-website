"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Landmark, Code2, Server, ShieldCheck, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LeadershipMember } from "@/lib/leadership-data";

const divisionIcon: Record<LeadershipMember["division"], LucideIcon> = {
  Executive: Landmark,
  Engineering: Code2,
  Operations: Server,
  Directorate: ShieldCheck,
  Management: Briefcase,
};

function initials(name: string) {
  return name.split(" ").filter(Boolean).map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

interface Props {
  member: LeadershipMember;
  onClose: () => void;
}

export function LeadershipModal({ member, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image — tall portrait on mobile, fixed-width column on desktop */}
        <div className="relative w-full h-72 sm:h-auto sm:w-56 sm:min-h-full flex-shrink-0 bg-neutral-100">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 224px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-infra-midnight">
              <span className="font-technical text-4xl tracking-wide text-tech-blue">
                {initials(member.name)}
              </span>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 backdrop-blur hover:bg-white z-10"
        >
          <X size={16} />
        </button>

        {/* Body */}
        <div className="overflow-y-auto px-4 py-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-neutral-500">
            {(() => { const Icon = divisionIcon[member.division]; return <Icon size={12} strokeWidth={1.75} />; })()}
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
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-white hover:text-brand self-start"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
