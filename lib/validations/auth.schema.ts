import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email is too long")
    .check(z.email("Enter a valid email address"))
    .refine((v) => !v.includes(" "), "Email must not contain spaces")
    .transform((v) => v.toLowerCase().trim()),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
