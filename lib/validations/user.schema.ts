import { z } from "zod";

const str = (msg: string) =>
  z.preprocess((v) => (v == null ? "" : v), z.string({ invalid_type_error: msg }).min(1, msg));

export const createUserSchema = z.object({
  name: str("Name is required").pipe(z.string().max(100)),
  email: str("Email is required")
    .pipe(z.string().max(254).check(z.email("Enter a valid email")))
    .transform((v) => v.toLowerCase().trim()),
  password: str("Password is required").pipe(z.string().min(8, "Password must be at least 8 characters").max(128)),
  roleId: str("Please select a role"),
});

export const updateUserSchema = z.object({
  name: str("Name is required").pipe(z.string().max(100)),
  email: str("Email is required")
    .pipe(z.string().max(254).check(z.email("Enter a valid email")))
    .transform((v) => v.toLowerCase().trim()),
  roleId: str("Please select a role"),
  password: z.preprocess((v) => v || undefined, z.string().min(8, "Password must be at least 8 characters").max(128).optional()),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
