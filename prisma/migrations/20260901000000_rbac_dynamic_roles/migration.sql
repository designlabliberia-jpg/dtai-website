-- Drop old Role enum column first (depends on the type)
ALTER TABLE "AdminUser" DROP COLUMN IF EXISTS "role";

-- Now drop old Role enum type
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
    DROP TYPE "Role";
  END IF;
END $$;

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable: Role
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '{}',
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- Seed the four system roles so the FK migration below can reference them
INSERT INTO "Role" ("id", "name", "label", "permissions", "isSystem", "createdAt", "updatedAt") VALUES
  ('role_super_admin', 'super_admin', 'Super Admin',    '{}', true, NOW(), NOW()),
  ('role_editor',      'editor',      'Content Editor', '{}', true, NOW(), NOW()),
  ('role_recruiter',   'recruiter',   'Recruiter',      '{}', true, NOW(), NOW()),
  ('role_support',     'support',     'Support',        '{}', true, NOW(), NOW());

-- Add roleId column with a default pointing to super_admin so existing rows are covered
ALTER TABLE "AdminUser" ADD COLUMN "roleId" TEXT NOT NULL DEFAULT 'role_super_admin';

-- Remove the default now that data is migrated
ALTER TABLE "AdminUser" ALTER COLUMN "roleId" DROP DEFAULT;

-- Add active column
ALTER TABLE "AdminUser" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;

-- Add FK constraint
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_roleId_fkey"
  FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add index
CREATE INDEX "AdminUser_roleId_idx" ON "AdminUser"("roleId");

-- CreateTable: ContentApproval
CREATE TABLE "ContentApproval" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityTitle" TEXT NOT NULL DEFAULT '',
    "status" "ApprovalStatus" NOT NULL DEFAULT 'pending',
    "requestedById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentApproval_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ContentApproval_entityType_entityId_key" ON "ContentApproval"("entityType", "entityId");
CREATE INDEX "ContentApproval_status_idx" ON "ContentApproval"("status");
