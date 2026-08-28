import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContactTable } from "./ContactTable";

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
      <ContactTable submissions={submissions} />
    </>
  );
}
