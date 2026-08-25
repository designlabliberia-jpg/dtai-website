import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { LeadershipActions } from "./LeadershipActions";

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
        <AdminTable
          rows={members}
          getRowKey={(r) => r.id}
          emptyMessage="No leadership members yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (r) => (
                <Link
                  href={`/admin/leadership/${r.id}`}
                  className="font-medium transition-colors"
                  style={{ color: "var(--admin-text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
                >
                  {r.name}
                </Link>
              ),
            },
            {
              key: "title",
              header: "Title",
              render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.title}</span>,
            },
            {
              key: "division",
              header: "Division",
              width: "130px",
              render: (r) => (
                <span className="font-technical text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--admin-text-muted)" }}>
                  {r.division}
                </span>
              ),
            },
            {
              key: "order",
              header: "Order",
              width: "70px",
              render: (r) => (
                <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
                  {r.order}
                </span>
              ),
            },
            {
              key: "actions",
              header: "",
              width: "80px",
              render: (r) => <LeadershipActions id={r.id} />,
            },
          ]}
        />
      </Panel>
    </div>
  );
}
