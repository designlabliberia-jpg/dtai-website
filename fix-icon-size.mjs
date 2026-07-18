import fs from "fs";

const path = "components/enterprise/SectorSpotlight.tsx";
let content = fs.readFileSync(path, "utf8");

const oldBadge = `              className="absolute inset-0 flex items-center justify-center rounded-full bg-white/5"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                <Image
                  src={sector.src}
                  alt={sector.name}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
            </motion.div>`;

const newBadge = `              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-white/5"
            >
              <div className="relative h-36 w-36 scale-125 sm:h-44 sm:w-44">
                <Image
                  src={sector.src}
                  alt={sector.name}
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
            </motion.div>`;

if (content.includes(oldBadge)) {
  content = content.replace(oldBadge, newBadge);
  fs.writeFileSync(path, content);
  console.log("Applied — icon container enlarged and cropped to fill circle");
} else {
  console.log("WARNING: exact block not found — printing current content around the icon area");
  const idx = content.indexOf("h-24 w-24");
  console.log(content.slice(Math.max(0, idx - 300), idx + 300));
}
