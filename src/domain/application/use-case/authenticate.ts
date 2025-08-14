import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user-repository";
import { compare } from "bcrypt";
import { Either, left, right } from "src/core/either";
import { WrongCredentialsError } from "src/core/errors/errors/wrong-credentials-error";
import { Encrypter } from "../criptography/encrypter";

interface AuthenticateRequest {
  email: string;
  password: string
}

type AuthenticateResponse = Either<WrongCredentialsError, {
  token: string
}> 

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    
    const findUser = await this.userRepository.findByEmail(email)

    if(!findUser) {
      return left(new WrongCredentialsError())
    }

    const isPassword = await compare(password, findUser.password)

    if(!isPassword) {
      return left(new WrongCredentialsError())
    }

    const token = await this.encrypter.encrypt({sub: findUser.id.toString()})

    return right({
      token
    }) 

  }
}