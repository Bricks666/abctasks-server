/*
  Warnings:

  - You are about to drop the column `action` on the `activity` table. All the data in the column will be lost.
  - Added the required column `actionId` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `action`,
    ADD COLUMN `actionId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `activity_action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    UNIQUE INDEX `activity_action_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `activity_action`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
