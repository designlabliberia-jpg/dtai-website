/*
  Warnings:

  - You are about to drop the column `dark` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `relatedProducts` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `relatedServices` on the `Solution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dark",
DROP COLUMN "relatedProducts",
ADD COLUMN     "builtFor" TEXT[],
ADD COLUMN     "relatedCapabilities" TEXT[];

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "summary",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "whatsappNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "relatedServices";

-- CreateTable
CREATE TABLE "AboutSettings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "mission" TEXT NOT NULL DEFAULT '',
    "vision" TEXT NOT NULL DEFAULT '',
    "aboutHeading" TEXT NOT NULL DEFAULT '',
    "aboutSubheading" TEXT NOT NULL DEFAULT '',
    "aboutDescription" TEXT NOT NULL DEFAULT '',
    "heroImageUrl" TEXT NOT NULL DEFAULT '',
    "teamImageUrl" TEXT NOT NULL DEFAULT '',
    "officeImageUrl" TEXT NOT NULL DEFAULT '',
    "valuesHeading" TEXT NOT NULL DEFAULT '',
    "valuesDescription" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AboutSettings_pkey" PRIMARY KEY ("id")
);
