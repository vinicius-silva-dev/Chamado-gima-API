import { hash } from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";
import { Injectable } from "@nestjs/common";

interface EditUserRequest {
  email: string
  password?: string
  cargo?: string
  loja?: string
}

type EditUserResponse = {
  user: User
}

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository
  ){}

  async execute({email, cargo, password, loja}: EditUserRequest): Promise<EditUserResponse> {
    
    const user = await this.userRepository.findByEmail(email)
    

    if(!user) {
      throw new Error('User not found')
    }

    user.cargo = cargo ?? user.cargo
    user.loja = loja ?? user.loja
    user.password = password ? await hash(password, 6) : user.password
    await this.userRepository.save(user)

    return {
      user
    }
  }
}