import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LeadershipForm } from "../LeadershipForm";

interface Props { params: Promise<{ id: string }>; }

export default async function LeadershipMemberPage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <LeadershipForm />;

  const member = await db.leadershipMember.findUnique({ where: { id, deletedAt: null } });
  if (!member) notFound();
  return <LeadershipForm member={member} />;
}
