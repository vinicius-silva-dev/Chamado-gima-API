import { Body, Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListChamadosByUserUseCase } from "src/domain/application/use-case/chamados/list-chamados-by-user";
import { JwtAuthGuard } from "src/infra/auth/jwt-guard";
// import { JwtAuthGuard } from "src/infra/auth/jwt-guard";
import { z } from "zod";

const envSchema = z.object({
  userId: z.string().uuid()
})

type Chamado = z.infer<typeof envSchema>


@Controller('/listchamados/:userId')
export class ListChamadosByUserController {
  constructor (
    private listChamadosByUserUseCase: ListChamadosByUserUseCase
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async listChamadosByUser(@Param('userId') userId: string) {
    try {

      const chamados = await this.listChamadosByUserUseCase.excecute({
        userId: userId
      })

      return chamados.value

    } catch (error) {
      if(error instanceof Error) {
        console.log('Chamados not found!', error)
        return error.message
      }
    }
    
  }
}