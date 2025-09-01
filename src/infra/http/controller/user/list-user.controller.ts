/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { ListAllChamadosUseCase } from 'src/domain/application/use-case/chamados/list-all-chamados';
import { ListUsersUseCase } from 'src/domain/application/use-case/list-users';


@Controller('/listusers/:analistaId')
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async listUsers(
    @Param('analistaId') analistaId: string,
  ) {
    try {

      const result = await this.listUsersUseCase.execute({analistaId})
    
      if (!result) {
        throw new Error()
      }

      
      return result.value
    } catch (error) {
      console.log("Deu ruim ", error)
    }
    
  }
}
