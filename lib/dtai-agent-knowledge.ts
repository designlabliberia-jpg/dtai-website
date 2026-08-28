import { services } from "@/lib/services-data";
import { industries } from "@/lib/industries-data";
import { solutions } from "@/lib/solutions-data";
import { leadershipTeam } from "@/lib/leadership-data";
import { governancePages } from "@/lib/governance-data";
import { partnerCategories } from "@/lib/partners-data";
import { caseStudies } from "@/lib/case-studies-data";
import { products } from "@/lib/products-data";

export function buildDtaiKnowledgeBase(): string {
  const sections: string[] = [];

  sections.push(
    `DTAI (Digital Technology Associates Inc.) is an African-owned engineering company building secure, scalable, mission-critical digital systems for governments, institutions, and enterprises. DTAI operates as a digital infrastructure builder, a government technology partner, and an enterprise systems engineering company. Work spans election technology, public sector platforms, spatial systems, and custom institutional software. DTAI remains authentically African and sovereign in how it builds, while holding itself to internationally recognized engineering standards.`
  );

  sections.push(
    "ENGINEERING CAPABILITIES:\n" +
      services
        .map((c) => `- ${c.profile.eyebrow}: ${c.profile.paragraphs[0]}`)
        .join("\n")
  );

  sections.push(
    "SOLUTIONS:\n" +
      solutions
        .map((s) => `- ${s.title}: ${s.summary}`)
        .join("\n")
  );

  sections.push(
    "INDUSTRIES SERVED:\n" +
      industries
        .map((i) => `- ${i.title}: ${i.summary} Key needs addressed: ${i.keyNeeds.join(", ")}.`)
        .join("\n")
  );

  sections.push(
    "LEADERSHIP TEAM:\n" +
      leadershipTeam
        .map((l) => `- ${l.name}, ${l.title}: ${l.bio}`)
        .join("\n")
  );

  sections.push(
    "FLAGSHIP PRODUCTS:\n" +
      products
        .map((p) => `- ${p.name}: ${p.description} Features: ${p.features.join(", ")}.`)
        .join("\n")
  );

  sections.push(
    "SECURITY & GOVERNANCE:\n" +
      governancePages
        .map((g) => `- ${g.title}: ${g.summary}`)
        .join("\n")
  );

  sections.push(
    "PARTNERS & ECOSYSTEM:\n" +
      partnerCategories
        .map((p) => `- ${p.title}: ${p.summary}`)
        .join("\n")
  );

  if (caseStudies.length > 0) {
    sections.push(
      "CASE STUDIES:\n" +
        caseStudies.map((c) => `- ${c.title}: ${c.challenge}`).join("\n")
    );
  } else {
    sections.push(
      "CASE STUDIES: None are currently published on the site. If asked for case studies or references, say documented case studies are in preparation and offer to connect the visitor with the team via the Contact page for project references."
    );
  }

  return sections.join("\n\n");
}
