import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User, UserProps } from "src/domain/enteprise/entities/user";
import { PrismaUserMappers } from "src/infra/database/prisma/mappers/prisma-user-mappers";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

export async function MakeUser(overside: Partial<UserProps> = {}, id?: UniqueEntityId) {
  const user = User.create({
    name: 'Osvaldo Silva',
    email: 'osvaldo100@live.com',
    password: await hash('123456', 6),
    cargo: 'aux.financeiro',
    categoria: 'Padrão',
    loja: 'Gima FL Jaru',
    createdAt: new Date(),

    ...overside
  })

  return user
}

@Injectable()
export class UserFactory {
  constructor(
    private prisma: PrismaService
  ) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = MakeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMappers.toPrisma(await user)
    })

    return user
  }
}