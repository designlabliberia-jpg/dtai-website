import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export interface SessionData {
  adminId?: string;
  email?: string;
}

const SESSION_OPTIONS = {
  cookieName: "dtai_admin",
  password: process.env.ADMIN_SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), SESSION_OPTIONS);
}

export async function verifyAdmin(
  email: string,
  password: string
): Promise<boolean> {
  const user = await db.adminUser.findUnique({ where: { email } });
  if (!user) return false;
  return bcrypt.compare(password, user.passwordHash);
}
