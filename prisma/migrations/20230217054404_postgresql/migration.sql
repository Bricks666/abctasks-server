-- CreateEnum

CREATE TYPE
    "TaskStatus" AS ENUM (
        'done',
        'in progress',
        'ready',
        'review'
    );

-- CreateTable

CREATE TABLE
    "User" (
        "id" SERIAL NOT NULL,
        "email" VARCHAR(32) NOT NULL,
        "username" VARCHAR(32) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "photo" VARCHAR(255),
        "activated" BOOLEAN DEFAULT false,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "RoomUser" (
        "roomId" INTEGER NOT NULL,
        "userId" INTEGER NOT NULL,
        "canChange" BOOLEAN NOT NULL DEFAULT false,
        "removed" BOOLEAN NOT NULL DEFAULT false,
        "activated" BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT "RoomUser_pkey" PRIMARY KEY ("roomId", "userId")
    );

-- CreateTable

CREATE TABLE
    "Room" (
        "id" SERIAL NOT NULL,
        "ownerId" INTEGER NOT NULL,
        "name" VARCHAR(32) NOT NULL,
        "description" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),
        CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Comment" (
        "id" SERIAL NOT NULL,
        "authorId" INTEGER NOT NULL,
        "roomId" INTEGER NOT NULL,
        "taskId" INTEGER NOT NULL,
        "content" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Tag" (
        "id" SERIAL NOT NULL,
        "roomId" INTEGER NOT NULL,
        "name" VARCHAR(32) NOT NULL,
        "mainColor" VARCHAR(7) NOT NULL,
        "secondColor" VARCHAR(7) NOT NULL,
        CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Task" (
        "id" SERIAL NOT NULL,
        "roomId" INTEGER NOT NULL,
        "authorId" INTEGER NOT NULL,
        "tagIds" INTEGER [] DEFAULT ARRAY [] :: INTEGER [] NOT NULL,
        "title" VARCHAR(32) NOT NULL,
        "description" VARCHAR(255),
        "status" "TaskStatus" NOT NULL DEFAULT 'ready',
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),
        CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "TagTask" (
        "tagId" INTEGER NOT NULL,
        "taskId" INTEGER NOT NULL,
        "roomId" INTEGER NOT NULL,
        CONSTRAINT "TagTask_pkey" PRIMARY KEY ("tagId", "taskId")
    );

-- CreateTable

CREATE TABLE
    "Activity" (
        "id" SERIAL NOT NULL,
        "roomId" INTEGER NOT NULL,
        "sphereId" INTEGER NOT NULL,
        "actionId" INTEGER NOT NULL,
        "activistId" INTEGER NOT NULL,
        "createdAt" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "ActivityAction" (
        "id" SERIAL NOT NULL,
        "name" VARCHAR(32) NOT NULL,
        CONSTRAINT "ActivityAction_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "ActivitySphere" (
        "id" SERIAL NOT NULL,
        "name" VARCHAR(32) NOT NULL,
        CONSTRAINT "ActivitySphere_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex

CREATE INDEX "userId" ON "RoomUser"("userId");

-- CreateIndex

CREATE UNIQUE INDEX "room-user_roomId_userId_unique" ON "RoomUser"("roomId", "userId");

-- CreateIndex

CREATE UNIQUE INDEX "Comment_id_roomId_taskId_key" ON "Comment"("id", "roomId", "taskId");

-- CreateIndex

CREATE INDEX "roomId" ON "Tag"("roomId");

-- CreateIndex

CREATE UNIQUE INDEX "Tag_id_roomId_key" ON "Tag"("id", "roomId");

-- CreateIndex

CREATE INDEX "authorId" ON "Task"("authorId");

-- CreateIndex

CREATE INDEX "taskRoomId" ON "Task"("roomId");

-- CreateIndex

CREATE UNIQUE INDEX "Task_id_roomId_key" ON "Task"("id", "roomId");

-- CreateIndex

CREATE INDEX "tagTaskRoomId" ON "TagTask"("roomId");

-- CreateIndex

CREATE UNIQUE INDEX "TagTask_tagId_taskId_key" ON "TagTask"("tagId", "taskId");

-- CreateIndex

CREATE INDEX "sphereId" ON "Activity"("sphereId");

-- CreateIndex

CREATE UNIQUE INDEX "ActivityAction_name_key" ON "ActivityAction"("name");

-- CreateIndex

CREATE UNIQUE INDEX "name" ON "ActivitySphere"("name");

-- AddForeignKey

ALTER TABLE "RoomUser"
ADD
    CONSTRAINT "room-user_ibfk_1" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "RoomUser"
ADD
    CONSTRAINT "room-user_ibfk_2" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Room"
ADD
    CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Comment"
ADD
    CONSTRAINT "Comment_taskId_roomId_fkey" FOREIGN KEY ("taskId", "roomId") REFERENCES "Task"("id", "roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Comment"
ADD
    CONSTRAINT "Comment_roomId_authorId_fkey" FOREIGN KEY ("roomId", "authorId") REFERENCES "RoomUser"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Tag"
ADD
    CONSTRAINT "tags_ibfk_1" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Task"
ADD
    CONSTRAINT "task_ibfk_1" FOREIGN KEY ("roomId", "authorId") REFERENCES "RoomUser"("roomId", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "TagTask"
ADD
    CONSTRAINT "TagTask_taskId_roomId_fkey" FOREIGN KEY ("taskId", "roomId") REFERENCES "Task"("id", "roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "TagTask"
ADD
    CONSTRAINT "TagTask_tagId_roomId_fkey" FOREIGN KEY ("tagId", "roomId") REFERENCES "Tag"("id", "roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Activity"
ADD
    CONSTRAINT "Activity_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "ActivityAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Activity"
ADD
    CONSTRAINT "Activity_sphereId_fkey" FOREIGN KEY ("sphereId") REFERENCES "ActivitySphere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
