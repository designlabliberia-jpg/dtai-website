import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContactActions } from "./ContactActions";

export default async function ContactInboxPage() {
  const submissions = await db.contactSubmission.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader
        title="Contact Inbox"
        description="Submissions from the public contact form."
      />
      <AdminTable
        rows={submissions}
        getRowKey={(r) => r.id}
        emptyMessage="No contact submissions yet."
        columns={[
          {
            key: "name",
            header: "Name",
            render: (r) => <span className="font-medium" style={{ color: "var(--admin-text-primary)" }}>{r.name}</span>,
          },
          {
            key: "email",
            header: "Email",
            render: (r) => <span style={{ color: "var(--admin-text-muted)" }}>{r.email}</span>,
          },
          {
            key: "subject",
            header: "Subject",
            render: (r) => r.subject,
          },
          {
            key: "status",
            header: "Status",
            width: "120px",
            render: (r) => <StatusBadge status={r.status} />,
          },
          {
            key: "date",
            header: "Received",
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
            render: (r) => <ContactActions id={r.id} status={r.status} />,
          },
        ]}
      />
    </>
  );
}
