import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { AtualizacaoChamadoRepository } from 'src/domain/application/repository/atualizacao-chamado';
import { AtualizacaoChamado } from 'src/domain/enteprise/entities/atualizacao-chamado';
import { Chamado } from 'src/domain/enteprise/entities/chamado';

export class InMemoryAtualizacaoChamado
  implements AtualizacaoChamadoRepository
{
  public items: AtualizacaoChamado[] = [];

  async findById(id: string): Promise<AtualizacaoChamado | null> {
    const atualizacao = await this.items.find(
      (item) => item.id.toString() === id,
    );

    if (!atualizacao) {
      throw new Error('Atualizaçao Not found!!!');
    }
    return atualizacao;
  }

  async findByDate(date: string): Promise<AtualizacaoChamado | null> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(
    userId: UniqueEntityId,
  ): Promise<AtualizacaoChamado[] | null> {
    const atualizacao = await this.items.filter(
      (item) => item.userId === userId,
    );

    if (!atualizacao) {
      throw new Error('Chamado Not found!');
    }

    return atualizacao;
  }

  // async save(chamado: Chamado): Promise<void> {
  //   const chamadoIndex = await this.items.findIndex(
  //     (index) => index.id === chamado.id,
  //   )

  //   this.items[chamadoIndex] = chamado
  // }

  async create(atualizacao: AtualizacaoChamado): Promise<void> {
    await this.items.push(atualizacao);
  }

  delete(atualizacao: AtualizacaoChamado): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
