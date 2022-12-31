/*
  Warnings:

  - A unique constraint covering the columns `[id,roomId,taskId]` on the table `comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `comment_id_roomId_taskId_key` ON `comment`(`id`, `roomId`, `taskId`);
