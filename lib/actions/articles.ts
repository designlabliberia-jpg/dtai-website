"use server";

import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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

  const serviceId = data.serviceSlug
    ? (await db.service.findUnique({ where: { slug: data.serviceSlug }, select: { id: true } }))?.id ?? null
    : null;

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
      serviceId,
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
      serviceId,
      coverImageUrl: data.coverImageUrl,
      likes: data.likes,
      published: data.published,
    },
  });

  revalidatePath("/insights");
  revalidatePath("/");

  return { ok: true };
}

export async function syncAllArticlesFromSanity(): Promise<{ ok: boolean; count?: number; error?: string }> {
  try {
    const articles = await client.fetch<Array<{
      _id: string; slug: string; title: string; category: string;
      publishDate: string; author: string; summary: string;
      sections: { _key: string; _type: string; heading?: string; body: string }[] | null;
      serviceSlug: string | null; coverImage: object;
      likes: number | null; published: boolean | null;
    }>>(
      `*[_type == "article"] { _id, "slug": slug.current, title, category, publishDate, author, summary, sections, serviceSlug, coverImage, likes, published }`
    );

    const serviceSlugMap = new Map(
      (await db.service.findMany({ where: { deletedAt: null }, select: { id: true, slug: true } }))
        .map((s) => [s.slug, s.id])
    );

    await Promise.all(
      articles.map((a) => {
        const shared = {
          slug: a.slug, title: a.title, category: a.category,
          publishDate: a.publishDate, author: a.author, summary: a.summary,
          sections: (a.sections ?? []) as object[],
          serviceId: a.serviceSlug ? (serviceSlugMap.get(a.serviceSlug) ?? null) : null,
          coverImageUrl: urlFor(a.coverImage).width(800).auto("format").url(),
          likes: a.likes ?? 0,
        };
        return db.article.upsert({
          where: { sanityId: a._id },
          update: shared,
          create: { sanityId: a._id, published: a.published ?? false, ...shared },
        });
      })
    );

    revalidatePath("/admin/news");
    return { ok: true, count: articles.length };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
