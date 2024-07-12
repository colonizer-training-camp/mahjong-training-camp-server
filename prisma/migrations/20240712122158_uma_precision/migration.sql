/*
  Warnings:

  - You are about to alter the column `uma` on the `UserScore` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,1)`.

*/
-- AlterTable
ALTER TABLE `UserScore` MODIFY `uma` DECIMAL(10, 1) NOT NULL;
