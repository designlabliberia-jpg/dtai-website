import { db } from "@/lib/db";
import { Mail, Briefcase, Users } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminDashboard() {
  const [newContacts, newApplications, pipelineLeads] = await Promise.all([
    db.contactSubmission.count({ where: { status: "new", deletedAt: null } }),
    db.jobApplication.count({ where: { status: "new", deletedAt: null } }),
    db.client.count({ where: { status: "lead", deletedAt: null } }),
  ]);

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of pending items across the platform." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="New contacts" value={newContacts} icon={Mail} />
        <StatCard label="New applications" value={newApplications} icon={Briefcase} />
        <StatCard label="Pipeline leads" value={pipelineLeads} icon={Users} />
      </div>
    </>
  );
}
