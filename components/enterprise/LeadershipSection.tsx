import { Container } from "@/components/layout/Container";
import { LeadershipSlider } from "@/components/enterprise/LeadershipSlider";
import { getPublishedLeadershipMembers } from "@/lib/actions/leadership";
import { leadershipTeam } from "@/lib/leadership-data";

export async function LeadershipSection() {
  const dbMembers = await getPublishedLeadershipMembers();
  const members = dbMembers ?? leadershipTeam;

  return (
    <section id="team" className="flex flex-col items-center justify-center bg-neutral-50 mb-6 overflow-hidden">
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

      <LeadershipSlider members={members} />
    </section>
  );
}
