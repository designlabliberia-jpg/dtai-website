import fs from "fs";

const path = "app/(marketing)/services/[slug]/page.tsx";
let content = fs.readFileSync(path, "utf8");

let changes = 0;

// 1. Add imports
const oldImports = `import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { services, getServiceBySlug } from "@/lib/services-data";
import { serviceIconMap } from "@/components/enterprise/ServiceCard";`;

const newImports = `import Image from "next/image";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { ReportMockup } from "@/components/enterprise/ReportMockup";
import { services, getServiceBySlug } from "@/lib/services-data";
import { serviceIconMap } from "@/components/enterprise/ServiceCard";`;

if (content.includes(oldImports)) {
  content = content.replace(oldImports, newImports);
  changes++;
} else {
  console.log("WARNING: imports block not found");
}

// 2. Add hero image right after the PageHeroBanner
const oldHeroBlock = `      <PageHeroBanner eyebrow="Service" title={service.title} subtitle={service.summary} icon={Icon} />

      <section className="bg-white py-24">
        <Container className="max-w-3xl">
          {service.solutions.length > 0 && (`;

const newHeroBlock = `      <PageHeroBanner eyebrow="Service" title={service.title} subtitle={service.summary} icon={Icon} />

      <section className="bg-white py-24">
        <Container className="max-w-3xl">
          <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-lg">
            <Image
              src={\`/assets/services/\${service.slug}.jpg\`}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              quality={70}
              className="object-cover"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(7,24,39,0) 60%, rgba(7,24,39,0.4) 100%)",
              }}
            />
          </div>

          {service.solutions.length > 0 && (`;

if (content.includes(oldHeroBlock)) {
  content = content.replace(oldHeroBlock, newHeroBlock);
  changes++;
} else {
  console.log("WARNING: hero block not found");
}

// 3. Swap CodeWindow for ReportMockup conditionally
const oldCodeBlock = `          <div className="mt-12">
            <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
              Representative Implementation Pattern
            </span>
            <CodeWindow
              filename={service.codeFilename}
              language={service.codeLang}
              code={service.codeSnippet}
            />
          </div>`;

const newCodeBlock = `          <div className="mt-12">
            {service.slug === "environmental-consulting" ? (
              <>
                <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
                  Representative Deliverable
                </span>
                <ReportMockup />
              </>
            ) : (
              <>
                <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
                  Representative Implementation Pattern
                </span>
                <CodeWindow
                  filename={service.codeFilename}
                  language={service.codeLang}
                  code={service.codeSnippet}
                />
              </>
            )}
          </div>`;

if (content.includes(oldCodeBlock)) {
  content = content.replace(oldCodeBlock, newCodeBlock);
  changes++;
} else {
  console.log("WARNING: code block not found");
}

fs.writeFileSync(path, content);
console.log(`Applied ${changes} of 3 expected changes`);
