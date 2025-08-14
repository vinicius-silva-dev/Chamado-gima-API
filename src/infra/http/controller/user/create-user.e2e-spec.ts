import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'

describe('Create user e2e', () => {
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
  test('[POST] should be able to create a user!', async () => {
    const result = await request(app.getHttpServer()).post('/createuser').send({
      name: 'Vinicius Silva Souza',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'Aux.TI',
      loja: 'Gima FL Jaru'
    })

    console.log(result.body)
    expect(result.statusCode).toBe(201)
  })
})