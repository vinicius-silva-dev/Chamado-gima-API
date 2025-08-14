import {Prisma, Anexos as PrismaToken} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Anexos } from 'src/domain/enteprise/entities/anexos'


export class PrismaAnexosMappers {
  static toDomain(raw: PrismaToken) {
    return Anexos.create({
      title: raw.title,
      url: raw.link
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(anexos: Anexos): Prisma.AnexosUncheckedCreateInput {
    return {
      id: anexos.id.toString(),
      title: anexos.title,
      link: anexos.url,
    }
  }
}