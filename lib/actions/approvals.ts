"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, requireAuth } from "@/lib/rbac";

export type ApprovalActionState =
  | { success: true }
  | { success: false; error: string };

export async function submitForApproval(
  entityType: string,
  entityId: string,
  entityTitle: string
): Promise<ApprovalActionState> {
  const user = await requireAuth();

  await db.contentApproval.upsert({
    where: { entityType_entityId: { entityType, entityId } },
    update: { status: "pending", requestedById: user.id, reviewedById: null, note: null, entityTitle },
    create: { entityType, entityId, entityTitle, status: "pending", requestedById: user.id },
  });

  revalidatePath("/admin/approvals");
  return { success: true };
}

export async function reviewApproval(
  approvalId: string,
  status: "approved" | "rejected",
  note?: string
): Promise<ApprovalActionState> {
  const user = await requirePermission("approvals:review");

  const approval = await db.contentApproval.findUnique({ where: { id: approvalId } });
  if (!approval) return { success: false, error: "Approval record not found." };

  await db.contentApproval.update({
    where: { id: approvalId },
    data: { status, reviewedById: user.id, note: note ?? null },
  });

  if (status === "approved") {
    const publishField = { published: true };
    switch (approval.entityType) {
      case "product":  await db.product.update({ where: { id: approval.entityId }, data: publishField }); break;
      case "service":  await db.service.update({ where: { id: approval.entityId }, data: publishField }); break;
      case "solution": await db.solution.update({ where: { id: approval.entityId }, data: publishField }); break;
      case "article":  await db.article.update({ where: { id: approval.entityId }, data: publishField }); break;
    }
  }

  revalidatePath("/admin/approvals");
  revalidatePath(`/admin/${approval.entityType}s`);
  return { success: true };
}

export async function getApprovalStatus(entityType: string, entityId: string) {
  return db.contentApproval.findUnique({
    where: { entityType_entityId: { entityType, entityId } },
    select: { id: true, status: true, note: true },
  });
}
