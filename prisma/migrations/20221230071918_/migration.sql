-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `activity_sphereId_fkey`;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_sphereId_fkey` FOREIGN KEY (`sphereId`) REFERENCES `activity-sphere`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
