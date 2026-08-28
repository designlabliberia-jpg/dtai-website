import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SolutionsTable } from "./SolutionsTable";

export default async function SolutionsPage() {
  const solutions = await db.solution.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Solutions"
        description="Manage industry and use-case solutions."
        action={
          <Link href="/admin/solutions/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            <Plus size={13} />New Solution
          </Link>
        }
      />
      <Panel accent padding="none">
        <SolutionsTable solutions={solutions} />
      </Panel>
    </div>
  );
}
