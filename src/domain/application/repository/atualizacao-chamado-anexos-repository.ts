import { AtualizacaoChamado } from "@prisma/client";
import { AtualizacaoChamadoAnexos } from "src/domain/enteprise/entities/atualizacao-chamado-anexos";


export abstract class AtualizacaoChamadoAnexosRepository {
  abstract createMany(anexos: AtualizacaoChamadoAnexos[]): Promise<void>

  abstract deleteMany(anexos: AtualizacaoChamadoAnexos[]): Promise<void>

  abstract findManyAtualizacaoChamadoId(atualizacaochamadoId: string): Promise<AtualizacaoChamado[] | null>

  abstract deleteManyByAtualizacaoChamadoId(atualizacaochamadoId: string): Promise<void>
}