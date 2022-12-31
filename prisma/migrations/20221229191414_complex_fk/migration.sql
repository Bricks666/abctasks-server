-- CreateTable
CREATE TABLE `activities` (
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
CREATE TABLE `activity-sphere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mainColor` VARCHAR(255) NOT NULL,
    `secondColor` VARCHAR(255) NOT NULL,

    INDEX `roomId`(`roomId`),
    UNIQUE INDEX `groups_id_roomId_key`(`id`, `roomId`),
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
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

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
    `createdAt` DATETIME(0) NOT NULL,

    INDEX `authorId`(`authorId`),
    INDEX `groupId`(`groupId`),
    INDEX `roomId`(`roomId`),
    UNIQUE INDEX `task_id_roomId_key`(`id`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(32) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NULL,

    UNIQUE INDEX `login`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_sphereId_fkey` FOREIGN KEY (`sphereId`) REFERENCES `activity-sphere`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_taskId_roomId_fkey` FOREIGN KEY (`taskId`, `roomId`) REFERENCES `task`(`id`, `roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_roomId_authorId_fkey` FOREIGN KEY (`roomId`, `authorId`) REFERENCES `room-user`(`roomId`, `userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room-user` ADD CONSTRAINT `room-user_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room-user` ADD CONSTRAINT `room-user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`roomId`, `authorId`) REFERENCES `room-user`(`roomId`, `userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`groupId`, `roomId`) REFERENCES `groups`(`id`, `roomId`) ON DELETE CASCADE ON UPDATE CASCADE;
