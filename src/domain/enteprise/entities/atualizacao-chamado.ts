import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AtualizacaoChamadoAnexos } from "./atualizacao-chamado-anexos";
import { AtualizacaoAnexosList } from "./atualizacao-anexos-list";
import { Optional } from "src/core/types/optional";



export interface AtualizacaoChamadoProps {
  chamadoId: string
  userId?: string
  analistaId?: string
  descricao: string
  anexos: AtualizacaoAnexosList
}

export class AtualizacaoChamado extends Entity<AtualizacaoChamadoProps> {
  
  get chamadoId() {
    return this.props.chamadoId
  }

  get userId() {
    return this.props.userId ?? ''
  }

  get analistaId() {
    return this.props.analistaId ?? ''
  }
  
  get descricao(){
    return this.props.descricao
  }

  get anexos(){
    return this.props.anexos
  }

  set anexos(anexos: AtualizacaoAnexosList) {
    this.props.anexos = anexos;
  }

  set userId(userId: string) {
    this.props.userId = userId
  }

  set analistaId(analistaId: string) {
    this.props.analistaId = analistaId
  }
  
  static create(props: Optional<
    AtualizacaoChamadoProps,
      'anexos' 
    >, id?: UniqueEntityId) {
    const atualizacao = new AtualizacaoChamado(
      {
        ...props,
        anexos: props.anexos ?? new AtualizacaoAnexosList(),
      },
       id)
    return atualizacao
  }
}