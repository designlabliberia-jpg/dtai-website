import { z } from "zod";
import { cloudinaryOrRelativeUrl } from "./shared";

const nonEmptyStringArray = z
  .array(z.string().min(1).max(200))
  .min(1, "At least one item is required");

export const serviceSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),

  icon: z.string().min(1, "Icon is required").max(50).trim(),

  profileEyebrow: z.string().min(1, "Eyebrow is required").max(100).trim(),
  profileHeading: z.string().min(1, "Heading is required").max(150).trim(),
  profileHeadingAccent: z.string().max(150).trim().optional(),
  profileParagraphs: nonEmptyStringArray.max(10, "Maximum 10 paragraphs allowed"),
  profilePrimaryImageUrl: cloudinaryOrRelativeUrl,
  profilePrimaryImageAlt: z.string().min(1, "Alt text is required").max(200).trim(),

  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
