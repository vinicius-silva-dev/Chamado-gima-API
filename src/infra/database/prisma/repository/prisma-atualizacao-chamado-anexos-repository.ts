import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { AtualizacaoChamado } from "@prisma/client";
import { AtualizacaoChamadoAnexosRepository } from "src/domain/application/repository/atualizacao-chamado-anexos-repository";
import { AtualizacaoChamadoAnexos } from "src/domain/enteprise/entities/atualizacao-chamado-anexos";
import { PrismaAtualizacaoChamadoAnexosMapper } from "../mappers/prisma-atualizacao-chamado-anexos-mappers";



@Injectable()
export class PrismaAtualizacaoChamadoAnexosRepository implements AtualizacaoChamadoAnexosRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async createMany(anexos: AtualizacaoChamadoAnexos[]): Promise<void> {
    if (anexos.length === 0) {
      return;
    }

    // O mepper é responsável por pegar os id dos anexos e retornar um objeto que faz a operação de update.
    const data = PrismaAtualizacaoChamadoAnexosMapper.toPrismaUpdateMany(anexos)

    // Vamos fazer um update no atualizacaochamadoId
    await this.prisma.anexos.updateMany(data)
  }

  deleteMany(anexos: AtualizacaoChamadoAnexos[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findManyAtualizacaoChamadoId(atualizacaochamadoId: string): Promise<AtualizacaoChamado[] | null> {
    throw new Error("Method not implemented.");
  }
  deleteManyByAtualizacaoChamadoId(atualizacaochamadoId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}