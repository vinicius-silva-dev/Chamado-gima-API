import { hash } from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";

interface DeleteUserRequest {
  id: string
}

type DeleteUserResponse = {
  mensage: string
}

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository
  ){}

  async execute({id}: DeleteUserRequest): Promise<DeleteUserResponse> {

      // const user = await this.userRepository.findById(id)

      // if(!user) {
      //   throw new Error('User not found!!')
      // }

      await this.userRepository.delete(id)

    return {
      mensage: 'Usuário deletado com sucesso!'
    }
  }
}