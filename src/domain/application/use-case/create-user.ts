import { User } from "src/domain/enteprise/entities/user";
import { UserRepository } from "../repository/user-repository";
import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  cargo: string;
  loja: string
}

type CreateUserResponse = {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository
  ){}
  async execute({
    name,
    email,
    password,
    cargo,
    loja
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await User.create({
      name,
      email,
      password: await hash(password, 6),
      cargo,
      loja,
      categoria: 'Padrão',
      createdAt: new Date()
    })
    await this.userRepository.create(user)


    return {user}
  }
}