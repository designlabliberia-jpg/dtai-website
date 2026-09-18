import { redirect } from "next/navigation";
import { requireAuth, can } from "@/lib/rbac";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedLayout({ children }: { readonly children: React.ReactNode }) {
  const user = await requireAuth();

  const showContacts     = can(user, "contact:read");
  const showApplications = can(user, "applications:read");

  const [unreadContacts, unreadApplications] = await Promise.all([
    showContacts     ? db.contactSubmission.count({ where: { status: "new", deletedAt: null } }) : Promise.resolve(0),
    showApplications ? db.jobApplication.count({ where: { status: "new", deletedAt: null } })   : Promise.resolve(0),
  ]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--admin-bg)" }}>
      <AdminSidebar
        unreadContacts={unreadContacts}
        unreadApplications={unreadApplications}
        permissions={user.role.permissions}
        roleName={user.role.name}
        userName={user.name}
        userEmail={user.email}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
