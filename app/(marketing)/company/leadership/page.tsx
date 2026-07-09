import { Container } from "@/components/layout/Container";
import { CompanyNav } from "@/components/enterprise/CompanyNav";
import { LeadershipCard } from "@/components/enterprise/LeadershipCard";
import { leadershipTeam } from "@/lib/leadership-data";

export const metadata = {
  title: "Leadership — DTAI",
  description:
    "The leadership team guiding DTAI's engineering and institutional direction.",
};

export default function LeadershipPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <CompanyNav activeSlug="leadership" />
          <div>
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Company
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Leadership
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600">
              DTAI&rsquo;s leadership team combines engineering, security,
              and institutional delivery experience across government and
              enterprise projects.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-neutral-300/60 py-3 font-technical text-[11px] uppercase tracking-wide text-neutral-500">
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

            <div className="mt-10 grid grid-cols-1 gap-6">
              {leadershipTeam.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
