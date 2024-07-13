-- DropForeignKey
ALTER TABLE `UserScore` DROP FOREIGN KEY `UserScore_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `UserScoreYakuman` DROP FOREIGN KEY `UserScoreYakuman_userScoreYakumanRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `UserScoreYakumanRecord` DROP FOREIGN KEY `UserScoreYakumanRecord_userScoreId_fkey`;

-- AddForeignKey
ALTER TABLE `UserScore` ADD CONSTRAINT `UserScore_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `GameRecord`(`gameId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserScoreYakumanRecord` ADD CONSTRAINT `UserScoreYakumanRecord_userScoreId_fkey` FOREIGN KEY (`userScoreId`) REFERENCES `UserScore`(`userScoreId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserScoreYakuman` ADD CONSTRAINT `UserScoreYakuman_userScoreYakumanRecordId_fkey` FOREIGN KEY (`userScoreYakumanRecordId`) REFERENCES `UserScoreYakumanRecord`(`userScoreYakumanRecordId`) ON DELETE CASCADE ON UPDATE CASCADE;
