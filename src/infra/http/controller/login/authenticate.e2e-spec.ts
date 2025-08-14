import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'
import { hash } from 'bcrypt';

describe('Authenticate e2e', () => {
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
  test('[POST] shoud be abble to user authenticate in aplication', async () => {
    await prisma.user.create({
      data: {
        name: 'Vinicius Silva Souza',
        email: 'vinicius100@live.com',
        password: await hash('123456', 6),
        cargo: 'Aux.TI',
        categoria: 'Padrão',
        loja: 'Gima FL Jaru'
      }
    })

    const result = await request(app.getHttpServer()).post('/auth').send({
      email: 'vinicius100@live.com',
      password: '123456'
    })
  
    console.log(result.body)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({
      token: expect.any(String)
    })

  })
})