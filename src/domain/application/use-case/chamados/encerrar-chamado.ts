import { Injectable } from '@nestjs/common'
import { ChamadoRepository } from '../../repository/chamado-repository'
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status'
import { Either, left, right } from 'src/core/either'
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { NotAllowedError } from 'src/core/errors/errors/not-allowerd-error'
import { UserRepository } from '../../repository/user-repository'
import { AnalistaRepository } from '../../repository/analista-repository'
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface EncerrarChamadoRequest {
  chamadoId: string,
  analistaId: string
  descricaoEncerramento: string
  status: string
}

type EncerrarChamadoResponse = Either<ResouceNotFoundError | NotAllowedError, {}>

@Injectable()
export class EncerrarChamadoUseCase {
  constructor(
    private chamadoRepository: ChamadoRepository,
    private analistaRepository: AnalistaRepository
  ) {}

  async excecute({
    chamadoId,
    analistaId,
    descricaoEncerramento,
    status,
  }: EncerrarChamadoRequest): Promise<EncerrarChamadoResponse> {
    
    const chamado = await this.chamadoRepository.findById(chamadoId)
  
    if (!chamado) {
      return left(new ResouceNotFoundError())
    }

    const isAnalista = await this.analistaRepository.findById(analistaId)
    
    if (isAnalista === null) {
      return left(new NotAllowedError())
    }

    if (descricaoEncerramento.length < 20) {
      return left(new NotAllowedError())
    }

    chamado.descricaoEncerramento = descricaoEncerramento
    chamado.status = new StatusValueObject(status)

    await this.chamadoRepository.save(chamado)

    return right(chamado)
  }
}
