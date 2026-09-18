import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .max(254)
    .check(z.email("Enter a valid email"))
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  roleId: z.string().min(1, "Role is required"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .max(254)
    .check(z.email("Enter a valid email"))
    .transform((v) => v.toLowerCase().trim()),
  roleId: z.string().min(1, "Role is required"),
  password: z.string().max(128).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
