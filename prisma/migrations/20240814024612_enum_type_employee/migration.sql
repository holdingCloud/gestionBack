/*
  Warnings:

  - You are about to alter the column `type` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Employees` MODIFY `type` ENUM('ADMINISTRADOR', 'REPARTIDOR', 'COMUN') NOT NULL DEFAULT 'COMUN';
