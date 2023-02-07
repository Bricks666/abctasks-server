/*
  Warnings:

  - You are about to alter the column `name` on the `activity-sphere` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.
  - You are about to alter the column `name` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.
  - You are about to alter the column `name` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.
  - You are about to drop the column `content` on the `task` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity-sphere` MODIFY `name` VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE `group` MODIFY `name` VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `creatorId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `content`,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `title` VARCHAR(32) NOT NULL;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
