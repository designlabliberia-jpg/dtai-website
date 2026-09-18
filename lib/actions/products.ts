"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, can } from "@/lib/rbac";
import { productSchema } from "@/lib/validations/product.schema";
import { submitForApproval } from "./approvals";

export type ProductActionState =
  | { success: true; id?: string; pendingApproval?: boolean }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseProduct(formData: FormData) {
  return productSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    status: (formData.get("status") as string) || "In Development",
    features: formData.getAll("features"),
    builtFor: formData.getAll("builtFor"),
    serviceId: (formData.get("serviceId") as string) || undefined,
    profileEyebrow: formData.get("profileEyebrow"),
    profileHeading: formData.get("profileHeading"),
    profileHeadingAccent: formData.get("profileHeadingAccent") || undefined,
    profileParagraphs: formData.getAll("profileParagraphs"),
    profilePrimaryImageUrl: formData.get("profilePrimaryImageUrl"),
    profilePrimaryImageAlt: formData.get("profilePrimaryImageAlt"),
    profileSecondaryImageUrl: formData.get("profileSecondaryImageUrl") || undefined,
    profileSecondaryImageAlt: formData.get("profileSecondaryImageAlt") || undefined,
    published: formData.get("published") === "true",
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createProduct(
  _prev: ProductActionState | null,
  formData: FormData
): Promise<ProductActionState> {
  const user = await requirePermission("products:write");
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const canPublish = can(user, "products:publish");
  const product = await db.product.create({
    data: { ...parsed.data, published: canPublish ? parsed.data.published : false },
  });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("product", product.id, parsed.data.name);
    revalidatePath("/admin/products");
    return { success: true, id: product.id, pendingApproval: true };
  }
  revalidatePath("/admin/products");
  return { success: true, id: product.id };
}

export async function updateProduct(
  id: string,
  _prev: ProductActionState | null,
  formData: FormData
): Promise<ProductActionState> {
  const user = await requirePermission("products:write");
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const canPublish = can(user, "products:publish");
  await db.product.update({
    where: { id },
    data: { ...parsed.data, published: canPublish ? parsed.data.published : false },
  });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("product", id, parsed.data.name);
    revalidatePath("/admin/products");
    return { success: true, pendingApproval: true };
  }
  revalidatePath("/admin/products");
  return { success: true };
}

export async function toggleProductPublished(id: string, value: boolean): Promise<void> {
  await requirePermission("products:publish");
  await db.product.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  await requirePermission("products:delete");
  await db.product.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/products");
}
