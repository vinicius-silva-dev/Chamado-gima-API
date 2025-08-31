/*
  Warnings:

  - The `tipo_chamado` column on the `chamados` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `chamados` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Tipo_Chamado" AS ENUM ('Erro_no_sistema', 'Liberar_funcao', 'Duvida', 'Outros');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Aberto', 'Em_Andamento', 'Resolvido', 'Cancelado');

-- AlterTable
ALTER TABLE "chamados" DROP COLUMN "tipo_chamado",
ADD COLUMN     "tipo_chamado" "Tipo_Chamado" NOT NULL DEFAULT 'Erro_no_sistema',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'Aberto';
