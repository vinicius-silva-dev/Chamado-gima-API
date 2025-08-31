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

describe('Create chamado e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let anexosFactory: AnexosFactory
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, AnexosFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    anexosFactory = moduleRef.get(AnexosFactory)
    jwt = moduleRef.get(JwtService)

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

    const accessToken = jwt.sign({ sub: user.id })

    const anexos1 = await anexosFactory.makePrismaAnexos()
    const anexos2 = await anexosFactory.makePrismaAnexos()

    const result = await request(app.getHttpServer())
      .post(`/createchamado/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        loja: 'Gima FL Jaru',
        prioridade: 'Medio',
        tipoChamado: 'Erro no sistema',
        title: 'Chamado de teste.',
        descricao: 'Essa descição é apenas um teste, mas ela precista tem mais de 25 caracteres para ser valido, caso contrário, teremos um erro.',
        anexos: [
          anexos1.id.toString(),
          anexos2.id.toString()
        ],
        telefone: '69992115445',
    })

    // const anexos = await prisma.$queryRaw` SELECT * FROM Anexos INNER JOIN Chamados ON Anexos.id = Chamados.anexos`
    
    const chamadoOnDatabase = await prisma.chamados.findFirst({
      where: {
        userId: user.id
      }
    })
    
    expect(chamadoOnDatabase).toBeTruthy()

    // const anexosOnDatabase = await prisma.anexos.findMany({
    //   where: {
    //     chamadoId: chamadoOnDatabase?.id
    //   }
    // })

    // expect(anexosOnDatabase).toHaveLength(2)
    // expect(
    //   await prisma.$queryRaw` SELECT * FROM Anexos INNER JOIN Chamados ON Anexos.id = Chamados.anexos`
    // )
  })
})