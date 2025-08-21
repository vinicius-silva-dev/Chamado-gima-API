import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
// import { UniqueEntityId } from "src/core/entities/unique-entity-id";
// import { CreateAnexosUseCase } from "src/domain/application/use-case/chamados/create-anexos";
import { CreateChamadoUseCase } from "src/domain/application/use-case/chamados/create-chamado";
import { StatusValueObject } from "src/domain/enteprise/entities/value-object/status";

import { z } from "zod";

const envSchema = z.object({
  userId: z.string().uuid(),
  loja: z.string(),
  prioridade: z.enum([
    'Baixo',
    'Medio',
    'Alto'
  ]),
  tipoChamado: z.enum([
    'Erro no sistema',
    'Duvída',
    'Cadastro de usuários'
  ]),
  status: z.enum([
    'aberto',
    'atendimento',
    'resolvido',
    'cancelado',
  ]).default('aberto'),
  title: z.string(),
  descricao: z.string().length(25),
  anexos: z.array(z.string().uuid()),
  // anexos: z.array(z.object({
  //   id: z.string(),
  //   title: z.string(),
  //   link: z.string().url()
  // })).default([]),
  telefone: z.string()
})

type Chamado = z.infer<typeof envSchema>

@Controller('/createchamado/:userId')
export class CreateChamadoController {
  constructor (
    private createChamadoUseCase: CreateChamadoUseCase,
    // private createAnexosUseCase: CreateAnexosUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async createChamado(
    @Param('userId') userId: string,
    @Body() body: Chamado
  ) {
    try {
      const {
        loja,
        prioridade,
        tipoChamado,
        status,
        title,
        descricao,
        anexos,
        telefone
      } = body
  
      // console.log(body)
      await this.createChamadoUseCase.excecute({
        userId,
        loja,
        prioridade,
        tipo_chamado: tipoChamado,
        status: new StatusValueObject(status),
        title,
        descricao,
        anexosIds: anexos,
        telefone
      })
      
      // anexos.forEach(async (item) => {
      //   await this.createAnexosUseCase.excecute({
      //     title: item.title,
      //     link: item.link
      //   })
      // })
     
      return {
        stautsCode: 201,
        mensage: 'Chamado created'
      }
    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamado não criado! ', error)
        return error.message
      }
    }
    
  }
}