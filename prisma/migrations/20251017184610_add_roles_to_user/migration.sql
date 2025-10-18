-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" TEXT[],
ALTER COLUMN "isActive" SET DEFAULT true;
