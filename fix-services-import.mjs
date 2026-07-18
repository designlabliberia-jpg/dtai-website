import fs from "fs";

const path = "components/enterprise/PartnerCard.tsx";
let content = fs.readFileSync(path, "utf8");

const oldImport = `import { capabilities } from "@/lib/capabilities-data";`;
const newImport = `import { services } from "@/lib/services-data";`;

const oldUsage = `{ value: String(capabilities.length), label: "Engineering Capabilities" },`;
const newUsage = `{ value: String(services.length), label: "Engineering Capabilities" },`;

let changes = 0;

if (content.includes(oldImport)) {
  content = content.replace(oldImport, newImport);
  changes++;
} else {
  console.log("WARNING: import line not found");
}

if (content.includes(oldUsage)) {
  content = content.replace(oldUsage, newUsage);
  changes++;
} else {
  console.log("WARNING: usage line not found");
}

fs.writeFileSync(path, content);
console.log(`Applied ${changes} of 2 expected changes`);
