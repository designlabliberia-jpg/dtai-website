import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PipelineForm } from "../PipelineForm";
import { StatusStepper } from "./StatusStepper";
import { NotesThread } from "./NotesThread";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PipelineDetailPage({ params }: Props) {
  const { id } = await params;

  const client = await db.client.findUnique({
    where: { id, deletedAt: null },
    include: {
      notes: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) notFound();

  return (
    <div className="flex flex-col gap-6">
      <StatusStepper clientId={client.id} currentStatus={client.status} />
      <PipelineForm client={client} />
      <NotesThread clientId={client.id} notes={client.notes} />
    </div>
  );
}
