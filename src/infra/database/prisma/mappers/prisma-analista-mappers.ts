/* eslint-disable prettier/prettier */

import { Prisma, Analista as PrismaAnalista } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Analista } from 'src/domain/enteprise/entities/analistas'

export class PrismaAnalistaMappers {
  static toDomain(raw: PrismaAnalista) {
    return Analista.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      categoria: raw.categoria,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(analista: Analista): Prisma.AnalistaCreateWithoutChamadosInput {
    return {
      id: analista.id.toString(),
      name: analista.name,
      email: analista.email,
      password: analista.password,
      categoria: analista.categoria,
      createdAt: analista.createdAt,
      updatedAt: analista.updatedAt,
    }
  }

}
