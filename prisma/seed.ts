import { PrismaClient } from ".prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("Admin123", 12);
  await db.adminUser.upsert({
    where: { email: "admin@dtai.lr" },
    update: {},
    create: {
      email: "admin@dtai.lr",
      passwordHash,
      role: "super_admin",
      name: "DTAI Admin",
    },
  });
  console.log("✓ AdminUser seeded");

  await db.siteSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      name: "DTAI",
      fullName: "Digital Technology Associates Inc",
      tagline: "Your Trusted Partner in Digital Innovation and Sustainable Solutions",
      description:
        "DTAI is a Liberian technology company where advanced software engineering meets environmental purpose, that empower governments, businesses, healthcare institutions, non-governmental organizations, and communities across Liberia and Africa.",
      logoUrl: "/assets/dtai-logo.png",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtai.designlab.technology",
      contactEmail: "info@dtai.lr",
      whatsappNumber: "",
      web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
    },
  });

  console.log("✓ SiteSettings seeded");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
