import { Injectable } from '@nestjs/common';
import { ChamadoRepository } from '../../repository/chamado-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { Either, left, right } from 'src/core/either';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
import { NotAllowedError } from 'src/core/errors/errors/not-allowerd-error';
import { AnalistaRepository } from '../../repository/analista-repository';
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface ListAllChamadosRequest {
  analistaId: string;
}

type ListAllChamadosResponse = Either<ResouceNotFoundError, {
  chamados: Chamado[]
}>;

@Injectable()
export class ListAllChamadosUseCase {
  constructor(
    private chamadoRepository: ChamadoRepository,
    private analistaRepository: AnalistaRepository
  ) {}

  async excecute({
    analistaId,

  }: ListAllChamadosRequest): Promise<ListAllChamadosResponse> {
  
    const isAnalista = await this.analistaRepository.findById(analistaId)
        
    if (isAnalista === null) {
      return left(new NotAllowedError())
    }
    const chamados = await this.chamadoRepository.findAll()

    if(!chamados){
      return left(new ResouceNotFoundError())
    }

    return right({
      chamados
    })
    
  }
}
