/* eslint-disable prettier/prettier */
import { Controller, Delete, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteUserUseCase } from 'src/domain/application/use-case/delete-user';

@Controller('/deleteuser/:id')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) { }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @HttpCode(204)
  async getUserById(
    @Param('id') id: string,
  ) {
    try {

      const result = await this.deleteUserUseCase.execute({id})
    
      if (!result) {
        throw new Error()
      }

    } catch (error) {
      console.log("Deu ruim ", error)
    }
      
    
  }
}
