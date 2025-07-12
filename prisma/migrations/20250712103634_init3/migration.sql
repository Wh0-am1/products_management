-- DropIndex
DROP INDEX "Products_id_idx";

-- CreateIndex
CREATE INDEX "Products_id_name_idx" ON "Products"("id", "name");
