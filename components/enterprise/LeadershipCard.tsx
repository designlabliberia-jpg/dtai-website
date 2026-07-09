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
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-infra-midnight">
      <div className="h-px w-full bg-gradient-to-r from-tech-blue via-dtai-blue/60 to-transparent" />

      <div className="flex flex-col sm:flex-row">
        {/* Portrait / dossier panel */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden bg-neutral-950 sm:h-auto sm:w-52">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 640px) 208px, 100vw"
              className="object-cover object-top grayscale-[15%] transition-all duration-[var(--duration-standard)] group-hover:grayscale-0"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id={`grid-${member.id}`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="#00A6FF"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill={`url(#grid-${member.id})`} />
              </svg>
              <span className="relative font-technical text-3xl tracking-wide text-tech-blue">
                {initials(member.name)}
              </span>
            </div>
          )}

          {/* corner brackets */}
          <div className="pointer-events-none absolute inset-3">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/60" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/60" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/60" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/60" />
          </div>

          <span className="absolute left-3 top-3 font-technical text-[10px] uppercase tracking-wide text-tech-blue/80">
            {member.id}
          </span>
        </div>

        {/* Details panel */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-[color:var(--color-titanium-silver)]/70">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="font-technical text-[10px] uppercase tracking-wide">
                {member.division}
              </span>
            </div>

            <h3 className="mt-3 font-primary text-xl font-semibold tracking-tight text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-technical text-xs uppercase tracking-wide text-tech-blue">
              {member.title}
            </p>

            <div className="mt-4 h-px w-10 bg-white/15" />

            <p className="mt-4 text-sm font-medium leading-snug text-[color:var(--color-titanium-silver)]">
              {member.focus}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              {member.bio}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
            <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
              Status: Active — DTAI Core Team
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
