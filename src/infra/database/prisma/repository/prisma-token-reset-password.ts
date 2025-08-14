import { Injectable } from "@nestjs/common";
import { TokenResetPasswordRepository } from "src/domain/application/repository/token-reset-repository";
import { TokenResetPassword } from "src/domain/enteprise/entities/token-reset-password";
import { PrismaService } from "../prisma.service";
import { PrismaTokenPasswordMappers } from "../mappers/prisma-token-password-mappers";

@Injectable()
export class PrismaTokenResetPassword implements TokenResetPasswordRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findByToken(token: string): Promise<TokenResetPassword | null> {
    const findToken = await this.prisma.tokenResetPassword.findUnique({
      where: {
        token
      }
    })

    if(!findToken) {
      return null
    }

    return PrismaTokenPasswordMappers.toDomain(findToken)
  }
  
  async create(token: TokenResetPassword): Promise<void> {
    try {
      const data = PrismaTokenPasswordMappers.toPrisma(token)

      await this.prisma.tokenResetPassword.create({
        data
      })
    } catch (error) {
      console.log('Erro no banco: ', error)
    }
  }
  delete(token: TokenResetPassword): Promise<void> {
    throw new Error("Method not implemented.");
  }
}