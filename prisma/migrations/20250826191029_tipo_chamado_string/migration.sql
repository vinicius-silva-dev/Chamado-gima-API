/*
  Warnings:

  - The `status` column on the `chamados` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tipo_chamado` on the `chamados` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Converte a coluna para TEXT temporariamente
ALTER TABLE "chamados"
ALTER COLUMN "tipo_chamado" TYPE TEXT;

-- Se quiser, você pode definir um valor default
ALTER TABLE "chamados"
ALTER COLUMN "tipo_chamado" SET DEFAULT 'ErroNoSistema';

