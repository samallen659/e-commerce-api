/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shopping_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shopping_Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shopping_Item" DROP CONSTRAINT "Shopping_Item_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shopping_Item" DROP CONSTRAINT "Shopping_Item_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Shopping_Session" DROP CONSTRAINT "Shopping_Session_userId_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Shopping_Item";

-- DropTable
DROP TABLE "Shopping_Session";

-- CreateTable
CREATE TABLE "Cart_Item" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
