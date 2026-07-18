import fs from "fs";

const path = "components/enterprise/SectorsParallaxBackdrop.tsx";
let content = fs.readFileSync(path, "utf8");

const old = `    <div ref={ref} className="relative overflow-hidden rounded-lg">`;
const updated = `    <div ref={ref} className="relative isolate overflow-hidden rounded-lg">`;

if (content.includes(old)) {
  content = content.replace(old, updated);
  fs.writeFileSync(path, content);
  console.log("Applied — added isolate to fix stacking context");
} else {
  console.log("WARNING: exact string not found — printing current content for inspection");
  console.log(content);
}
