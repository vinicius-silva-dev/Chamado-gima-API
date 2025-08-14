/*
  Warnings:

  - You are about to drop the `Anexos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chamados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anexos" DROP CONSTRAINT "Anexos_chamado_id_fkey";

-- DropForeignKey
ALTER TABLE "Chamados" DROP CONSTRAINT "Chamados_analista_id_fkey";

-- DropForeignKey
ALTER TABLE "Chamados" DROP CONSTRAINT "Chamados_user_id_fkey";

-- DropTable
DROP TABLE "Anexos";

-- DropTable
DROP TABLE "Chamados";

-- CreateTable
CREATE TABLE "chamados" (
    "id" TEXT NOT NULL,
    "loja" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "tipo_chamado" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricao_encerramento" TEXT NOT NULL,
    "descricao_cancelamento" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "analista_id" TEXT NOT NULL,

    CONSTRAINT "chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anexos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "chamado_id" TEXT NOT NULL,

    CONSTRAINT "anexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_reset_password" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "token_reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_reset_password_token_key" ON "token_reset_password"("token");

-- CreateIndex
CREATE UNIQUE INDEX "token_reset_password_userId_key" ON "token_reset_password"("userId");

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_analista_id_fkey" FOREIGN KEY ("analista_id") REFERENCES "analistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_chamado_id_fkey" FOREIGN KEY ("chamado_id") REFERENCES "chamados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_reset_password" ADD CONSTRAINT "token_reset_password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
