import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/application/use-case/create-user";
import { z } from "zod";

const envSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  cargo: z.string(),
  loja: z.string()
})

type User = z.infer<typeof envSchema>

@Controller('/createuser')
export class CreateUserController {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: User) {
    try {
      const {
        name,
        email,
        password,
        cargo,
        loja
      } = body
  
      await this.createUserUseCase.execute({
        name,
        email,
        password,
        cargo,
        loja
      })
      
     
      return {
        stautsCode: 201,
        mensage: 'User created'
      }
    } catch (error) {
      if(error instanceof Error) {
        console.log('Usuário não criado! ', error)
        return error.message
      }
    }
    
  }
}