import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface AnexosProps {
  title: string
  url: string
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Anexos extends Entity<AnexosProps> {
  get title(){
    return this.props.title
  }
  get url(){
    return this.props.url
  }
  
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(anexos: AnexosProps, id?: UniqueEntityId) {
    const anexo = new Anexos(anexos, id)
    return anexo
  }
}