import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "../ProductForm";

interface Props { params: Promise<{ id: string }>; }

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <ProductForm />;

  const product = await db.product.findUnique({ where: { id, deletedAt: null } });
  if (!product) notFound();
  return <ProductForm product={product} />;
}
