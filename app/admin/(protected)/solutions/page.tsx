import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { ContentActions } from "@/components/admin/ContentActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { toggleSolutionPublished, deleteSolution } from "@/lib/actions/solutions";

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
        <AdminTable
          rows={solutions}
          getRowKey={(r) => r.id}
          emptyMessage="No solutions yet."
          columns={[
            {
              key: "title", header: "Title",
              render: (r) => (
                <Link href={`/admin/solutions/${r.id}`}
                  className="font-medium transition-colors"
                  style={{ color: "var(--admin-text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}>
                  {r.title}
                </Link>
              ),
            },
            { key: "summary", header: "Summary", render: (r) => <span className="line-clamp-1 text-sm" style={{ color: "var(--admin-text-secondary)" }}>{r.summary}</span> },
            { key: "published", header: "Published", width: "100px", render: (r) => <StatusBadge status={r.published ? "Live" : "inactive"} /> },
            {
              key: "actions", header: "", width: "100px",
              render: (r) => (
                <ContentActions id={r.id} editHref={`/admin/solutions/${r.id}`}
                  published={r.published} onToggle={toggleSolutionPublished} onDelete={deleteSolution} />
              ),
            },
          ]}
        />
      </Panel>
    </div>
  );
}
