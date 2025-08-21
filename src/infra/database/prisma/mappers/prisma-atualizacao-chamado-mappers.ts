import { Prisma, AtualizacaoChamado as PrismaAtualizacaoChamado } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { AtualizacaoAnexosList } from 'src/domain/enteprise/entities/atualizacao-anexos-list'
import { AtualizacaoChamado } from 'src/domain/enteprise/entities/atualizacao-chamado'


export class PrismaAtualizacaoChamadoMappers {
  static toDomain(raw: PrismaAtualizacaoChamado) {
    return AtualizacaoChamado.create({
      chamadoId: raw.chamadoId,
      userId: raw.userId ?? '',
      analistaId: raw.userId ?? '',
      descricao: raw.descricao,
      anexos: new AtualizacaoAnexosList()
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(atualizacaochamado: AtualizacaoChamado): Prisma.AtualizacaoChamadoCreateInput {
    return {
      id: atualizacaochamado.id.toString(),
      chamadoId: atualizacaochamado.chamadoId,
      userId: atualizacaochamado.userId ?? '',
      analistaId: atualizacaochamado.analistaId ?? '',
      descricao: atualizacaochamado.descricao,
    }
  }

}
