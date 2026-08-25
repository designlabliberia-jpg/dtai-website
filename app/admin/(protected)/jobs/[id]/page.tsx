import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { JobForm } from "../JobForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <JobForm />;

  const job = await db.jobListing.findUnique({ where: { id, deletedAt: null } });
  if (!job) notFound();
  return <JobForm job={job} />;
}
