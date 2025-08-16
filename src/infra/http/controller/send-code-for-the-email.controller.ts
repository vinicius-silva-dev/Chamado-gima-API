import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { SendEmail } from "./send-email.service";
import { ZodValidationPipe } from "../pipes/zod-validation";
import { UserRepository } from "src/domain/application/repository/user-repository";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { CreateTokenResetPasswordUseCase } from "src/domain/application/use-case/create-token-password";
import { TokenResetPasswordRepository } from "src/domain/application/repository/token-reset-repository";

const emailZod = z.object({
  email: z.string().email()
})

type Auth = z.infer<typeof emailZod>

@Controller('/sendmail')
export class SendCodeForTheEmailController {
  constructor(
    private readonly sendEmail: SendEmail,
    private tokenResetPasswordUseCase: CreateTokenResetPasswordUseCase,
    private userRepository: UserRepository
  ) {}
  
  @Post()
  @UsePipes(new ZodValidationPipe(emailZod))
  async sendCode(@Body() body: Auth) {
    try {
  
      const user = await this.userRepository.findByEmail(body.email)

      if(!user) {
        throw new Error('User not found!')
      }

      // O código abaixo precisa ser salvo em um reporitory do tipo TokenResetRepository.
      const codigo = Math.floor(Math.random() * 125542).toString()
      const content = {
        codigo,
        title: "Código de verificação."
      }

      const sendEmail = await this.sendEmail.sendCode(body.email, content.codigo.toString())

      if(sendEmail) {
        await this.tokenResetPasswordUseCase.execute({
          token: codigo,
          userId: user.id.toString()
        })
      }
      
       return sendEmail

    } catch (error) {
      console.log('Deu ruim', error)
    }
  }
}