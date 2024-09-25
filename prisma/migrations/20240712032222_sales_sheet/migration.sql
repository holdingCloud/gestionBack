/*
  Warnings:

  - You are about to drop the column `avialable` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `avialable` on the `Employees` table. All the data in the column will be lost.
  - You are about to drop the column `avialable` on the `Products` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clients` DROP COLUMN `avialable`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Employees` DROP COLUMN `avialable`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Products` DROP COLUMN `avialable`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `salesSheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `billId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detailsSalesSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientsId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `discount` DOUBLE NOT NULL,
    `salesSheetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Clients_available_idx` ON `Clients`(`available`);

-- CreateIndex
CREATE INDEX `Employees_available_idx` ON `Employees`(`available`);

-- CreateIndex
CREATE INDEX `Products_available_idx` ON `Products`(`available`);

-- AddForeignKey
ALTER TABLE `salesSheets` ADD CONSTRAINT `salesSheets_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salesSheets` ADD CONSTRAINT `salesSheets_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailsSalesSheet` ADD CONSTRAINT `detailsSalesSheet_clientsId_fkey` FOREIGN KEY (`clientsId`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailsSalesSheet` ADD CONSTRAINT `detailsSalesSheet_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailsSalesSheet` ADD CONSTRAINT `detailsSalesSheet_salesSheetId_fkey` FOREIGN KEY (`salesSheetId`) REFERENCES `salesSheets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
