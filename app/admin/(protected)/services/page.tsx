import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServicesTable } from "./ServicesTable";

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { methodology: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Services"
        description="Manage service offerings and methodology steps."
        action={
          <Link href="/admin/services/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            <Plus size={13} />New Service
          </Link>
        }
      />
      <Panel accent padding="none">
        <ServicesTable services={services} />
      </Panel>
    </div>
  );
}
