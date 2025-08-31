import { Prisma, Chamados as PrismaChamado } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Chamado } from 'src/domain/enteprise/entities/chamado'
import { ChamadosAnexosList } from 'src/domain/enteprise/entities/chamados-anexos-list'
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status'


export class PrismaChamadosMappers {
  static toDomain(raw: PrismaChamado) {
    return Chamado.create({
      loja: raw.loja,
      prioridade: raw.prioridade,
      tipo_chamado: raw.tipoChamado,
      title: raw.title,
      descricao: raw.descricao,
      descricaoEncerramento: raw.descricaoEncerramento ?? '',
      descricaoCancelamento: raw.descricaoCancelamento ?? '',
      telefone: raw.telefone,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      userId: raw.userId,
      analistaId: raw.analistaId ?? '',
      anexos: new ChamadosAnexosList(),
      status: new StatusValueObject()
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(chamado: Chamado): Prisma.ChamadosUncheckedCreateInput {
    return {
      id: chamado.id.toString(),
      loja: chamado.loja,
      prioridade: chamado.prioridade,
      tipoChamado: chamado.tipoChamado,
      title: chamado.title,
      descricao: chamado.descricao,
      descricaoEncerramento: chamado.descricaoEncerramento,
      descricaoCancelamento: chamado.descricaoCancelamento,
      telefone: chamado.telefone,
      status: chamado.status.toValue() ?? new StatusValueObject(),
      createdAt: chamado.createdAt,
      updatedAt: chamado.updatedAt,
      userId: chamado.userId.toString(),
      // analistaId: chamado.analistaId.toString() ?? '',
    }
  }

}
