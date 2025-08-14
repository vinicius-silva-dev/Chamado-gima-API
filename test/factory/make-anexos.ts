/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Anexos, AnexosProps } from 'src/domain/enteprise/entities/anexos'
import { PrismaAnexosMappers } from 'src/infra/database/prisma/mappers/prisma-anexos-mappers'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeAnexos(
  override: Partial<AnexosProps> = {},
  id?: UniqueEntityId,
) {
  const anexos = Anexos.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override
    },
    id,
  )

  return anexos
}

@Injectable()
export class AnexosFactory {
  constructor(private prisma: PrismaService){}

  async makePrismaAnexos(data: Partial<AnexosProps> = {}): Promise<Anexos> {
    const anexos = makeAnexos(data)

    await this.prisma.anexos.create({
      data: PrismaAnexosMappers.toPrisma(anexos)
    })

    return anexos
  }
}
