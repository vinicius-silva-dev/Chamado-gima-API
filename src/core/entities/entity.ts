import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<Props> {
  private _id: UniqueEntityId

  // essa pripriedade representa todos os campos da entridade, por exemplo, as interfaces das entidades.
  protected props: Props 

  get id() {
    return this._id
  }

  // Quando as entidades extendem essa class Entity, elas ja aproveitam esse construtor.
  constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}