import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation';
import { AuthenticateUseCase } from 'src/domain/application/use-case/authenticate';
import { WrongCredentialsError } from 'src/core/errors/errors/wrong-credentials-error';

const envShema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof envShema>; // aqui estamos inferindo type envSchema para o type User

@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  @Post()
  @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(envShema))
  async authenticate(@Body() body: User) {
    
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
