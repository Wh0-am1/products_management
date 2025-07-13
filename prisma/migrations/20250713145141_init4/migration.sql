/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reviews_productId_key";

-- DropIndex
DROP INDEX "Reviews_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_productId_userId_key" ON "Reviews"("productId", "userId");
