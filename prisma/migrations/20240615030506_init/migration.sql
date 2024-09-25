/*
  Warnings:

  - You are about to drop the `Menus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Menus` DROP FOREIGN KEY `Menus_restaurantId_fkey`;

-- DropTable
DROP TABLE `Menus`;

-- DropTable
DROP TABLE `Restaurants`;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(50) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `img` VARCHAR(50) NOT NULL,
    `code` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
