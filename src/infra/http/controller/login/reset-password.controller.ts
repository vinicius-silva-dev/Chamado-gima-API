import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ResetPasswordUseCase } from 'src/domain/application/use-case/reset-password';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation';

const envShema = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string(),
});

type User = z.infer<typeof envShema>; // aqui estamos inferindo type envSchema para o type User

@Controller('/resetpassword')
export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  @Post()
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(envShema))
  async sendCode(@Body() body: User) {
    const { email, token, password } = body;

    const result = await this.resetPasswordUseCase.execute({
      email,
      password,
      token,
    });

    if (!result) {
      throw new Error();
    }
  }
}
