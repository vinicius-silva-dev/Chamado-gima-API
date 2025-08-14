-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "loja" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analistas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chamados" (
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

    CONSTRAINT "Chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anexos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "chamado_id" TEXT NOT NULL,

    CONSTRAINT "Anexos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "analistas_email_key" ON "analistas"("email");

-- AddForeignKey
ALTER TABLE "Chamados" ADD CONSTRAINT "Chamados_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamados" ADD CONSTRAINT "Chamados_analista_id_fkey" FOREIGN KEY ("analista_id") REFERENCES "analistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexos" ADD CONSTRAINT "Anexos_chamado_id_fkey" FOREIGN KEY ("chamado_id") REFERENCES "Chamados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
