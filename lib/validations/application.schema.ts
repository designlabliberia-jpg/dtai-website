import { z } from "zod";

export const JOB_SLUGS = [
  "software-engineer",
  "engineering-manager",
  "gis-specialist",
  "product-designer",
  "cybersecurity-analyst",
  "ai-ml-engineer",
  "project-manager",
] as const;

export type JobSlug = (typeof JOB_SLUGS)[number];

const e164Phone = z
  .string()
  .check(z.regex(/^\+[1-9]\d{6,14}$/, "Phone must be in E.164 format (e.g. +2319876543)"));

const httpsUrl = z
  .string()
  .check(z.url("Must be a valid URL"))
  .refine((v) => v.startsWith("https://"), "URL must use HTTPS");

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters")
    .check(z.regex(/^[\p{L}\p{M}'\-\s]+$/u, "Full name contains invalid characters")),

  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be under 254 characters")
    .check(z.email("Enter a valid email address"))
    .transform((v) => v.toLowerCase().trim()),

  phone: z
    .union([e164Phone, z.literal("")])
    .optional()
    .transform((v) => v || undefined),

  role: z.enum(JOB_SLUGS, { error: "Select a valid role" }),

  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters")
    .max(3000, "Cover letter must be under 3000 characters")
    .trim(),

  resumeUrl: z
    .union([httpsUrl, z.literal("")])
    .optional()
    .transform((v) => v || undefined),

  linkedinUrl: z
    .union([
      httpsUrl.refine((v) => v.includes("linkedin.com/"), "Must be a LinkedIn URL"),
      z.literal(""),
    ])
    .optional()
    .transform((v) => v || undefined),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
