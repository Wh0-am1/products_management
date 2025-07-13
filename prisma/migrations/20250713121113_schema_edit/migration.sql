/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_reviewId_fkey";

-- DropIndex
DROP INDEX "Products_reviewId_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "productId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_productId_key" ON "Reviews"("productId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
