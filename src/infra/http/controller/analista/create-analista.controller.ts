import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateAnalistaUseCase } from "src/domain/application/use-case/create-analista";
import { CreateUserUseCase } from "src/domain/application/use-case/create-user";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation";

const envSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

type User = z.infer<typeof envSchema>

const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/createanalista')
export class CreateAnalistaController {
  constructor (
    private createAnalistaUseCase: CreateAnalistaUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body(bodyValidation) body: User) {
    try {
      const {
        name,
        email,
        password,
      } = body
  
      await this.createAnalistaUseCase.execute({
        name,
        email,
        password,
      })
      
     
      return {
        stautsCode: 201,
        mensage: 'Analista created'
      }
    } catch (error) {
      if(error instanceof Error) {
        console.log('Usuário não criado! ', error)
        return error.message
      }
    }
    
  }
}