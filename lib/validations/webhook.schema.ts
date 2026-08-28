import { z } from "zod";

const sectionSchema = z.object({
  heading: z.string().max(200, "Section heading must be under 200 characters").optional(),
  body: z.string().min(1, "Section body is required").max(20000, "Section body must be under 20000 characters"),
});

export const webhookArticleSchema = z.object({
  _id: z.string().min(1, "Sanity document ID is required"),

  _type: z.literal("article", { error: "Payload must be an article document" }),

  slug: z.object({
    current: z
      .string()
      .min(1, "Slug is required")
      .max(96, "Slug must be under 96 characters")
      .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),
  }),

  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters"),

  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be under 100 characters"),

  publishDate: z
    .string()
    .check(z.regex(/^\d{4}-\d{2}-\d{2}$/, "Publish date must be in YYYY-MM-DD format")),

  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author must be under 100 characters"),

  summary: z
    .string()
    .min(1, "Summary is required")
    .max(500, "Summary must be under 500 characters"),

  sections: z
    .array(sectionSchema)
    .min(1, "At least one section is required"),

  serviceSlug: z.string().min(1).max(100).optional(),

  coverImageUrl: z
    .string()
    .min(1, "Cover image URL is required")
    .max(1000, "Cover image URL must be under 1000 characters"),

  likes: z.number().int().min(0).default(0),

  published: z.boolean().default(false),
});

export type WebhookArticlePayload = z.infer<typeof webhookArticleSchema>;
