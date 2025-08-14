-- DropForeignKey
ALTER TABLE "anexos" DROP CONSTRAINT "anexos_chamado_id_fkey";

-- AlterTable
ALTER TABLE "anexos" ADD COLUMN     "atualizacao_chamado_id" TEXT,
ALTER COLUMN "chamado_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "atualizacao_chamado" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "chamado_id" TEXT,
    "user_id" TEXT,
    "analista_id" TEXT,

    CONSTRAINT "atualizacao_chamado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_chamado_id_fkey" FOREIGN KEY ("chamado_id") REFERENCES "chamados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_atualizacao_chamado_id_fkey" FOREIGN KEY ("atualizacao_chamado_id") REFERENCES "atualizacao_chamado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
