import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('List user e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule]
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[PUT] should be able to list all users.', async () => {
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

    const accessToken = jwt.sign({ sub: user.id.toString()})

    const analista = await prisma.analista.create({
      data: {
        name: 'Vinicius Silva',
        email: 'vinicius100@live.com',
        password: await hash('123456', 6),
        categoria: 'Analista',
        createdAt: new Date(),
      }
    })

    const result = await request(app.getHttpServer())
      .get(`/listusers/${analista.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    const userOnDatabase = await prisma.user.findMany({
      where: {
        id: user.id
      }
    })

    console.log(userOnDatabase)
    expect(result.statusCode).toBe(200)
    expect(userOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'osvaldo100@live.com'
        }),
      ])
    )
  })
})