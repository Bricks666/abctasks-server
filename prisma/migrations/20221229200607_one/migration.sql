/*
  Warnings:

  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `activities` DROP FOREIGN KEY `activities_sphereId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_roomId_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_taskId_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room-user` DROP FOREIGN KEY `room-user_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room-user` DROP FOREIGN KEY `room-user_ibfk_2`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `task_ibfk_2`;

-- DropTable
DROP TABLE `activities`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `groups`;

-- DropTable
DROP TABLE `rooms`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `sphereId` INTEGER NOT NULL,
    `action` ENUM('create', 'remove', 'update') NOT NULL,
    `activistId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    INDEX `sphereId`(`sphereId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mainColor` VARCHAR(255) NOT NULL,
    `secondColor` VARCHAR(255) NOT NULL,

    INDEX `roomId`(`roomId`),
    UNIQUE INDEX `group_id_roomId_key`(`id`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(32) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NULL,

    UNIQUE INDEX `login`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_sphereId_fkey` FOREIGN KEY (`sphereId`) REFERENCES `activity-sphere`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_taskId_roomId_fkey` FOREIGN KEY (`taskId`, `roomId`) REFERENCES `task`(`id`, `roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_roomId_authorId_fkey` FOREIGN KEY (`roomId`, `authorId`) REFERENCES `room-user`(`roomId`, `userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room-user` ADD CONSTRAINT `room-user_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room-user` ADD CONSTRAINT `room-user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`groupId`, `roomId`) REFERENCES `group`(`id`, `roomId`) ON DELETE CASCADE ON UPDATE CASCADE;
