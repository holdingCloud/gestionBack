-- AlterTable
ALTER TABLE `Clients` ADD COLUMN `avialable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `avialable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `avialable` BOOLEAN NOT NULL DEFAULT true;
