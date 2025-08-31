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

describe('Update chamado e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let anexosFactory: AnexosFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, AnexosFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    anexosFactory = moduleRef.get(AnexosFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[Put] should be able to update a chamado!', async () => {
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

    const anexos1 = await anexosFactory.makePrismaAnexos()
    const anexos2 = await anexosFactory.makePrismaAnexos()

    // const analista = await prisma.analista.create({
    //   data: {
    //       name: 'Maria Silva',
    //       email: 'mari100@live.com',
    //       password: await hash('123456', 6),
    //       categoria: 'Analista',
    //       createdAt: new Date(),
    //     }
    // })
    
    const accessToken = jwt.sign({ sub: user.id.toString()})
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

    await request(app.getHttpServer())
      .post(`/atualizacaochamado/${chamado.id}/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
      descricao: "Este chamado esta recebendo atualização com a autorização do usuário, pois, o caso foi resolvido.",
      anexosIds: [
        anexos1.id.toString(),
        anexos2.id.toString()
      ]
    })
    
    // console.log('test: ', result.body.error.details)
    const atualizacaoOnDatabase = await prisma.atualizacaoChamado.findFirst({
      where: {
        chamadoId: chamado.id
      }
    })

    expect(atualizacaoOnDatabase?.descricao).toEqual(
      "Este chamado esta recebendo atualização com a autorização do usuário, pois, o caso foi resolvido."
    )
  })
})