import { requirePermission } from "@/lib/rbac";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ApprovalsTable } from "./ApprovalsTable";

export default async function ApprovalsPage() {
  await requirePermission("approvals:review");

  const approvals = await db.contentApproval.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  const requesterIds = [...new Set(approvals.map((a) => a.requestedById))];
  const requesters = await db.adminUser.findMany({
    where: { id: { in: requesterIds } },
    select: { id: true, name: true },
  });
  const requesterMap = Object.fromEntries(requesters.map((u) => [u.id, u]));

  const rows = approvals.map((a) => ({
    ...a,
    status: a.status as "pending" | "approved" | "rejected",
    requester: requesterMap[a.requestedById],
  }));

  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Approval Queue"
        description={pendingCount > 0 ? `${pendingCount} item${pendingCount > 1 ? "s" : ""} awaiting review.` : "All content is up to date."}
      />
      <ApprovalsTable approvals={rows} />
    </div>
  );
}
