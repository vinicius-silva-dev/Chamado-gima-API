import { Body, Controller, ForbiddenException, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CancelarChamadoUseCase } from "src/domain/application/use-case/chamados/cancelar-chamado";

import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation";

const envSchema = z.object({
  descricao: z.string().min(20, {
  message: "A descrição deve tem pelo menos 20 caracteres."
}),
  status: z.string().default("Cancelado")
})

type Chamado = z.infer<typeof envSchema>

const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/cancelarchamado/:chamadoId')
export class CancelarChamadoController {
  constructor (
    private cancelarChamadoUseCase: CancelarChamadoUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @HttpCode(201)
  async cancelarChamado(
    @Param('chamadoId') chamadoId: string,
    @Body(bodyValidation) body: Chamado
  ) {
    try {
      const {
        descricao,
        status
      } = body
  
      if( status !== 'Cancelado') {
        throw new Error('Status incorreto.')
      }
      const result = await this.cancelarChamadoUseCase.excecute({
        chamadoId,
        descricao,
        status
      })

      if (result.isLeft()) {
        const error = result.value;
        
        if (error.constructor.name === "ResouceNotFoundError") {
          return new NotFoundException(error.message || "Chamado não encontrado");
        }
  
        if (error.constructor.name === "NotAllowedError") {
          return new ForbiddenException(error.message || "Usuário não autorizado a cancelar o chamado");
        }
      }
  
      return result.value
      

    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamado não foi encerrado! ', error)
        return error.message
      }
    }
    
  }
}