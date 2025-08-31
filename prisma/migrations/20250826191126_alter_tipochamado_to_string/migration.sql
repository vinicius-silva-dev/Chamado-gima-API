/*
  Warnings:

  - The `status` column on the `chamados` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "chamados" ALTER COLUMN "tipo_chamado" DROP DEFAULT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT DEFAULT 'Aberto';

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Tipo_Chamado";
