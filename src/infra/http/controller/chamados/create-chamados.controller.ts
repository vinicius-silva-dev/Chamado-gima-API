import { Body, Controller, HttpCode, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateChamadoUseCase } from "src/domain/application/use-case/chamados/create-chamado";
import { StatusValueObject } from "src/domain/enteprise/entities/value-object/status";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation";

const envSchema = z.object({
  // userId: z.string().uuid(),
  loja: z.string(),
  prioridade: z.enum([
    'Baixo',
    'Medio',
    'Alto'
  ]),
  tipoChamado: z.enum([
    'Erro no sistema',
    'Liberar acesso',
    'Duvida',
    'Cadastro de usuários'
  ]),
  status: z.enum([
    'Aberto',
    'Atendimento',
    'Resolvido',
    'Cancelado',
  ]).default('Aberto'),
  title: z.string(),
  descricao: z.string().min(25, {
    message: "A descrição precisa ter pelo menos 25 caracteres"
  }),
  anexos: z.array(z.string().uuid()).default([]),
  // anexos: z.array(z.object({
  //   id: z.string(),
  //   title: z.string(),
  //   link: z.string().url()
  // })).default([]),
  telefone: z.string()
})

type Chamado = z.infer<typeof envSchema>

const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/createchamado/:userId')
export class CreateChamadoController {
  constructor (
    private createChamadoUseCase: CreateChamadoUseCase,
    // private createAnexosUseCase: CreateAnexosUseCase
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async createChamado(
    @Param('userId') userId: string,
    @Body(bodyValidation) body: Chamado
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