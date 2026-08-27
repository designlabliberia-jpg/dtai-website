"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product.schema";

export type ProductActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseProduct(formData: FormData) {
  return productSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    status: (formData.get("status") as string) || "In Development",
    imageUrl: formData.get("imageUrl"),
    features: formData.getAll("features"),
    builtFor: formData.getAll("builtFor"),
    relatedCapabilities: formData.getAll("relatedCapabilities"),
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
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const product = await db.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  return { success: true, id: product.id };
}

export async function updateProduct(
  id: string,
  _prev: ProductActionState | null,
  formData: FormData
): Promise<ProductActionState> {
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.product.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/products");
  return { success: true };
}

export async function toggleProductPublished(id: string, value: boolean): Promise<void> {
  await db.product.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  await db.product.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/products");
}
