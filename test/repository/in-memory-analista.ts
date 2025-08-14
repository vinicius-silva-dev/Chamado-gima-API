import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AnalistaRepository } from "src/domain/application/repository/analista-repository";
import { Analista } from "src/domain/enteprise/entities/analistas";

export class InMemoryAnalista implements AnalistaRepository{

  public items: Analista[] = [] // aqui ficará os dados salvos em memória

  async findById(id: string): Promise<Analista | null> {
    const analista = await this.items.find(item => item.id.toString() === id)

    if(!analista) {
      return null
    }
    return analista
  }

  async findByEmail(email: string): Promise<Analista | null> {
    const analista = await this.items.find(item => item.email === email)

    if(!analista) {
      throw new Error('Analista not found!')
    }
    return analista
  }

  async findByCategoria(categoria: string): Promise<Analista | null> {
    const analista = await this.items.find(item => item.categoria === categoria)

    if(!analista) {
      throw new Error('Analista not found!')
    }
    return analista
  }

  async save(analista: Analista): Promise<void> {
    const analistaIndex = await this.items.findIndex(
      (index) => index.id === analista.id,
    )

    this.items[analistaIndex] = analista
  }

  async create(analista: Analista): Promise<void> {
    this.items.push(analista)
  }

  async delete(analista: Analista): Promise<void> {
    const analistaIndex = await this.items.findIndex(index => index.id === analista.id)

    if (!analistaIndex) {
      throw new Error('Not found')
    }

    this.items.splice(analistaIndex, 1)
  }
}