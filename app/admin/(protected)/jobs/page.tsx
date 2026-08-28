import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { JobsTable } from "./JobsTable";

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
        <JobsTable jobs={jobs} />
      </Panel>
    </div>
  );
}
