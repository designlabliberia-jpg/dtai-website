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

  const roles = await db.role.findMany({
    orderBy: { label: "asc" },
    select: { id: true, name: true, label: true },
  });

  const session = await getSession();

  if (id === "new") return <UserForm roles={roles} />;

  const user = await db.adminUser.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, roleId: true },
  });
  if (!user) notFound();

  return (
    <UserForm
      roles={roles}
      user={{ id: user.id, name: user.name, email: user.email, roleId: user.roleId ?? "" }}
      isSelf={session.adminId === user.id}
    />
  );
}
