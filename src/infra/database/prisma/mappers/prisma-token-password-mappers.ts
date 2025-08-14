import {Prisma, TokenResetPassword as PrismaToken} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { TokenResetPassword } from 'src/domain/enteprise/entities/token-reset-password'

export class PrismaTokenPasswordMappers {
  static toDomain(raw: PrismaToken) {
    return TokenResetPassword.create({
      token: raw.token,
      userId: raw.userId
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(tokenRestePassword: TokenResetPassword): Prisma.TokenResetPasswordUncheckedCreateInput {
    return {
      id: tokenRestePassword.id.toString(),
      token: tokenRestePassword.token,
      userId: tokenRestePassword.userId.toString()
    }
  }
}