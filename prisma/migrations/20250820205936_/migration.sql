/*
  Warnings:

  - Made the column `chamado_id` on table `atualizacao_chamado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "atualizacao_chamado" ALTER COLUMN "chamado_id" SET NOT NULL;
