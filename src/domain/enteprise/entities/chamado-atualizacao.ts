import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

interface ChamadoAtualizacaoProps {
  chamadoId: UniqueEntityId
  atualizacaoId: UniqueEntityId
}

export class ChamadoAtualizacao extends Entity<ChamadoAtualizacaoProps> {
  get chamadoId() {
    return this.props.chamadoId
  }
  get atualizacaoId() {
    return this.props.atualizacaoId
  }

  static create(props: ChamadoAtualizacaoProps, id?: UniqueEntityId) {
    const atualizacao = new ChamadoAtualizacao(props, id)

    return atualizacao
  }
}