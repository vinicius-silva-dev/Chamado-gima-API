import { Injectable } from '@nestjs/common'
import { ChamadoRepository } from '../../repository/chamado-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Chamado } from 'src/domain/enteprise/entities/chamado'
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status'
import { AnalistaRepository } from '../../repository/analista-repository'
import { Either, left, right } from 'src/core/either'
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { NotAllowedError } from 'src/core/errors/errors/not-allowerd-error'
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface AtenderChamadoRequest {
  id: UniqueEntityId
  analistaId: string
  status: string
}

type AtenderChamadoResponse = Either<ResouceNotFoundError | NotAllowedError, {}>

@Injectable()
export class AtenderChamadoUseCase {
  constructor(
    private chamadoRepository: ChamadoRepository,
    private analistaRepository: AnalistaRepository
  ) {}

  async excecute({
    id,
    analistaId,
    status,
  }: AtenderChamadoRequest): Promise<AtenderChamadoResponse> {
    
    const chamado = await this.chamadoRepository.findById(id.toString())
  
    if (!chamado) {
      return left(new ResouceNotFoundError())
    }

    const isAnalista = await this.analistaRepository.findById(analistaId)
    
    if (isAnalista === null) {
      return left(new NotAllowedError())
    }

    chamado.analistaId = analistaId
    chamado.status = new StatusValueObject(status)

    await this.chamadoRepository.save(chamado)

    return right(chamado)
  }
}
