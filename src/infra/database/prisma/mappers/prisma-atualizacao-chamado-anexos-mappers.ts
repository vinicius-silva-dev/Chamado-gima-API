import {Prisma, Anexos as PrismaAnexo} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { AtualizacaoChamadoAnexos } from 'src/domain/enteprise/entities/atualizacao-chamado-anexos'


// Essa classe é responsável por converter a classe que vem do prisma  para uma classe igual da entidade de dominio.
export class PrismaAtualizacaoChamadoAnexosMapper {
  // static toPrisma(atualizacaochamadoAnexos: AtualizacaoChamadoAnexos): any {
  //   throw new Error('Method not implemented.')
  // }

  static toDomain(raw: PrismaAnexo){

    if (!raw.atualizacaoChamadoId) {
      throw new Error('Invalid comment type.')
    }

    return AtualizacaoChamadoAnexos.create({

      anexosId: new UniqueEntityId(raw.id),
      atualizacaoChamadoId: new UniqueEntityId(raw.atualizacaoChamadoId)
    }, new UniqueEntityId(raw.id))
  }

  static toPrismaUpdateMany(
    anexos: AtualizacaoChamadoAnexos[]
  ): Prisma.AnexosUpdateManyArgs {

    const anexosIds = anexos.map((anexo) => {
      return anexo.anexosId.toString()
    })

    return {
      where: {
        id: {
          in: anexosIds,
        },     
      },
      data: {
         atualizacaoChamadoId: anexosIds[0].atualizacaochamadoId,
      },
    }
  }
}
