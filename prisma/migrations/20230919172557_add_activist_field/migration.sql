-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_roomId_activistId_fkey" FOREIGN KEY ("roomId", "activistId") REFERENCES "RoomUser"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
