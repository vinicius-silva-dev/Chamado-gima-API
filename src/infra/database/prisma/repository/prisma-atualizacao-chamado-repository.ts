import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { AtualizacaoChamadoRepository } from "src/domain/application/repository/atualizacao-chamado";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AtualizacaoChamado } from "src/domain/enteprise/entities/atualizacao-chamado";
import { PrismaAnalistaMappers } from "../mappers/prisma-analista-mappers";
import { PrismaAtualizacaoChamadoMappers } from "../mappers/prisma-atualizacao-chamado-mappers";
import { ChamadoAnexosRepository } from "src/domain/application/repository/chamado-anexos-repository";
import { AtualizacaoChamadoAnexosRepository } from "src/domain/application/repository/atualizacao-chamado-anexos-repository";

@Injectable()
export class PrismaAtualizacaoChamadoRepository implements AtualizacaoChamadoRepository {
  constructor(
    private prisma: PrismaService,
    private atualizacaoChamadoAnexosRepository: AtualizacaoChamadoAnexosRepository
  ) {}

  

  async findById(id: string): Promise<AtualizacaoChamado | null> {
    const atualizacao = await this.prisma.atualizacaoChamado.findUnique({
      where: {
        id
      }
    })

    if (!atualizacao) {
      return null
    }

    return PrismaAtualizacaoChamadoMappers.toDomain(atualizacao)
  }

  findByUserId(userId: UniqueEntityId): Promise<AtualizacaoChamado[] | null> {
    throw new Error("Method not implemented.");
  }

  findByDate(date: string): Promise<AtualizacaoChamado | null> {
    throw new Error("Method not implemented.");
  }

  async create(atualizacao: AtualizacaoChamado): Promise<void> {
    try {
      const data = PrismaAtualizacaoChamadoMappers.toPrisma(atualizacao)
      console.log('banco: ', atualizacao)

      await this.prisma.atualizacaoChamado.create({
        data
      })

      await this.atualizacaoChamadoAnexosRepository.createMany(atualizacao.anexos.getItems())

    } catch (error) {
      console.log('Deu ruim!! ', error)
    }
  }
  delete(atualizacao: AtualizacaoChamado): Promise<void> {
    throw new Error("Method not implemented.");
  }

}