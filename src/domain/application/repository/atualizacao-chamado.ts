import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { AtualizacaoChamado } from '../../enteprise/entities/atualizacao-chamado';

export abstract class AtualizacaoChamadoRepository {
  abstract findById(id: string): Promise<AtualizacaoChamado | null>;
  abstract findByUserId(
    userId: UniqueEntityId,
  ): Promise<AtualizacaoChamado[] | null>;
  abstract findByDate(date: string): Promise<AtualizacaoChamado | null>;
  // abstract save(atualizacao: AtualizacaoChamado): Promise<void>
  abstract create(atualizacao: AtualizacaoChamado): Promise<void>;
  abstract delete(atualizacao: AtualizacaoChamado): Promise<void>;
}
