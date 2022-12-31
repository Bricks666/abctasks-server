/*
  Warnings:

  - You are about to alter the column `mainColor` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(7)`.
  - You are about to alter the column `secondColor` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE `group` MODIFY `mainColor` VARCHAR(7) NOT NULL,
    MODIFY `secondColor` VARCHAR(7) NOT NULL;
