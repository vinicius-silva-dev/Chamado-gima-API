import { hash } from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";
import { Injectable } from "@nestjs/common";
import { TokenResetPasswordRepository } from "../repository/token-reset-repository";
import { Either, left, right } from "src/core/either";
import { ResouceNotFoundError } from "src/core/errors/errors/resource-not-found";

interface ResetPasswordRequest {
  email: string
  password: string
  token: string
}

type ResetPasswordResponse = Either<ResouceNotFoundError, {}> 

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenResetRepository: TokenResetPasswordRepository
  ){}

  async execute({email, password, token}: ResetPasswordRequest): Promise<ResetPasswordResponse> {

    const user = await this.userRepository.findByEmail(email)
    if(!user) {
      return left(new ResouceNotFoundError())
    }
    const istoken = await this.tokenResetRepository.findByToken(token)
    
    if(!istoken) {
      return left(new ResouceNotFoundError())
    }

    user.password = password ? await hash(password, 6) : user.password
    await this.userRepository.save(user)

    return right({
      message: 'Senha resetada!'
    })
  }
}