import { ChamadoRepository } from "src/domain/application/repository/chamado-repository";
import { Chamado } from "src/domain/enteprise/entities/chamado";
import { InMemoryChamadoAnexos } from "./in-memory-chamado-anexos";
import { InMemoryAnexos } from "./in-memory-anexos";

export class InMemoryChamado implements ChamadoRepository {
  public items: Chamado[] = []

  constructor(
    private chamadoAnexosRepository: InMemoryChamadoAnexos,
    private anexosRepository: InMemoryAnexos
  ) {}

  async findById(id: string): Promise<Chamado | null> {
  // O comentário abaixo é a explicação do pq o método não conseguia encontrar o chamado
  // Mesmo que item.id.toString() === chamadoId.toString(), essa comparação item.id === chamadoId é falsa, porque são instâncias diferentes de objetos, mesmo que o value interno seja igual.

    const chamado = await this.items.find(item => item.id.toString() === id)
  
    if(!chamado) {
      throw new Error('Chamado Not found!!!')
    }
    return chamado
  }

  async findAll(): Promise<Chamado[] | null> {
  
    return this.items
  }

  async findByDate(date: string): Promise<Chamado | null> {
    throw new Error("Method not implemented.");
  }

  async findByUserId(userId: string): Promise<Chamado[] | null> {
  
    const chamados = await this.items.filter(item => item.userId.toString() === userId)
    
    if(!chamados) {
      throw new Error('Chamado Not found!')
    }

    return chamados
  }

  async findManyServedAnalistaId(analistaId: string): Promise<Chamado[] | null> {
    const chamados = await this.items.filter(item => item.analistaId.toString() === analistaId)
    
    
    if(!chamados) {
      throw new Error('Chamados Not found!')
    }

    return chamados
  }

  async save(chamado: Chamado): Promise<void> {
    const chamadoIndex = await this.items.findIndex(
      (index) => index.id === chamado.id,
    )

    this.items[chamadoIndex] = chamado

    await this.chamadoAnexosRepository.createMany(
      chamado.anexos.getNewItems(),
    )

    await this.chamadoAnexosRepository.deleteMany(
      chamado.anexos.getRemovedItems(),
    )
  }

  async create(chamado: Chamado): Promise<void> {
    await this.items.push(chamado)

    await this.chamadoAnexosRepository.createMany(chamado.anexos.getItems())

  }

  delete(chamado: Chamado): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}