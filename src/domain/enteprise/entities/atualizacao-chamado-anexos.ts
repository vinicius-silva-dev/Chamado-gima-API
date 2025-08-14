import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

interface AtualizacaoChamadoAnexosProps {
  atualizacaoChamadoId: UniqueEntityId
  anexosId: UniqueEntityId
}

export class AtualizacaoChamadoAnexos extends Entity<AtualizacaoChamadoAnexosProps> {
  get atualizacaoChamadoId() {
    return this.props.atualizacaoChamadoId
  }
  get anexosId() {
    return this.props.anexosId
  }

  static create(props: AtualizacaoChamadoAnexosProps, id?: UniqueEntityId) {
    const anexos = new AtualizacaoChamadoAnexos(props, id)

    return anexos
  }
}