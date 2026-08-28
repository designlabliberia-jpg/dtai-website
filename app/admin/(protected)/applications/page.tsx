import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ApplicationsTable } from "./ApplicationsTable";

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
      <ApplicationsTable applications={applications} />
    </>
  );
}
