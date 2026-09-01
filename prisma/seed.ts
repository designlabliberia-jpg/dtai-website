import "dotenv/config";
import { PrismaClient } from ".prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { products } from "../lib/products-data";
import { services } from "../lib/services-data";
import { solutions } from "../lib/solutions-data";
import { leadershipTeam } from "../lib/leadership-data";
import { partnerLogo, partnerCategories } from "../lib/partners-data";
import { jobListings, careerProfile } from "../lib/careers-data";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  // ─── Admin User ───────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("Admin123", 12);
  await db.adminUser.upsert({
    where: { email: "admin@dtai.lr" },
    update: {},
    create: { email: "admin@dtai.lr", passwordHash, role: "super_admin", name: "Garrison Sayor" },
  });
  console.log("✓ AdminUser seeded");

  // ─── Site Settings ────────────────────────────────────────────────────────
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

  // ─── Products ─────────────────────────────────────────────────────────────
  for (const [i, p] of products.entries()) {
    await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        status: p.status,
        features: p.features,
        builtFor: p.builtFor,
        profileEyebrow: p.profile.eyebrow,
        profileHeading: p.profile.heading,
        profileHeadingAccent: p.profile.headingAccent ?? null,
        profileParagraphs: p.profile.paragraphs,
        profilePrimaryImageUrl: p.profile.collage.primary.src,
        profilePrimaryImageAlt: p.profile.collage.primary.alt,
        profileSecondaryImageUrl: p.profile.collage.secondary?.src ?? null,
        profileSecondaryImageAlt: p.profile.collage.secondary?.alt ?? null,
        published: false,
        order: i,
      },
    });
  }
  console.log(`✓ ${products.length} Products seeded`);

  // ─── Services ─────────────────────────────────────────────────────────────
  for (const [i, s] of services.entries()) {
    const existing = await db.service.findUnique({ where: { slug: s.slug } });
    if (!existing) {
      await db.service.create({
        data: {
          slug: s.slug,
          icon: s.icon,
          profileEyebrow: s.profile.eyebrow,
          profileHeading: s.profile.heading,
          profileHeadingAccent: s.profile.headingAccent ?? null,
          profileParagraphs: s.profile.paragraphs,
          profilePrimaryImageUrl: s.profile.collage.primary.src,
          profilePrimaryImageAlt: s.profile.collage.primary.alt,
          published: true,
          order: i,
          methodology: {
            create: s.methodology.map((step, j) => ({
              title: step.title,
              description: step.description,
              icon: step.icon,
              order: j,
            })),
          },
        },
      });
    }
  }
  console.log(`✓ ${services.length} Services seeded`);

  // ─── Solutions ────────────────────────────────────────────────────────────
  for (const [i, sol] of solutions.entries()) {
    const existing = await db.solution.findFirst({ where: { title: sol.title, deletedAt: null } });
    if (!existing) {
      await db.solution.create({
        data: { title: sol.title, summary: sol.summary, published: true, order: i },
      });
    }
  }
  console.log(`✓ ${solutions.length} Solutions seeded`);

  // ─── Leadership ───────────────────────────────────────────────────────────
  for (const [i, m] of leadershipTeam.entries()) {
    await db.leadershipMember.upsert({
      where: { memberId: m.id },
      update: {},
      create: {
        memberId: m.id,
        name: m.name,
        title: m.title,
        division: m.division,
        focus: m.focus,
        bio: m.bio,
        imageUrl: m.image ?? null,
        linkedin: m.linkedin || null,
        order: i,
      },
    });
  }
  console.log(`✓ ${leadershipTeam.length} Leadership members seeded`);

  // ─── Partners (logos) ─────────────────────────────────────────────────────
  for (const [i, p] of partnerLogo.entries()) {
    await db.partner.upsert({
      where: { slug: `logo-${i}` },
      update: {},
      create: {
        title: p.title,
        logoUrl: p.src,
        type: "logo",
        slug: `logo-${i}`,
        order: i,
      },
    });
  }
  console.log(`✓ ${partnerLogo.length} Partner logos seeded`);

  // ─── Partners (categories) ────────────────────────────────────────────────
  for (const [i, p] of partnerCategories.entries()) {
    await db.partner.upsert({
      where: { slug: p.slug! },
      update: {},
      create: {
        title: p.title,
        logoUrl: p.src,
        type: "category",
        slug: p.slug!,
        summary: p.summary ?? null,
        points: p.points ?? [],
        order: i,
      },
    });
  }
  console.log(`✓ ${partnerCategories.length} Partner categories seeded`);

  // ─── Job Listings ─────────────────────────────────────────────────────────
  for (const [i, j] of jobListings.entries()) {
    await db.jobListing.upsert({
      where: { slug: j.id },
      update: {},
      create: {
        slug: j.id,
        title: j.title,
        description: j.description,
        location: j.location,
        type: j.type,
        category: j.category,
        minQualifications: j.minQualifications ?? [],
        preferredQualifications: j.preferredQualifications ?? [],
        aboutJob: j.aboutJob ?? null,
        active: true,
        order: i,
      },
    });
  }
  console.log(`✓ ${jobListings.length} Job listings seeded`);

  // ─── Careers Page Profile ─────────────────────────────────────────────────
  await db.pageProfileSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      careersEyebrow: careerProfile.eyebrow,
      careersHeading: careerProfile.heading,
      careersHeadingAccent: careerProfile.headingAccent ?? "",
      careersParagraphs: careerProfile.paragraphs,
      careersPrimaryImageUrl: careerProfile.collage.primary.src,
      careersPrimaryImageAlt: careerProfile.collage.primary.alt,
    },
  });
  console.log("✓ Careers page profile seeded");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
