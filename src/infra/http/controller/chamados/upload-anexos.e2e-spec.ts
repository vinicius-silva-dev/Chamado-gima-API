import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from 'supertest'
import { AppModule } from "src/app.module";
import { describe } from "vitest";
import { DatabaseModule } from "src/infra/database/database.module";

describe('Upload anexos E2E', () => {
  let app: INestApplication
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    // prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('(POST) /anexos', async () => {

    const response = await request(app.getHttpServer())
      .post('/anexos')
      .attach('file', './test/e2e/capa_linkedin.jpg')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      anexosId: expect.any(String)
    })
  })
})