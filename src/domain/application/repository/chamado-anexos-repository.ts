import { ChamadoAnexos } from 'src/domain/enteprise/entities/chamado-anexos';
import {Chamado} from '../../enteprise/entities/chamado'

export abstract class ChamadoAnexosRepository {
  abstract createMany(anexos: ChamadoAnexos[]): Promise<void>

  abstract deleteMany(anexos: ChamadoAnexos[]): Promise<void>

  abstract findManyChamadoId(chamadoId: string): Promise<Chamado[] | null>

  abstract deleteManyByChamadoId(chamadoId: string): Promise<void>
}