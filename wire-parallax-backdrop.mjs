import fs from "fs";

const path = "components/enterprise/PartnerCard.tsx";
let content = fs.readFileSync(path, "utf8");

const oldImport = `import { PartnerSliderLazy } from "@/components/enterprise/PartnerSliderLazy";`;
const newImport = `import { PartnerSliderLazy } from "@/components/enterprise/PartnerSliderLazy";
import { SectorsParallaxBackdrop } from "@/components/enterprise/SectorsParallaxBackdrop";`;

const oldBlock = `          {/* Right — 40% */}
          <div className="-mx-6 sm:mx-0">
            <PartnerSliderLazy logos={partnerLogos} />
          </div>`;

const newBlock = `          {/* Right — 40% */}
          <div className="-mx-6 sm:mx-0">
            <SectorsParallaxBackdrop>
              <PartnerSliderLazy logos={partnerLogos} />
            </SectorsParallaxBackdrop>
          </div>`;

let changes = 0;

if (content.includes(oldImport)) {
  content = content.replace(oldImport, newImport);
  changes++;
} else {
  console.log("WARNING: import line not found — no changes made to imports");
}

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  changes++;
} else {
  console.log("WARNING: marquee block not found — no changes made there");
}

fs.writeFileSync(path, content);
console.log(`Applied ${changes} of 2 expected changes to ${path}`);
