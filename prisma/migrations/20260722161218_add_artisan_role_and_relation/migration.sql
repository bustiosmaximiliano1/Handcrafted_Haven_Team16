-- I alter this enum in this migration step.
ALTER TYPE "Role" ADD VALUE 'ARTISAN';

-- I alter this table in this migration step.
ALTER TABLE "Product" ADD COLUMN     "artisanId" TEXT;

-- I create this index in this migration step.
CREATE INDEX "Product_artisanId_idx" ON "Product"("artisanId");

-- I add this foreign key in this migration step.
ALTER TABLE "Product" ADD CONSTRAINT "Product_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
