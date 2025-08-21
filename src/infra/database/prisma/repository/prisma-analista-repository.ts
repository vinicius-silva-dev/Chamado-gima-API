import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { UserRepository } from "src/domain/application/repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";
import { PrismaUserMappers } from "../mappers/prisma-user-mappers";
import { AnalistaRepository } from "src/domain/application/repository/analista-repository";
import { Analista } from "src/domain/enteprise/entities/analistas";
import { PrismaAnalistaMappers } from "../mappers/prisma-analista-mappers";


@Injectable()
export class PrismaAnalistaRepository implements AnalistaRepository {
  constructor(
    private prisma: PrismaService
  ) {}
  async findById(id: string): Promise<Analista | null> {
    const user = await this.prisma.analista.findUnique({
      where: {
        id
      }
    })
    
    if (!user) {
      return null
    }

    return PrismaAnalistaMappers.toDomain(user)
  }
  findByEmail(email: string): Promise<Analista | null> {
    throw new Error("Method not implemented.");
  }
  findByCategoria(categoria: string): Promise<Analista | null> {
    throw new Error("Method not implemented.");
  }
  save(analista: Analista): Promise<void> {
    throw new Error("Method not implemented.");
  }
  create(analista: Analista): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(analista: Analista): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  
}