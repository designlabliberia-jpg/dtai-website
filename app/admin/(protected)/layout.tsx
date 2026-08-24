import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.adminId) redirect("/admin/login");

  const user = await db.adminUser.findUnique({
    where: { id: session.adminId },
    select: { name: true, email: true, role: true },
  });
  if (!user) redirect("/admin/login");

  const [unreadContacts, unreadApplications] = await Promise.all([
    db.contactSubmission.count({ where: { status: "new", deletedAt: null } }),
    db.jobApplication.count({ where: { status: "new", deletedAt: null } }),
  ]);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <AdminSidebar
        unreadContacts={unreadContacts}
        unreadApplications={unreadApplications}
        role={user.role}
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
