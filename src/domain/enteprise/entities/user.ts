import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface UserProps {
  name: string
  email: string
  password: string
  cargo: string
  categoria: string
  loja: string
  createdAt?: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get cargo() {
    return this.props.cargo
  }

  get categoria() {
    return this.props.categoria
  }

  get loja() {
    return this.props.loja
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

  set cargo(cargo: string) {
    this.props.cargo = cargo

    this.touch()
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id)
    return user
  }
}