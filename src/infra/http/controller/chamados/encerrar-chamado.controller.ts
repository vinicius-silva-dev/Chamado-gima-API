import { Body, Controller, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EncerrarChamadoUseCase } from "src/domain/application/use-case/chamados/encerrar-chamado";

import { z } from "zod";

const envSchema = z.object({
  chamadoId: z.string(),
  userId: z.string(),
  descricaoEncerramento: z.string().min(20, {
    message: "A descrição deve tem pelo menos 20 caracteres."
  }),
  status: z.string()
})

type Chamado = z.infer<typeof envSchema>

@Controller('/encerrarchamado/:chamadoId/:userId')
export class EncerrarChamadoController {
  constructor (
    private encerrarChamadoUseCase: EncerrarChamadoUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @HttpCode(201)
  async encerrarChamado(
    @Param('chamadoId') chamadoId: string,
    @Param('userId') userId: string,
    @Body() body: Chamado
  ) {
    try {
      const {
        descricaoEncerramento,
        status
      } = body
  
     const result = await this.encerrarChamadoUseCase.excecute({
      chamadoId,
      userId,
      descricaoEncerramento,
      status
     })

      
      return result.value

    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamado não foi encerrado! ', error)
        return error.message
      }
    }
    
  }
}