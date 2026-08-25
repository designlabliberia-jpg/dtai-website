import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { SolutionForm } from "../SolutionForm";

interface Props { params: Promise<{ id: string }>; }

export default async function SolutionPage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <SolutionForm />;

  const solution = await db.solution.findUnique({ where: { id, deletedAt: null } });
  if (!solution) notFound();
  return <SolutionForm solution={solution} />;
}
