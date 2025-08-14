import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { AtualizacaoChamado } from 'src/domain/enteprise/entities/atualizacao-chamado';
import { AtualizacaoChamadoRepository } from '../../repository/atualizacao-chamado';
import { AtualizacaoChamadoAnexos } from 'src/domain/enteprise/entities/atualizacao-chamado-anexos';
import { Either, right } from 'src/core/either';
// import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';

interface AtualizacaoChamadoRequest {
  chamadoId: string;
  userId: string;
  descricao: string;
  anexosIds: string[];
}

type AtualizacaoChamadoResponse = Either<null, {
  atualizacao: AtualizacaoChamado;
}> 

@Injectable()
export class AtualizacaoChamadoUseCase {
  constructor(
    private atualizacaoChamadoRepository: AtualizacaoChamadoRepository,
    // private userRepository: UserRepository,
    // private analistaRepository: AnalistaRepository,
  ) {}

  async excecute({
    chamadoId,
    userId,
    descricao,
    anexosIds,
  }: AtualizacaoChamadoRequest): Promise<AtualizacaoChamadoResponse> {

    if(descricao.length < 25) {
      throw new Error('A descrição precisa ter pelo menos 50 caracteres.')
    }

    const atualizacao = await AtualizacaoChamado.create({
      chamadoId: new UniqueEntityId(chamadoId),
      userId: new UniqueEntityId(userId),
      descricao,
      anexos: [],
    });

    const atualizacaoChamadoAnexos =
      anexosIds &&
      anexosIds.map((anexoId) => {
        return AtualizacaoChamadoAnexos.create({
          anexosId: new UniqueEntityId(anexoId),
          atualizacaoChamadoId: atualizacao.id,
        });
      });

    atualizacao.anexos = atualizacaoChamadoAnexos;

    await this.atualizacaoChamadoRepository.create(atualizacao);

    return right({
      atualizacao,
    }) ;
  }
}
