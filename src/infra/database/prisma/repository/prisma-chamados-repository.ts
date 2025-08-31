import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { ChamadoRepository } from "src/domain/application/repository/chamado-repository";
import { Chamado } from "src/domain/enteprise/entities/chamado";
import { PrismaChamadosMappers } from "../mappers/prisma-chamados-mappers"
import { ChamadoAnexosRepository } from "src/domain/application/repository/chamado-anexos-repository";


@Injectable()
export class PrismaChamadoRepository implements ChamadoRepository {
  constructor(
    private prisma: PrismaService,
    private chamadoAnexosRepository: ChamadoAnexosRepository
  ) {}

  
  async findById(id: string): Promise<Chamado | null> {
    const chamado = await this.prisma.chamados.findUnique({
      where: {
        id
      }
    })

    if (!chamado) {
      return null
    }

    return PrismaChamadosMappers.toDomain(chamado)
  }

  async findByUserId(userId: string): Promise<Chamado[] | null> {
    const chamado = await this.prisma.chamados.findMany({
      where: {
        userId
      }
    })

    if (!chamado) {
      return null
    }

    
    return chamado.map(PrismaChamadosMappers.toDomain) 
  }

  findAll(): Promise<Chamado[] | null> {
    throw new Error("Method not implemented.");
  }
  findManyServedAnalistaId(analistaId: string): Promise<Chamado[] | null> {
    throw new Error("Method not implemented.");
  }
  findByDate(date: string): Promise<Chamado | null> {
    throw new Error("Method not implemented.");
  }

  async save(chamado: Chamado): Promise<Chamado | null> {
    const data = PrismaChamadosMappers.toPrisma(chamado)
    
    const result = await this.prisma.chamados.update({
      where: {
        id: data.id
      },
      data
    })

    const newChamado = await this.findById(result.id)

    if (!chamado) {
      return null
    }

    return newChamado
  }

  async create(chamado: Chamado): Promise<void> {
    try {
    
      const data = PrismaChamadosMappers.toPrisma(chamado)

      const isUser = await this.prisma.user.findUnique({
        where: {
          id: data.userId
        }
      })

      // console.log(isUser)
      if(!isUser) {
        throw new Error('User not found !!')
      }

      await this.prisma.chamados.create({
        data
      })

      await this.chamadoAnexosRepository.createMany(chamado.anexos.getItems())
      
    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamado não foi criado! ', error)
        throw new Error(error.message)
      }
    }
  }
    
  delete(chamado: Chamado): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
 
  
}