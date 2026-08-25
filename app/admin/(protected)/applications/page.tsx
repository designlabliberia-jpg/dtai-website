import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ApplicationActions } from "./ApplicationActions";

export default async function ApplicationsPage() {
  const applications = await db.jobApplication.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { jobListing: { select: { title: true } } },
  });

  return (
    <>
      <AdminPageHeader
        title="Job Applications"
        description="All applications submitted through the careers form."
      />
      <AdminTable
        rows={applications}
        getRowKey={(r) => r.id}
        emptyMessage="No applications yet."
        columns={[
          {
            key: "name",
            header: "Applicant",
            render: (r) => <span className="font-medium" style={{ color: "var(--admin-text-primary)" }}>{r.fullName}</span>,
          },
          {
            key: "email",
            header: "Email",
            render: (r) => <span style={{ color: "var(--admin-text-muted)" }}>{r.email}</span>,
          },
          {
            key: "role",
            header: "Role",
            render: (r) => r.jobListing.title,
          },
          {
            key: "status",
            header: "Status",
            width: "140px",
            render: (r) => <StatusBadge status={r.status} />,
          },
          {
            key: "date",
            header: "Applied",
            width: "140px",
            render: (r) =>
              new Date(r.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
          },
          {
            key: "actions",
            header: "",
            width: "80px",
            render: (r) => <ApplicationActions id={r.id} status={r.status} />,
          },
        ]}
      />
    </>
  );
}
