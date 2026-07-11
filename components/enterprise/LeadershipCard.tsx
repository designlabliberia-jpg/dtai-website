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

export function LeadershipCard({ member }: { member: LeadershipMember }) {
  const Icon = divisionIcon[member.division];

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-300/60 bg-white transition-shadow duration-standard hover:shadow-lg">
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-standard group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-infra-midnight">
            <span className="font-technical text-3xl tracking-wide text-tech-blue">
              {initials(member.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {member.linkedin && (
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

      {/* Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Icon size={13} strokeWidth={1.75} />
          <span className="font-technical text-[10px] uppercase tracking-wide">
            {member.division}
          </span>
        </div>

        <h3 className="mt-2 font-primary text-lg font-semibold tracking-tight text-neutral-900">
          {member.name}
        </h3>
        <p className="mt-0.5 font-technical text-xs uppercase tracking-wide text-brand">
          {member.title}
        </p>

        <p className="mt-4 text-sm font-medium leading-snug text-neutral-800">
          {member.focus}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
