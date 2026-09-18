import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/rbac";
import { db } from "@/lib/db";
import { RoleForm } from "../RoleForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RolePage({ params }: Props) {
  await requirePermission("roles:write");
  const { id } = await params;

  if (id === "new") return <RoleForm />;

  const role = await db.role.findUnique({ where: { id } });
  if (!role) notFound();

  return (
    <RoleForm
      role={{
        id: role.id,
        name: role.name,
        label: role.label,
        isSystem: role.isSystem,
        permissions: (role.permissions ?? {}) as Record<string, boolean>,
      }}
    />
  );
}
