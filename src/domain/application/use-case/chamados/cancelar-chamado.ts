import { Injectable } from '@nestjs/common'
import { ChamadoRepository } from '../../repository/chamado-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Chamado } from 'src/domain/enteprise/entities/chamado'
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status'
import { Either, left, right } from 'src/core/either'
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found'
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface CancelarChamadoRequest {
  id: UniqueEntityId
  descricao: string
  status: string
}

type CancelarChamadoResponse = Either<ResouceNotFoundError, {
  chamado: Chamado
}> 

@Injectable()
export class CancelarChamadoUseCase {
  constructor(private chamadoRepository: ChamadoRepository) {}

  async excecute({
    id,
    descricao,
    status,
  }: CancelarChamadoRequest): Promise<CancelarChamadoResponse> {
    
    const chamado = await this.chamadoRepository.findById(id.toString())
  
    if (!chamado) {
      return left(new ResouceNotFoundError())
    }

    if(!descricao || descricao === '') {
      throw new Error('Precisa justificar o cancelamento do chamado.')
    }


    chamado.descricaoCancelamento = descricao
    chamado.status = new StatusValueObject(status)

    await this.chamadoRepository.save(chamado)

    return right({
      chamado,
    }) 
  }
}
