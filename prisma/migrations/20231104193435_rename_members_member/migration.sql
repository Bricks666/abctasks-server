/*
  Warnings:

  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_roomId_activistId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_roomId_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roomId_authorId_fkey";

-- DropTable
DROP TABLE "Members";

-- CreateTable
CREATE TABLE "Member" (
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'invited',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("roomId","userId")
);

-- CreateIndex
CREATE INDEX "Member_userId_idx" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_roomId_userId_key" ON "Member"("roomId", "userId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_roomId_authorId_fkey" FOREIGN KEY ("roomId", "authorId") REFERENCES "Member"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_roomId_authorId_fkey" FOREIGN KEY ("roomId", "authorId") REFERENCES "Member"("roomId", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_roomId_activistId_fkey" FOREIGN KEY ("roomId", "activistId") REFERENCES "Member"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "sphereId" RENAME TO "Activity_sphereId_idx";

-- RenameIndex
ALTER INDEX "name" RENAME TO "ActivitySphere_name_key";
