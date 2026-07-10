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
              priority
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
            <div className="mt-1 flex items-center gap-2">
              <p className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                {member.title}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="text-neutral-400 transition-colors duration-micro hover:text-tech-blue"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>

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
