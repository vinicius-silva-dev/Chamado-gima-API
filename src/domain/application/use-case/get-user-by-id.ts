import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
import { UserRepository } from '../repository/user-repository';
import { User } from 'src/domain/enteprise/entities/user';

// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface GetUserByIdRequest {
  id: string;
}

type GetUserByIdResponse = Either<ResouceNotFoundError, {
  user: User
}>;

@Injectable()
export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id
  }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
  
    const user = await this.userRepository.findById(id)

    if(!user){
      return left(new ResouceNotFoundError())
    }

    return right({
      user
    })
    
  }
}
