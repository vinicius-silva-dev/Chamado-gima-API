-- DropForeignKey
ALTER TABLE "chamados" DROP CONSTRAINT "chamados_analista_id_fkey";

-- AlterTable
ALTER TABLE "chamados" ALTER COLUMN "analista_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_analista_id_fkey" FOREIGN KEY ("analista_id") REFERENCES "analistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
