/*
  Warnings:

  - Made the column `productId` on table `Reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "productId" SET NOT NULL;
