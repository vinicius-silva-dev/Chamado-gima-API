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

describe('Create chamado e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, AnexosFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  test('[POST] should be able to create a chamado!', async () => {
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
    
    const chamado1 = await prisma.chamados.create({
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

    const chamado2 = await prisma.chamados.create({
      data: {
        userId: user.id,
        loja: 'Gima FL Jaru',
        prioridade: 'Medio',
        tipoChamado: 'Erro no sistema 2',
        title: 'Chamado de teste 2.',
        descricao: 'Essa descição é apenas um teste 2.',
        descricaoEncerramento: '',
        descricaoCancelamento: '',
        telefone: '69992115445',
      }
    })

    await request(app.getHttpServer()).get(`/listchamados/${user.id}`)
    
    const chamadoOnDatabase = await prisma.chamados.findMany({
      where: {
        userId: user.id
      }
    })
    console.log('chamadoOnDatabase: ', chamadoOnDatabase)

    expect(chamadoOnDatabase).toEqual([
      expect.objectContaining({
        tipoChamado: 'Erro no sistema',
      }),
      expect.objectContaining({
        tipoChamado: 'Erro no sistema 2',
      }),
    ])

   
  })
})