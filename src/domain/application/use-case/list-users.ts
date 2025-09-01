import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
import { UserRepository } from '../repository/user-repository';
import { User } from 'src/domain/enteprise/entities/user';
import { AnalistaRepository } from '../repository/analista-repository';
import { NotAllowedError } from 'src/core/errors/errors/not-allowerd-error';

// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface ListUsersRequest {
  analistaId: string
}

type ListUsersResponse = Either<ResouceNotFoundError | NotAllowedError, {
  user: User[]
}>;

@Injectable()
export class ListUsersUseCase {
  constructor(
    private userRepository: UserRepository,
    private analistaRepository: AnalistaRepository,
  ) {}

  async execute({
    analistaId
  }: ListUsersRequest): Promise<ListUsersResponse> {
    const isAnalista = await this.analistaRepository.findById(analistaId)

    if(!isAnalista) {
      return left(new NotAllowedError())
    }

    const user = await this.userRepository.findMany()

    if(!user){
      return left(new ResouceNotFoundError())
    }

    return right({
      user
    })
    
  }
}
