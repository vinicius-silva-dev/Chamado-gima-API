import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

interface ChamadoAnexosProps {
  chamadoId: UniqueEntityId
  anexosId: UniqueEntityId
}

export class ChamadoAnexos extends Entity<ChamadoAnexosProps> {
  get chamadoId() {
    return this.props.chamadoId
  }
  get anexosId() {
    return this.props.anexosId
  }

  static create(props: ChamadoAnexosProps, id?: UniqueEntityId) {
    const anexos = new ChamadoAnexos(props, id)

    return anexos
  }
}