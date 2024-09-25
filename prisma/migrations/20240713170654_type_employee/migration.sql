/*
  Warnings:

  - Added the required column `type` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `type` VARCHAR(30) NOT NULL;
