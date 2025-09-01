import { hash } from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";
import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/either";
import { ResouceNotFoundError } from "src/core/errors/errors/resource-not-found";
import { NotAllowedError } from "src/core/errors/errors/not-allowerd-error";
import { AnalistaRepository } from "../repository/analista-repository";

interface EditUserRequest {
  analistaId
  email: string
  password?: string
  cargo?: string
  loja?: string
}

type EditUserResponse = Either<ResouceNotFoundError | NotAllowedError, {
  user: User
}>

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private analistaRepository: AnalistaRepository
  ){}

  async execute({analistaId, email, cargo, password, loja}: EditUserRequest): Promise<EditUserResponse> {
    
    const user = await this.userRepository.findByEmail(email)
    
    if(!user) {
      return left(new ResouceNotFoundError())
    }

    const isAnalista = await this.analistaRepository.findById(analistaId)

    if(!isAnalista) {
      return left(new NotAllowedError())
    }

    user.cargo = cargo ?? user.cargo
    user.loja = loja ?? user.loja
    user.password = password ? await hash(password, 6) : user.password
    await this.userRepository.save(user)

    return right({
      user
    })
  }
}