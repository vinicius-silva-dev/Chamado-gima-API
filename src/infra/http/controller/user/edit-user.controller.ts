/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { EditUserUseCase } from 'src/domain/application/use-case/edit-user';
import { envSchema } from 'src/infra/env/env';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation';

const userSchema = z.object({
  email: z.string().email(),
  cargo: z.string(),
  loja: z.string(),
  password: z.string(),
})


type User = z.infer<typeof userSchema>

const bodyValidation = new ZodValidationPipe(userSchema)

@Controller('/edituser/:analistaId')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) { }

  @Put()
  @HttpCode(201)
  async editUser(
    @Param('analistaId') analistaId: string,
    @Body(bodyValidation) body: User,
    
  ) {
    try {
      const {email, password } = body

      const result = await this.editUserUseCase.execute({
        analistaId,
        email,
        password
      })
    
      if (!result) {
        throw new Error()
      }

      return result.value
    } catch (error) {
      console.log("Deu ruim ", error)
    }
    
  }
}
