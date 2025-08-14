import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AtualizacaoChamadoAnexos } from "./atualizacao-chamado-anexos";



export interface AtualizacaoChamadoProps {
  chamadoId: UniqueEntityId
  userId: UniqueEntityId
  descricao: string
  anexos: AtualizacaoChamadoAnexos[]
}

export class AtualizacaoChamado extends Entity<AtualizacaoChamadoProps> {
  get chamadoId() {
    return this.chamadoId
  }

  get userId() {
    return this.userId
  }
  
  get descricao(){
    return this.props.descricao
  }
  get anexos(){
    return this.props.anexos
  }

  set anexos(anexos: AtualizacaoChamadoAnexos[]) {
    this.props.anexos = anexos;
  }
  
  static create(atualizacaochamado: AtualizacaoChamadoProps, id?: UniqueEntityId) {
    const anexo = new AtualizacaoChamado(atualizacaochamado, id)
    return anexo
  }
}