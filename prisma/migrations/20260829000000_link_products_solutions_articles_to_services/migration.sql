-- Drop old columns
ALTER TABLE "Product" DROP COLUMN IF EXISTS "relatedCapabilities";
ALTER TABLE "Service" DROP COLUMN IF EXISTS "solutions";
ALTER TABLE "Article" DROP COLUMN IF EXISTS "relatedCapabilities";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "overview";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "focusAreas";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "proofPoints";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "snippetFilename";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "snippetLanguage";
ALTER TABLE "Solution" DROP COLUMN IF EXISTS "snippetCode";

-- Add serviceId FK to Product
ALTER TABLE "Product" ADD COLUMN "serviceId" TEXT;
ALTER TABLE "Product" ADD CONSTRAINT "Product_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Add serviceId FK to Solution
ALTER TABLE "Solution" ADD COLUMN "serviceId" TEXT;
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Add serviceId FK to Article
ALTER TABLE "Article" ADD COLUMN "serviceId" TEXT;
ALTER TABLE "Article" ADD CONSTRAINT "Article_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Indexes
CREATE INDEX "Product_serviceId_idx" ON "Product"("serviceId");
CREATE INDEX "Product_published_deletedAt_idx" ON "Product"("published", "deletedAt");
CREATE INDEX "Solution_serviceId_idx" ON "Solution"("serviceId");
CREATE INDEX "Solution_published_deletedAt_idx" ON "Solution"("published", "deletedAt");
CREATE INDEX "Service_published_deletedAt_idx" ON "Service"("published", "deletedAt");
CREATE INDEX "Article_serviceId_idx" ON "Article"("serviceId");
CREATE INDEX "Article_published_deletedAt_idx" ON "Article"("published", "deletedAt");
CREATE INDEX "Article_category_published_idx" ON "Article"("category", "published");
