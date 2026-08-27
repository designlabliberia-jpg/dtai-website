import { z } from "zod";
import { optionalCloudinaryOrRelativeUrl } from "./shared";

export const DIVISIONS = [
  "Executive",
  "Engineering",
  "Operations",
  "Directorate",
  "Management",
] as const;

export const leadershipSchema = z.object({
  memberId: z
    .string()
    .min(1, "Member ID is required")
    .max(20, "Member ID must be under 20 characters")
    .check(z.regex(/^[A-Z0-9-]+$/, "Member ID must be uppercase letters, numbers, and hyphens only")),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .check(z.regex(/^[\p{L}\p{M}'\-\s]+$/u, "Name contains invalid characters")),

  title: z.string().min(1, "Title is required").max(150).trim(),

  division: z.enum(DIVISIONS, { error: "Select a valid division" }),

  focus: z
    .string()
    .min(1, "Focus is required")
    .max(200, "Focus must be under 200 characters")
    .trim(),

  bio: z
    .string()
    .min(1, "Bio is required")
    .max(2000, "Bio must be under 2000 characters")
    .trim(),

  imageUrl: optionalCloudinaryOrRelativeUrl,

  linkedin: z
    .union([
      z.string()
        .check(z.url("Must be a valid URL"))
        .refine((v) => v.includes("linkedin.com/"), "Must be a LinkedIn URL"),
      z.literal(""),
    ])
    .optional()
    .transform((v) => v || undefined),

  order: z.number().int().min(0).default(0),
});

export type LeadershipInput = z.infer<typeof leadershipSchema>;
