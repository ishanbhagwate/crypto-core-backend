/*
  Warnings:

  - You are about to drop the column `content` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `News` table. All the data in the column will be lost.
  - Added the required column `domain` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedAt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceDomain` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceRegion` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceTitle` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "content",
DROP COLUMN "source",
DROP COLUMN "updatedAt",
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "kind" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "sourceDomain" TEXT NOT NULL,
ADD COLUMN     "sourcePath" TEXT,
ADD COLUMN     "sourceRegion" TEXT NOT NULL,
ADD COLUMN     "sourceTitle" TEXT NOT NULL,
ADD COLUMN     "sourceType" TEXT NOT NULL;
