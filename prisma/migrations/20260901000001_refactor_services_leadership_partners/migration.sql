-- AlterTable
ALTER TABLE "LeadershipMember" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "icon";
