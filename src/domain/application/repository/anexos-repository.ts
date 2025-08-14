import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import {Anexos} from '../../enteprise/entities/anexos'

export abstract class AnexosRepository {
  abstract findById(id: string): Promise<Anexos | null>
  abstract findByChamadoId(chamadoId: string): Promise<Anexos[] | null>
  abstract findByAtualizacao(atualizacao: string): Promise<Anexos[] | null>
  abstract save(anexos: Anexos): Promise<void>
  abstract create(anexos: Anexos): Promise<void>
  abstract delete(anexos: Anexos): Promise<void>
}