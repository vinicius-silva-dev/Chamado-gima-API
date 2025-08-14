import { Module } from "@nestjs/common";
import { TokenResetPasswordRepository } from "src/domain/application/repository/token-reset-repository";
import { UserRepository } from "src/domain/application/repository/user-repository";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { PrismaTokenResetPassword } from "./prisma/repository/prisma-token-reset-password";
import { PrismaUserRepository } from "./prisma/repository/prisma-user-repository";
import { ChamadoRepository } from "src/domain/application/repository/chamado-repository";
import { PrismaChamadoRepository } from "./prisma/repository/prisma-chamados-repository";
import { ChamadoAnexosRepository } from "src/domain/application/repository/chamado-anexos-repository";
import { PrismaChamadoAnexosRepository } from "./prisma/repository/prisma-chamado-anexos-repository";
import { AnalistaRepository } from "src/domain/application/repository/analista-repository";
import { PrismaAnalistaRepository } from "./prisma/repository/prisma-analista-repository";
import { AnexosRepository } from "src/domain/application/repository/anexos-repository";
import { PrismaAnexosRepository } from "./prisma/repository/prisma-anexos-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: TokenResetPasswordRepository,
      useClass: PrismaTokenResetPassword
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: AnalistaRepository,
      useClass: PrismaAnalistaRepository
    },
    {
      provide: ChamadoRepository,
      useClass: PrismaChamadoRepository
    },
    {
      provide: AnexosRepository,
      useClass: PrismaAnexosRepository
    },
    {
      provide: ChamadoAnexosRepository,
      useClass: PrismaChamadoAnexosRepository
    },
  ],
  exports: [
    PrismaService,
    TokenResetPasswordRepository,
    UserRepository,
    AnalistaRepository,
    ChamadoRepository,
    AnexosRepository,
    ChamadoAnexosRepository
  ]
})

export class DatabaseModule {}