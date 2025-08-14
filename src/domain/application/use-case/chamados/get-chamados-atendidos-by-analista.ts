import { Injectable } from '@nestjs/common';
import { ChamadoRepository } from '../../repository/chamado-repository';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Either, left, right } from 'src/core/either';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface GetChamadosAtendidoByAnalistaRequest {
  analistaId: string;
}

type GetChamadosAtendidoByAnalistaResponse = Either<ResouceNotFoundError, {
  chamados: Chamado[];
}> ;

@Injectable()
export class GetChamadosAtendidoByAnalistaUseCase {
  constructor(private chamadoRepository: ChamadoRepository) {}

  async excecute({
    analistaId
  }: GetChamadosAtendidoByAnalistaRequest): Promise<GetChamadosAtendidoByAnalistaResponse> {
    const chamados = await this.chamadoRepository.findManyServedAnalistaId(analistaId)

    if(!chamados){
      return left(new ResouceNotFoundError())
    }

    return right({
      chamados
    }) 
    
  }
}
