import { hash } from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";

interface EditUserRequest {
  email: string
  password?: string
  codigo?: string
}

type EditUserResponse = {
  user: User
}

export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository
  ){}

  async execute({email, password}: EditUserRequest): Promise<EditUserResponse> {

      const user = await this.userRepository.findByEmail(email)

      if(!user) {
        throw new Error('User not found')
      }

      user.password = password ? await hash(password, 6) : user.password

      await this.userRepository.save(user)

    return {
      user
    }
  }
}