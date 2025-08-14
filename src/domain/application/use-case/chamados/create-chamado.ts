import { Injectable } from '@nestjs/common';
import { ChamadoRepository } from '../../repository/chamado-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { ChamadoAtualizacao } from 'src/domain/enteprise/entities/chamado-atualizacao';
import { ChamadosAnexosList } from 'src/domain/enteprise/entities/chamados-anexos-list';
import { Either, right } from 'src/core/either';
import { AnalistaRepository } from '../../repository/analista-repository';

interface CreateChamadoRequest {
  userId: string;
  loja: string;
  prioridade: string;
  tipo_chamado: string;
  status: StatusValueObject;
  title: string;
  descricao: string;
  anexosIds: string[];
  telefone: string;
  createdAt?: Date;
}

type CreateChamadoResponse = Either<null, {
  chamado: Chamado;
}> 

@Injectable()
export class CreateChamadoUseCase {
  constructor(
    private chamadoRepository: ChamadoRepository,
  ) {}

  async excecute({
    userId,
    loja,
    prioridade,
    tipo_chamado,
    status,
    title,
    descricao,
    anexosIds,
    telefone,
  }: CreateChamadoRequest): Promise<CreateChamadoResponse> {

    const chamado = await Chamado.create({
      userId,
      loja,
      prioridade,
      tipo_chamado,
      status,
      title,
      descricao,
      telefone,
      createdAt: new Date(),
    });

    if (anexosIds.length > 0) {
      const chamadoAnexos = anexosIds.map((anexoId) => {
        return ChamadoAnexos.create({
          anexosId: new UniqueEntityId(anexoId),
          chamadoId: chamado.id,
        });
      });
  
      chamado.anexos = new ChamadosAnexosList(chamadoAnexos) ;
    }

    // const atualizacaoChamado = atualizacaoIds.map((atualizacaoId) => {
    //   return ChamadoAtualizacao.create({
    //     chamadoId: chamado.id.toString(),
    //     atualizacaoId: new UniqueEntityId(atualizacaoId)
    //   });
    // });

    // chamado.atualizacaoChamado = atualizacaoChamado;

    // const isAnalista = await this.analistaRepository.findById(userId.toString())

    // if(isAnalista !== null) {
    //   chamado.analistaId = isAnalista.id
    // }
   
    await this.chamadoRepository.create(chamado);

    return right(
      { chamado }
    );
  }
}
