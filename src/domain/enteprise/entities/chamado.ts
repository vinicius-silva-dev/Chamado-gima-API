import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/optional';
import { StatusValueObject } from './value-object/status';
import { ChamadoAtualizacao } from './chamado-atualizacao';
import { ChamadosAnexosList } from './chamados-anexos-list';

export interface chamadoProps {
  userId: string;
  analistaId: string;
  loja: string;
  prioridade: string;
  tipo_chamado: string;
  status: StatusValueObject;
  title: string;
  descricao: string;
  descricaoEncerramento: string,
  descricaoCancelamento: string
  anexos: ChamadosAnexosList;
  atualizacaoChamado: ChamadoAtualizacao[];
  telefone: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Chamado extends Entity<chamadoProps> {
  get userId() {
    return this.props.userId;
  }
  get analistaId() {
    return this.props.analistaId;
  }

  get loja() {
    return this.props.loja;
  }

  get prioridade() {
    return this.props.prioridade;
  }

  get status() {
    return this.props.status;
  }

  get tipoChamado() {
    return this.props.tipo_chamado;
  }

  get title() {
    return this.props.title;
  }

  get descricao() {
    return this.props.descricao;
  }
  get descricaoEncerramento() {
    return this.props.descricaoEncerramento;
  }
  get descricaoCancelamento() {
    return this.props.descricaoCancelamento;
  }

  get anexos() {
    return this.props.anexos;
  }

  get atualizacaoChamado() {
    return this.props.atualizacaoChamado;
  }

  get telefone() {
    return this.props.telefone;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set status(status: StatusValueObject) {
    this.props.status = status;

    this.touch();
  }

  set analistaId(analistaId: string) {
    this.props.analistaId = analistaId;

    this.touch();
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao;

    this.touch();
  }

  set descricaoEncerramento(descricaoEncerramento: string) {
    this.props.descricaoEncerramento = descricaoEncerramento;

    this.touch();
  }

  set descricaoCancelamento(descricaoCancelamento: string) {
    this.props.descricaoCancelamento = descricaoCancelamento;

    this.touch();
  }

  set anexos(anexos: ChamadosAnexosList) {
    this.props.anexos = anexos;

    this.touch();
  }

  set atualizacaoChamado(atualizacao: ChamadoAtualizacao[]) {
    this.props.atualizacaoChamado = atualizacao;

    this.touch();
  }

  static create(
    props: Optional<
      chamadoProps,
      'createdAt' | 'anexos' | 'atualizacaoChamado' | 'descricaoEncerramento' | 'descricaoCancelamento' | 'analistaId'
    >,
    id?: UniqueEntityId,
  ) {
    const chamado = new Chamado(
      {
        ...props,
        anexos: props.anexos ?? new ChamadosAnexosList(),
        analistaId: props.analistaId ?? '',
        atualizacaoChamado: props.atualizacaoChamado ?? [],
        descricaoEncerramento: props.descricaoEncerramento ?? '',
        descricaoCancelamento: props.descricaoCancelamento ?? '',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return chamado;
  }
}
