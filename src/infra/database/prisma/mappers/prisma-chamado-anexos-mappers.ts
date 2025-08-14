

import {Prisma, Anexos as PrismaAnexo} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos'

// Essa classe é responsável por converter a classe que vem do prisma  para uma classe igual da entidade de dominio.
export class PrismaChamadoAnexosMapper {
  // static toPrisma(chamadoAnexos: ChamadoAnexos): any {
  //   throw new Error('Method not implemented.')
  // }

  static toDomain(raw: PrismaAnexo){

    if (!raw.chamadoId) {
      throw new Error('Invalid comment type.')
    }

    return ChamadoAnexos.create({

      anexosId: new UniqueEntityId(raw.id),
      chamadoId: new UniqueEntityId(raw.chamadoId)
    }, new UniqueEntityId(raw.id))
  }

  static toPrismaUpdateMany(
    anexos: ChamadoAnexos[]
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
         chamadoId: anexosIds[0].chamadoId.toString(),
      },
    }
  }
}
