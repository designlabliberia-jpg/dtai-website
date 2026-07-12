import { Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";
import { LeadershipCard } from "@/components/enterprise/LeadershipCard";
import { leadershipTeam } from "@/lib/leadership-data";

export const metadata = {
  title: "Leadership — DTAI",
  description:
    "The leadership team guiding DTAI's engineering and institutional direction.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeroBanner
        eyebrow="Company"
        title="Leadership"
        subtitle="DTAI's leadership team combines engineering, security, and institutional delivery experience across government and enterprise projects."
        icon={Users}
      />

      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-neutral-300/60 py-3 font-technical text-[11px] uppercase tracking-wide text-neutral-500">
              <span>
                Team Size: {String(leadershipTeam.length).padStart(2, "0")}
              </span>
              <span className="hidden text-neutral-300 sm:inline">/</span>
              <span>Divisions: Executive · Engineering · Operations</span>
              <span className="hidden text-neutral-300 sm:inline">/</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
                All Roles Active
              </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadershipTeam.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
