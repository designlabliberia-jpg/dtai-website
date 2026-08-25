import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { JobActions } from "./JobActions";

export default async function JobsPage() {
  const jobs = await db.jobListing.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Job Listings"
        description="Manage open positions published to the careers page."
        action={
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Job
          </Link>
        }
      />
      <Panel accent padding="none">
        <AdminTable
          rows={jobs}
          getRowKey={(r) => r.id}
          emptyMessage="No job listings yet."
          columns={[
            {
              key: "title",
              header: "Title",
              render: (r) => (
                <Link
                  href={`/admin/jobs/${r.id}`}
                  className="font-medium transition-colors"
                  style={{ color: "var(--admin-text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
                >
                  {r.title}
                </Link>
              ),
            },
            {
              key: "meta",
              header: "Type / Category",
              render: (r) => (
                <div className="flex flex-col gap-0.5">
                  <span style={{ color: "var(--admin-text-primary)" }}>{r.type}</span>
                  <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>{r.category}</span>
                </div>
              ),
            },
            {
              key: "location",
              header: "Location",
              render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.location}</span>,
            },
            {
              key: "apps",
              header: "Applications",
              width: "110px",
              render: (r) => (
                <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-primary)" }}>
                  {r._count.applications}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              width: "100px",
              render: (r) => <StatusBadge status={r.active ? "active" : "inactive"} />,
            },
            {
              key: "actions",
              header: "",
              width: "80px",
              render: (r) => <JobActions id={r.id} active={r.active} />,
            },
          ]}
        />
      </Panel>
    </div>
  );
}
