-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `displayName` VARCHAR(191) NOT NULL,
    `firstGameAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameRecord` (
    `gameId` INTEGER NOT NULL AUTO_INCREMENT,
    `gameType` ENUM('P4_TOUPUUSEN', 'P3_TOUPUUSEN', 'P4_HANCHAN', 'P3_HANCHAN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GameRecord_gameType_idx`(`gameType`),
    INDEX `GameRecord_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserScore` (
    `userScoreId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `initialSeat` ENUM('EAST', 'SOUTH', 'WEST', 'NORTH') NOT NULL,
    `score` INTEGER NOT NULL,
    `uma` DECIMAL(65, 30) NOT NULL,
    `rank` INTEGER NOT NULL,
    `stars` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserScore_userId_idx`(`userId`),
    INDEX `UserScore_gameId_idx`(`gameId`),
    INDEX `UserScore_score_idx`(`score`),
    INDEX `UserScore_rank_idx`(`rank`),
    INDEX `UserScore_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`userScoreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserScoreYakumanRecord` (
    `userScoreYakumanRecordId` INTEGER NOT NULL AUTO_INCREMENT,
    `userScoreId` INTEGER NOT NULL,
    `starCount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userScoreYakumanRecordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserScoreYakuman` (
    `userScoreYakumanId` INTEGER NOT NULL AUTO_INCREMENT,
    `userScoreYakumanRecordId` INTEGER NOT NULL,
    `yakuman` ENUM('TENHOU', 'CHIIHOU', 'SUUANKOU', 'SUUANKOU_TANKI', 'KOKUSHI_MUSOU', 'KOKUSHI_MUSOU_13MEN', 'CHUUREN_POUTOU', 'CHUUREN_POUTOU_JUNSEI', 'RYUUIISOU', 'TSUUIISOU', 'CHINROUTOU', 'DAISANGEN', 'SHOUSUUSHII', 'DAISUUSHII', 'SUUKANTSU') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userScoreYakumanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserScore` ADD CONSTRAINT `UserScore_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserScore` ADD CONSTRAINT `UserScore_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `GameRecord`(`gameId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserScoreYakumanRecord` ADD CONSTRAINT `UserScoreYakumanRecord_userScoreId_fkey` FOREIGN KEY (`userScoreId`) REFERENCES `UserScore`(`userScoreId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserScoreYakuman` ADD CONSTRAINT `UserScoreYakuman_userScoreYakumanRecordId_fkey` FOREIGN KEY (`userScoreYakumanRecordId`) REFERENCES `UserScoreYakumanRecord`(`userScoreYakumanRecordId`) ON DELETE RESTRICT ON UPDATE CASCADE;
