/*
  Warnings:

  - Made the column `qrCode` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `qrCodeImage` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `txId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "qrCode" SET NOT NULL,
ALTER COLUMN "qrCodeImage" SET NOT NULL,
ALTER COLUMN "txId" SET NOT NULL;
