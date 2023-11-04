/*
  Warnings:

  - You are about to drop the column `tagIds` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `RoomUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('invited', 'activated', 'removed');

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_roomId_activistId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_roomId_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "room-user_ibfk_1";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "room-user_ibfk_2";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "task_ibfk_1";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tagIds";

-- DropTable
DROP TABLE "RoomUser";

-- CreateTable
CREATE TABLE "Members" (
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'invited',

    CONSTRAINT "Members_pkey" PRIMARY KEY ("roomId","userId")
);

-- CreateIndex
CREATE INDEX "Members_userId_idx" ON "Members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_roomId_userId_key" ON "Members"("roomId", "userId");

-- RenameForeignKey
ALTER TABLE "Tag" RENAME CONSTRAINT "tags_ibfk_1" TO "Tag_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_roomId_authorId_fkey" FOREIGN KEY ("roomId", "authorId") REFERENCES "Members"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_roomId_authorId_fkey" FOREIGN KEY ("roomId", "authorId") REFERENCES "Members"("roomId", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_roomId_activistId_fkey" FOREIGN KEY ("roomId", "activistId") REFERENCES "Members"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "roomId" RENAME TO "Tag_roomId_idx";

-- RenameIndex
ALTER INDEX "tagTaskRoomId" RENAME TO "TagTask_roomId_idx";

-- RenameIndex
ALTER INDEX "authorId" RENAME TO "Task_authorId_idx";

-- RenameIndex
ALTER INDEX "taskRoomId" RENAME TO "Task_roomId_idx";
