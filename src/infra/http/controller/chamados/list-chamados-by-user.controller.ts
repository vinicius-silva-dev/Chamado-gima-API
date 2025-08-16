import { Body, Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ListChamadosByUserUseCase } from "src/domain/application/use-case/chamados/list-chamados-by-user";
import { z } from "zod";

const envSchema = z.object({
  userId: z.string().uuid()
})

type Chamado = z.infer<typeof envSchema>

@Controller('/listchamados')
export class ListChamadosByUserController {
  constructor (
    private listChamadosByUserUseCase: ListChamadosByUserUseCase
  ) {}

  @Get()
  @HttpCode(200)
  async listChamadosByUser(@Param('id') userId: string) {
    try {

      const chamados = await this.listChamadosByUserUseCase.excecute({
        userId: userId
      })

      return chamados

    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamados not found!', error)
        return error.message
      }
    }
    
  }
}