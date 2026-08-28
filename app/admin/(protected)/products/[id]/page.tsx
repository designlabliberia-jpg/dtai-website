import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "../ProductForm";

interface Props { params: Promise<{ id: string }>; }

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const services = await db.service.findMany({
    where: { deletedAt: null },
    orderBy: { order: "asc" },
    select: { id: true, profileEyebrow: true, slug: true },
  });

  if (id === "new") return <ProductForm services={services} />;

  const product = await db.product.findUnique({ where: { id, deletedAt: null } });
  if (!product) notFound();
  return <ProductForm product={product} services={services} />;
}
