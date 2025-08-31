/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { GetUserByIdUseCase } from 'src/domain/application/use-case/get-user-by-id';

const userSchema = z.object({
  id: z.string().uuid(),
})


type User = z.infer<typeof userSchema>

@Controller('/perfil/:id')
export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async getUserById(
    @Param('id') id: string,
    
  ) {
    try {

      
      const result = await this.getUserByIdUseCase.execute({id})
    
      if (!result) {
        throw new Error()
      }

      
      return result.value
    } catch (error) {
      console.log("Deu ruim ", error)
    }
    
  }
}
