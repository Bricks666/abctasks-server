/*
  Warnings:

  - The values [invited] on the enum `MemberStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `inviterId` on the `Member` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomInvitationStatus" AS ENUM ('sended', 'approved', 'rejected');

-- AlterEnum
BEGIN;
CREATE TYPE "MemberStatus_new" AS ENUM ('activated', 'removed');
ALTER TABLE "Member" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "status" TYPE "MemberStatus_new" USING ("status"::text::"MemberStatus_new");
ALTER TYPE "MemberStatus" RENAME TO "MemberStatus_old";
ALTER TYPE "MemberStatus_new" RENAME TO "MemberStatus";
DROP TYPE "MemberStatus_old";
ALTER TABLE "Member" ALTER COLUMN "status" SET DEFAULT 'activated';
COMMIT;

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_inviterId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "inviterId",
ALTER COLUMN "status" SET DEFAULT 'activated';

-- CreateTable
CREATE TABLE "RoomInvitation" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "inviterId" INTEGER NOT NULL,
    "status" "RoomInvitationStatus" NOT NULL DEFAULT 'sended',

    CONSTRAINT "RoomInvitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomInvitation" ADD CONSTRAINT "RoomInvitation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInvitation" ADD CONSTRAINT "RoomInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInvitation" ADD CONSTRAINT "RoomInvitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
