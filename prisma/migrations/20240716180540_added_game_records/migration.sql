/*
  Warnings:

  - Added the required column `addedByUserId` to the `GameRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameRecord` ADD COLUMN `addedByUserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `GameRecord` ADD CONSTRAINT `GameRecord_addedByUserId_fkey` FOREIGN KEY (`addedByUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
