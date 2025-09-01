import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'
import { hash } from 'bcrypt';

describe('Edit user e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule]
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  test('[PUT] should be able to edit a user!', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Osvaldo Silva',
        email: 'osvaldo100@live.com',
        password: await hash('123456', 6),
        cargo: 'aux.financeiro',
        categoria: 'Padrão',
        loja: 'Gima FL Jaru',
        createdAt: new Date(),
      }
    })

    const analista = await prisma.analista.create({
      data: {
        name: 'Vinicius Silva',
        email: 'vinicius100@live.com',
        password: await hash('123456', 6),
        categoria: 'Analista',
        createdAt: new Date(),
      }
    })

    const result = await request(app.getHttpServer()).put(`/edituser/${analista.id}`).send({
      email: 'osvaldo100@live.com',
      password: '123456',
      cargo: 'aux.financeiro',
      loja: 'Gima FL Jaru'
    })

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        id: user.id
      }
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          props: expect.objectContaining({
            cargo: "aux.financeiro"
          })
        })
        
      })
    )
    expect(userOnDatabase?.cargo).toEqual("aux.financeiro")

  })
})