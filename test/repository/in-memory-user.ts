import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { UserRepository } from "src/domain/application/repository/user-repository";
import { User } from "src/domain/enteprise/entities/user";

export class InMemoryUser implements UserRepository{

  public items: User[] = [] // aqui ficará os dados salvos em memória

  async findById(id: string): Promise<User | null> {
    const user = await this.items.find(item => item.id.toString() === id)

    if(!user) {
      throw new Error('User not found!')
    }
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.items.find(item => item.email === email)

    if(!user) {
      throw new Error('User not found!')
    }
    return user
  }

  async findByCargo(cargo: string): Promise<User | null> {
    const user = await this.items.find(item => item.cargo === cargo)

    if(!user) {
      throw new Error('User not found!')
    }
    return user
  }

  async save(user: User): Promise<void> {
    const userIndex = await this.items.findIndex(
      (index) => index.id === user.id,
    )

    this.items[userIndex] = user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async delete(id: string): Promise<void> {
    console.log('inMemory: ',id)
    const userIndex = await this.items.findIndex(index => index.id === new UniqueEntityId(id))

    if (!userIndex) {
      throw new Error('Not found')
    }

    this.items.splice(userIndex, 1)
  }
}