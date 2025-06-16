/*
  Warnings:

  - You are about to drop the column `favFood` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "favFood",
ADD COLUMN     "favToy" TEXT;
