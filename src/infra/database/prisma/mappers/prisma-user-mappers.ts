/* eslint-disable prettier/prettier */

import { Prisma, User as PrismaUser } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/enteprise/entities/user'

export class PrismaUserMappers {
  static toDomain(raw: PrismaUser) {
    return User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      cargo: raw.cargo,
      categoria: raw.categoria,
      loja: raw.loja,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(user: User): Prisma.UserCreateWithoutChamadosInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      cargo: user.cargo,
      categoria: user.categoria,
      loja: user.loja,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

}
