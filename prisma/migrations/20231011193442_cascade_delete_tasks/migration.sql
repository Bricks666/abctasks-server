-- DropForeignKey
ALTER TABLE "TagTask" DROP CONSTRAINT "TagTask_tagId_roomId_fkey";

-- AddForeignKey
ALTER TABLE "TagTask" ADD CONSTRAINT "TagTask_tagId_roomId_fkey" FOREIGN KEY ("tagId", "roomId") REFERENCES "Tag"("id", "roomId") ON DELETE CASCADE ON UPDATE CASCADE;
