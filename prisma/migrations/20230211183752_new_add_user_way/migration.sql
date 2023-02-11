-- AlterTable
ALTER TABLE `room-user` ADD COLUMN `activated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `canChange` BOOLEAN NOT NULL DEFAULT false;
