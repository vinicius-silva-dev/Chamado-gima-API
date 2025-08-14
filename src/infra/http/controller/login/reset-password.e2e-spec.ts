import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'
import { hash } from 'bcrypt';

describe('Reset password e2e', () => {
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
  test('shoud be abble to reset password by token sended email.', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Vinicius Silva Souza',
        email: 'vinicius100@live.com',
        password: await hash('123456', 6),
        cargo: 'Aux.TI',
        categoria: 'Padrão',
        loja: 'Gima FL Jaru'
      }
    })

    await prisma.tokenResetPassword.create({
      data: {
        token: '25476',
        userId: user.id
      }
    })

    const result = await request(app.getHttpServer()).post('/resetpassword').send({
      email: 'vinicius100@gmail.com',
      token: '25476',
      password: '413380vss'
    })

    expect(result.statusCode).toBe(200)
  })
})