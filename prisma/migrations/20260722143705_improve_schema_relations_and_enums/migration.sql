/*
  I documented these migration warnings so I can track possible data impact before applying this change.

  - I noted that recreating the `status` column on `Order` can cause data loss if rows already exist.
  - I noted that adding a unique constraint on [`cartId`,`productId`] in `CartItem` can fail when duplicate rows exist.

*/
-- I create this enum in this migration step.
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- I create this enum in this migration step.
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- I drop this foreign key in this migration step.
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- I drop this foreign key in this migration step.
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- I drop this foreign key in this migration step.
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- I drop this foreign key in this migration step.
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- I drop this foreign key in this migration step.
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- I alter this table in this migration step.
ALTER TABLE "Cart" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- I alter this table in this migration step.
ALTER TABLE "CartItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- I alter this table in this migration step.
ALTER TABLE "Category" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- I alter this table in this migration step.
ALTER TABLE "Order" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'CONFIRMED';

-- I alter this table in this migration step.
ALTER TABLE "Product" ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- I alter this table in this migration step.
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- I create this index in this migration step.
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- I create this index in this migration step.
CREATE INDEX "Image_productId_idx" ON "Image"("productId");

-- I create this index in this migration step.
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- I create this index in this migration step.
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- I create this index in this migration step.
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- I create this index in this migration step.
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- I add this foreign key in this migration step.
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- I add this foreign key in this migration step.
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- I add this foreign key in this migration step.
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- I add this foreign key in this migration step.
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- I add this foreign key in this migration step.
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
