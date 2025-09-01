import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { UserRepository } from "src/domain/application/repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";
import { PrismaUserMappers } from "../mappers/prisma-user-mappers";


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService
  ) {}
  
  async findMany(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany()

    if (!users) {
      return null
    }

    return users.map((user) => PrismaUserMappers.toDomain(user))
  }
  async findById(id: string): Promise<User | null> {
    
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })


    if (!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user)
  }

  findByCargo(cargo: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMappers.toPrisma(user)
    
    await this.prisma.user.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async create(user: User): Promise<void> {
    try {
      const data = PrismaUserMappers.toPrisma(user)
      await this.prisma.user.create({
        data
      })
    } catch (error) {
      console.log('Deu ruim', error)
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const user = await this.findById(id)

      if(!user) {
        throw new Error('User not found!?')
      }

      await this.prisma.user.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.log('Deu ruim', error)
    }
  }
  
 
  
}