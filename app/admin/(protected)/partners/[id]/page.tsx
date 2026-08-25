import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PartnerForm } from "../PartnerForm";

interface Props { params: Promise<{ id: string }>; }

export default async function PartnerPage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <PartnerForm />;

  const partner = await db.partner.findUnique({ where: { id, deletedAt: null } });
  if (!partner) notFound();
  return <PartnerForm partner={partner} />;
}
