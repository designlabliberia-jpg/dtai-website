/*
  Warnings:

  - You are about to drop the column `aboutDescription` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutHeading` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutSubheading` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `heroImageUrl` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `mission` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `officeImageUrl` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `teamImageUrl` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `valuesDescription` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `valuesHeading` on the `AboutSettings` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `AboutSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutSettings" DROP COLUMN "aboutDescription",
DROP COLUMN "aboutHeading",
DROP COLUMN "aboutSubheading",
DROP COLUMN "heroImageUrl",
DROP COLUMN "mission",
DROP COLUMN "officeImageUrl",
DROP COLUMN "teamImageUrl",
DROP COLUMN "valuesDescription",
DROP COLUMN "valuesHeading",
DROP COLUMN "vision",
ADD COLUMN     "commitmentBody" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commitmentPoints" TEXT[],
ADD COLUMN     "commitmentPrimaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commitmentPrimaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commitmentSecondaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commitmentSecondaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "missionBody" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "missionPoints" TEXT[],
ADD COLUMN     "missionPrimaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "missionPrimaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "missionSecondaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "missionSecondaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileEyebrow" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileHeading" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileHeadingAccent" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileParagraphs" TEXT[],
ADD COLUMN     "profilePrimaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profilePrimaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileSecondaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileSecondaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "valuesLabels" TEXT[],
ADD COLUMN     "visionBody" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "visionPoints" TEXT[],
ADD COLUMN     "visionPrimaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "visionPrimaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "visionSecondaryImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "visionSecondaryImageAlt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why1Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why1Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why2Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why2Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why3Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why3Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why4Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why4Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why5Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why5Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why6Description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "why6Title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "whyHeading" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "whyHeadingAccent" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "whyTitle" TEXT NOT NULL DEFAULT '';
