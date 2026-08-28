import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PipelineTable } from "./PipelineTable";

export default async function PipelinePage() {
  const clients = await db.client.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { notes: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Client Pipeline"
        description="Track prospects from lead to close."
        action={
          <Link
            href="/admin/pipeline/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Client
          </Link>
        }
      />
      <Panel accent padding="none">
        <PipelineTable clients={clients} />
      </Panel>
    </div>
  );
}
