/*
  Warnings:

  - Added the required column `zone` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clients` ADD COLUMN `zone` VARCHAR(100) NOT NULL;
