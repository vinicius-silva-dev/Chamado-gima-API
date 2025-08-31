import { Body, Controller, ForbiddenException, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EncerrarChamadoUseCase } from "src/domain/application/use-case/chamados/encerrar-chamado";

import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation";
import { NotAllowedError } from "src/core/errors/errors/not-allowerd-error";
import { ResouceNotFoundError } from "src/core/errors/errors/resource-not-found";

const envSchema = z.object({
  descricaoEncerramento: z.string().min(20, {
    message: "A descrição deve tem pelo menos 20 caracteres."
  }),
  status: z.string().default("Resolvido")
})

type Chamado = z.infer<typeof envSchema>

const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/encerrarchamado/:chamadoId/:analistaId')
export class EncerrarChamadoController {
  constructor (
    private encerrarChamadoUseCase: EncerrarChamadoUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @HttpCode(201)
  async encerrarChamado(
    @Param('chamadoId') chamadoId: string,
    @Param('analistaId') analistaId: string,
    @Body(bodyValidation) body: Chamado
  ) {
    try {
      const {
        descricaoEncerramento,
        status
      } = body
  
      
     const result = await this.encerrarChamadoUseCase.excecute({
      chamadoId,
      analistaId,
      descricaoEncerramento,
      status
     })

      if (result.isLeft()) {
        const error = result.value;
        
        if (error.constructor.name === "ResouceNotFoundError") {
          return new NotFoundException(error.message || "Chamado não encontrado");
        }
  
        if (error.constructor.name === "NotAllowedError") {
          return new ForbiddenException(error.message || "Usuário não autorizado a encerrar o chamado");
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