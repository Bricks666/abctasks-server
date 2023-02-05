-- CreateTable
CREATE TABLE `activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `sphereId` INTEGER NOT NULL,
    `activistId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `action` ENUM('create', 'remove', 'update') NOT NULL,

    INDEX `sphereId`(`sphereId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity-sphere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `comment_id_roomId_taskId_key`(`id`, `roomId`, `taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mainColor` VARCHAR(7) NOT NULL,
    `secondColor` VARCHAR(7) NOT NULL,

    INDEX `roomId`(`roomId`),
    UNIQUE INDEX `group_id_roomId_key`(`id`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room-user` (
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `removed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `userId`(`userId`),
    UNIQUE INDEX `room-user_roomId_userId_unique`(`roomId`, `userId`),
    PRIMARY KEY (`roomId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `status` ENUM('done', 'in progress', 'ready', 'review') NOT NULL DEFAULT 'ready',
    `content` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `authorId`(`authorId`),
    INDEX `groupId`(`groupId`),
    INDEX `roomId`(`roomId`),
    UNIQUE INDEX `task_id_roomId_key`(`id`, `roomId`),
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
ALTER TABLE `activity` ADD CONSTRAINT `activity_sphereId_fkey` FOREIGN KEY (`sphereId`) REFERENCES `activity-sphere`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`roomId`, `authorId`) REFERENCES `room-user`(`roomId`, `userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`groupId`, `roomId`) REFERENCES `group`(`id`, `roomId`) ON DELETE CASCADE ON UPDATE CASCADE;
