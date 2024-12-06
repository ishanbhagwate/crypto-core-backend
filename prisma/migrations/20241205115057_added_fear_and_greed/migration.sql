/*
  Warnings:

  - Added the required column `fearValue` to the `Overview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fearValueClassification` to the `Overview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fearValueLastUpdated` to the `Overview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Overview" ADD COLUMN     "fearValue" INTEGER NOT NULL,
ADD COLUMN     "fearValueClassification" TEXT NOT NULL,
ADD COLUMN     "fearValueLastUpdated" TIMESTAMP(3) NOT NULL;
