import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AnexosRepository } from "src/domain/application/repository/anexos-repository";
import { Anexos } from "src/domain/enteprise/entities/anexos";

export class InMemoryAnexos implements AnexosRepository {

  public items: Anexos[] = []

  async findById(id: string): Promise<Anexos | null> {

    const anexos = await this.items.find(item => item.id.toString() === id)
  
    if(!anexos) {
      throw new Error('Anexos Not found!!!')
    }
    return anexos
  }

  async findByChamadoId(chamadoId: string): Promise<Anexos[] | null> {
    const anexos = await this.items.filter(item => item.id.toString() === chamadoId)
  
    if(!anexos) {
      throw new Error('Anexos Not found!!!')
    }
    return anexos
  }
  
  async findByAtualizacao(atualizacao: string): Promise<Anexos[] | null> {
    const anexos = await this.items.filter(item => item.id.toString() === atualizacao)
  
    if(!anexos) {
      throw new Error('Anexos Not found!!!')
    }
    return anexos
  }

  async save(anexos: Anexos): Promise<void> {
    const anexosIndex = await this.items.findIndex(
      (index) => index.id === anexos.id,
    )

    this.items[anexosIndex] = anexos
  }

  async create(anexos: Anexos): Promise<void> {
    await this.items.push(anexos)
  }

  delete(anexos: Anexos): Promise<void> {
    throw new Error("Method not implemented.");
  }
  


}