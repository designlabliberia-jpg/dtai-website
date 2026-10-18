import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/rbac";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserForm } from "../UserForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: Props) {
  await requirePermission("users:write");
  const { id } = await params;

  const [roles, leadershipMembers] = await Promise.all([
    db.role.findMany({ orderBy: { label: "asc" }, select: { id: true, name: true, label: true } }),
    db.leadershipMember.findMany({
      where: { deletedAt: null },
      select: { id: true, name: true, title: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const session = await getSession();

  if (id === "new") return <UserForm roles={roles} leadershipMembers={leadershipMembers} />;

  const user = await db.adminUser.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, roleId: true, leadershipMemberId: true },
  });
  if (!user) notFound();

  return (
    <UserForm
      roles={roles}
      leadershipMembers={leadershipMembers}
      user={{ id: user.id, name: user.name, email: user.email, roleId: user.roleId ?? "", leadershipMemberId: user.leadershipMemberId }}
      isSelf={session.adminId === user.id}
    />
  );
}
