import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LeadershipTable } from "./LeadershipTable";

export default async function LeadershipPage() {
  const members = await db.leadershipMember.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Leadership"
        description="Manage team members displayed on the company page."
        action={
          <Link
            href="/admin/leadership/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Member
          </Link>
        }
      />
      <Panel accent padding="none">
        <LeadershipTable members={members} />
      </Panel>
    </div>
  );
}
