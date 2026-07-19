import { Container } from "@/components/layout/Container";
import { LeadershipCard } from "@/components/enterprise/LeadershipCard";
import { leadershipTeam } from "@/lib/leadership-data";

export function LeadershipSection() {
  return (
    <section className="bg-neutral-50 mb-12">
      <Container>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h2 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">The Foundation of Everything</h2>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadershipTeam.map((member) => (
            <LeadershipCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
