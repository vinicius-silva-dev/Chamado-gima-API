import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { ChamadoRepository } from "src/domain/application/repository/chamado-repository";
import { Chamado } from "src/domain/enteprise/entities/chamado";
import { PrismaChamadosMappers } from "../mappers/prisma-chamados-mappers";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ChamadoAnexosRepository } from "src/domain/application/repository/chamado-anexos-repository";
import { ChamadoAnexos } from "src/domain/enteprise/entities/chamado-anexos";
import { PrismaChamadoAnexosMapper } from "../mappers/prisma-chamado-anexos-mappers";


@Injectable()
export class PrismaChamadoAnexosRepository implements ChamadoAnexosRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async createMany(anexos: ChamadoAnexos[]): Promise<void> {
    if (anexos.length === 0) {
      return;
    }

    // O mepper é responsável por pegar os id dos anexos e retornar um objeto que faz a operação de update.
    const data = PrismaChamadoAnexosMapper.toPrismaUpdateMany(anexos)

    console.log(data)
    // Vamos fazer um update no chamadoId
    await this.prisma.anexos.updateMany(data)
  }

  deleteMany(anexos: ChamadoAnexos[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findManyChamadoId(chamadoId: string): Promise<Chamado[] | null> {
    throw new Error("Method not implemented.");
  }
  deleteManyByChamadoId(chamadoId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}