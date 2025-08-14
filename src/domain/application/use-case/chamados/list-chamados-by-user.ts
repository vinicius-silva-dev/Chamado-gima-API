import { Injectable } from '@nestjs/common';
import { ChamadoRepository } from '../../repository/chamado-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { Either, left, right } from 'src/core/either';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface ListChamadosByUserRequest {
  userId: string;
}

type ListChamadosByUserResponse = Either<ResouceNotFoundError, {
  chamados: Chamado[]
}>;

@Injectable()
export class ListChamadosByUserUseCase {
  constructor(private chamadoRepository: ChamadoRepository) {}

  async excecute({
    userId,

  }: ListChamadosByUserRequest): Promise<ListChamadosByUserResponse> {
    const chamados = await this.chamadoRepository.findByUserId(userId)

    if(!chamados){
      return left(new ResouceNotFoundError())
    }

    return right({
      chamados
    })
    
  }
}
