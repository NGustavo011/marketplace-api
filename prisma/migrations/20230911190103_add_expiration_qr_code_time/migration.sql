/*
  Warnings:

  - Added the required column `qrCodeExpiration` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "qrCodeExpiration" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paymentMethod" SET DEFAULT pix,
ALTER COLUMN "status" SET DEFAULT pending;
