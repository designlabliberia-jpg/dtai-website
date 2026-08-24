import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[\p{L}\p{M}'\-\s]+$/u, "Name contains invalid characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be under 254 characters")
    .check(z.email("Enter a valid email address"))
    .transform((v) => v.toLowerCase().trim()),

  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be under 150 characters")
    .trim(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;
