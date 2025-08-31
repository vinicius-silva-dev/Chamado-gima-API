import { Body, Controller, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AtualizacaoChamadoUseCase } from "src/domain/application/use-case/chamados/atualizacao-chamado";

import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation";

const envSchema = z.object({
  // chamadoId: z.string(),
  // authorId: z.string(),
  descricao: z.string(),
  anexosIds: z.array(z.string())
})

type Chamado = z.infer<typeof envSchema>

const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/atualizacaochamado/:chamadoId/:authorId')
export class AtualizacaoChamadoController {
  constructor (
    private atualizacaoChamadoUseCase: AtualizacaoChamadoUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async atualizacaoChamado(
    @Param('chamadoId') chamadoId: string,
    @Param('authorId') authorId: string,
    @Body(bodyValidation) body: Chamado
  ) {
      try {
        const {
          descricao,
          anexosIds
        } = body

        const result = await this.atualizacaoChamadoUseCase.excecute({
          chamadoId,
          authorId,
          descricao,
          anexosIds
        })
    
        return result.value?.atualizacao

      } catch (error) {
        if(error instanceof Error) {
          console.log('Atualização não foi criada! ', error)
          return error.message
        }
      }
    
  }
}