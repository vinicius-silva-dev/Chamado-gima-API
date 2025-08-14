import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface AnalistaProps {
  name: string
  email: string
  password: string
  categoria: string
  createdAt?: Date
  updatedAt?: Date | null
}

export class Analista extends Entity<AnalistaProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get categoria() {
    return this.props.categoria
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set password(password: string) {
    this.props.password = password

    this.touch()
  }

  set categoria(categoria: string) {
    this.props.categoria = categoria

    this.touch()
  }

  static create(props: AnalistaProps, id?: UniqueEntityId) {
    const analista = new Analista(props, id)
    return analista
  }
}