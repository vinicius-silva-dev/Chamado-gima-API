import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from 'supertest'
import { AppModule } from "src/app.module";
import { describe } from "vitest";
import { DatabaseModule } from "src/infra/database/database.module";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcrypt";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

describe('Upload anexos E2E', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('(POST) /anexos', async () => {
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

    const response = await request(app.getHttpServer())
      .post('/anexos')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/capa_linkedin.jpg')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      anexosId: expect.any(String)
    })
  })
})