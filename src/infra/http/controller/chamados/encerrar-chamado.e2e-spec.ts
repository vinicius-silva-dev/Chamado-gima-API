import {Test} from '@nestjs/testing'
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { beforeAll, describe, test } from "vitest";
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { AnexosFactory } from 'test/factory/make-anexos';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { object } from 'zod';

describe('Close chamado e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, AnexosFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[Put] should be able to close a chamado!', async () => {
    // const user = await userFactory.makePrismaUser()
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

    const accessToken = jwt.sign({ sub: user.id })
    const analista = await prisma.analista.create({
      data: {
        name: 'Osvaldo Silva',
        email: 'osvaldo100@live.com',
        password: await hash('123456', 6),
        categoria: 'Padrão',
        createdAt: new Date(),
      }
    })
    
    const chamado = await prisma.chamados.create({
      data: {
        userId: user.id,
        loja: 'Gima FL Jaru',
        prioridade: 'Medio',
        tipoChamado: 'Erro no sistema',
        title: 'Chamado de teste.',
        descricao: 'Essa descição é apenas um teste.',
        descricaoEncerramento: '',
        descricaoCancelamento: '',
        telefone: '69992115445',
      }
    })


    const result = await request(app.getHttpServer())
      .put(`/encerrarchamado/${chamado.id}/${analista.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        descricaoEncerramento: "Este chamado esta sendo encerrado com a autorização do usuário, pois, o caso foi resolvido.",
      })
    
    const chamadoOnDatabase = await prisma.chamados.findFirst({
      where: {
        id: chamado.id
      }
    })

    expect(result.body).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          descricaoEncerramento: "Este chamado esta sendo encerrado com a autorização do usuário, pois, o caso foi resolvido."
        }),

      })
    )
  })
})