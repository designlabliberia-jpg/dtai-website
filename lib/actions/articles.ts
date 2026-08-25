"use server";

import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { webhookArticleSchema } from "@/lib/validations/webhook.schema";

export async function deleteArticle(sanityId: string): Promise<void> {
  await db.article.update({ where: { sanityId }, data: { deletedAt: new Date() } });
}

export async function toggleArticlePublished(id: string, value: boolean): Promise<void> {
  await db.article.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/news");
}

export async function syncArticleFromWebhook(
  rawBody: string,
  signature: string
): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return { ok: false, error: "Webhook secret not configured" };

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(signature.replace(/^sha256=/, ""), "hex");

  if (
    expectedBuf.length !== receivedBuf.length ||
    !timingSafeEqual(expectedBuf, receivedBuf)
  ) {
    return { ok: false, error: "Invalid signature" };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return { ok: false, error: "Invalid JSON payload" };
  }

  const parsed = webhookArticleSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  await db.article.upsert({
    where: { sanityId: data._id },
    update: {
      slug: data.slug.current,
      title: data.title,
      category: data.category,
      publishDate: data.publishDate,
      author: data.author,
      summary: data.summary,
      sections: data.sections,
      relatedCapabilities: data.relatedCapabilities,
      coverImageUrl: data.coverImageUrl,
      likes: data.likes,
      published: data.published,
    },
    create: {
      sanityId: data._id,
      slug: data.slug.current,
      title: data.title,
      category: data.category,
      publishDate: data.publishDate,
      author: data.author,
      summary: data.summary,
      sections: data.sections,
      relatedCapabilities: data.relatedCapabilities,
      coverImageUrl: data.coverImageUrl,
      likes: data.likes,
      published: data.published,
    },
  });

  revalidatePath("/insights");
  revalidatePath("/");

  return { ok: true };
}
