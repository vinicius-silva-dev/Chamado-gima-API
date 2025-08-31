/*
  Warnings:

  - The values [Em_Andamento] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The values [Erro_no_sistema,Liberar_funcao] on the enum `Tipo_Chamado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Aberto', 'Em andamento', 'Resolvido', 'Cancelado');
ALTER TABLE "chamados" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "chamados" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "chamados" ALTER COLUMN "status" SET DEFAULT 'Aberto';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Tipo_Chamado_new" AS ENUM ('Erro no sistema', 'Liberar função', 'Duvida', 'Outros');
ALTER TABLE "chamados" ALTER COLUMN "tipo_chamado" DROP DEFAULT;
ALTER TABLE "chamados" ALTER COLUMN "tipo_chamado" TYPE "Tipo_Chamado_new" USING ("tipo_chamado"::text::"Tipo_Chamado_new");
ALTER TYPE "Tipo_Chamado" RENAME TO "Tipo_Chamado_old";
ALTER TYPE "Tipo_Chamado_new" RENAME TO "Tipo_Chamado";
DROP TYPE "Tipo_Chamado_old";
ALTER TABLE "chamados" ALTER COLUMN "tipo_chamado" SET DEFAULT 'Erro no sistema';
COMMIT;

-- AlterTable
ALTER TABLE "chamados" ALTER COLUMN "tipo_chamado" SET DEFAULT 'Erro no sistema';
