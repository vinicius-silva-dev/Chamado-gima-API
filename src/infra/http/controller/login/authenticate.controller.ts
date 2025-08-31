import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation';
import { AuthenticateUseCase } from 'src/domain/application/use-case/authenticate';
import { WrongCredentialsError } from 'src/core/errors/errors/wrong-credentials-error';

const envSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof envSchema>; // aqui estamos inferindo type envSchema para o type User
const bodyValidation = new ZodValidationPipe(envSchema)

@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  @Post()
  @HttpCode(201)
  async authenticate(@Body(bodyValidation) body: User) {
    
    const { email, password } = body;
    
    const result = await this.authenticateUseCase.execute({
      email,
      password
    });

    if (result.isLeft()) {
      // console.log(result.value)
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default: 
        throw new BadRequestException(error.message)
      }
    }
    
    return result.value
    
  }
}
