import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { AnexosRepository } from "src/domain/application/repository/anexos-repository";
import { Anexos } from "src/domain/enteprise/entities/anexos";
// import { PrismaAnexossMappers } from "../mappers/prisma-anexos-mappers";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { PrismaAnexosMappers } from "../mappers/prisma-anexos-mappers";


@Injectable()
export class PrismaAnexosRepository implements AnexosRepository {
  constructor(
    private prisma: PrismaService
  ) {}
  findByChamadoId(chamadoId: string): Promise<Anexos[] | null> {
    throw new Error("Method not implemented.");
  }
  findByAtualizacao(atualizacao: string): Promise<Anexos[] | null> {
    throw new Error("Method not implemented.");
  }
  delete(anexos: Anexos): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async findById(id: string): Promise<Anexos | null> {
    const anexos = await this.prisma.anexos.findUnique({
      where: {
        id
      }
    })

    if (!anexos) {
      return null
    }

    return PrismaAnexosMappers.toDomain(anexos)
  }

  // async findByUserId(userId: string): Promise<Anexos[] | null> {
  //   const anexos = await this.prisma.anexos.findUnique({
  //     where: {
  //       userId
  //     }
  //   })

  //   if (!anexos) {
  //     return null
  //   }

    
  //   return PrismaAnexosMappers.toDomain(anexos)
  // }

  // findByCargo(cargo: string): Promise<Anexos | null> {
  //   throw new Error("Method not implemented.");
  // }

  async save(anexos: Anexos): Promise<void> {
    const data = PrismaAnexosMappers.toPrisma(anexos)
    
    await this.prisma.anexos.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async create(anexos: Anexos): Promise<void> {
    try {
      const data = PrismaAnexosMappers.toPrisma(anexos)
      await this.prisma.anexos.create({
        data
      })
    } catch (error) {
      console.log('Deu ruim', error)
    }
  }

  // async delete(id: string): Promise<void> {
  //   try {
  //     const anexos = await this.findById(id)

  //     if(!anexos) {
  //       throw new Error('Anexos not found!?')
  //     }

  //     await this.prisma.anexoss.delete({
  //       where: {
  //         id
  //       }
  //     })
  //   } catch (error) {
  //     console.log('Deu ruim', error)
  //   }
  // }
 
}