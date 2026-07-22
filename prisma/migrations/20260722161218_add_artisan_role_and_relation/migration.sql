-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ARTISAN';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "artisanId" TEXT;

-- CreateIndex
CREATE INDEX "Product_artisanId_idx" ON "Product"("artisanId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
