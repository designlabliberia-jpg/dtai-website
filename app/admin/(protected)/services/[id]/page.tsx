import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ServiceForm } from "../ServiceForm";

interface Props { params: Promise<{ id: string }>; }

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <ServiceForm />;

  const service = await db.service.findUnique({
    where: { id, deletedAt: null },
    include: { methodology: { orderBy: { order: "asc" } } },
  });
  if (!service) notFound();
  return <ServiceForm service={service} />;
}
