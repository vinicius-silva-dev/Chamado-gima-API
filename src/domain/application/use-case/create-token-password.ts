
import { Injectable } from "@nestjs/common";
import { TokenResetPasswordRepository } from "../repository/token-reset-repository";
import { TokenResetPassword } from "src/domain/enteprise/entities/token-reset-password";

export interface CreateTokenPasswordRequest {
  token: string
  userId: string
}

type CreateTokenPasswordResponse = {
  tokenpassword: TokenResetPassword
}

@Injectable()
export class CreateTokenResetPasswordUseCase {
  constructor(
    private tokenpasswordRepository: TokenResetPasswordRepository
  ){}
  async execute({
    token,
    userId
  }: CreateTokenPasswordRequest): Promise<CreateTokenPasswordResponse> {
    const tokenpassword = await TokenResetPassword.create({
      token,
      userId
    })

    await this.tokenpasswordRepository.create(tokenpassword)


    return {tokenpassword}
  }
}