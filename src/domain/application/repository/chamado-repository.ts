import {Chamado} from '../../enteprise/entities/chamado'

export abstract class ChamadoRepository {
  abstract findById(id: string): Promise<Chamado | null>
  abstract findAll(): Promise<Chamado[] | null>
  abstract findByUserId(userId: string): Promise<Chamado[] | null>
  abstract findManyServedAnalistaId(analistaId: string): Promise<Chamado[] | null>
  abstract findByDate(date: string): Promise<Chamado | null>
  abstract save(chamado: Chamado): Promise<Chamado | null>
  abstract create(chamado: Chamado): Promise<void>
  abstract delete(chamado: Chamado): Promise<void>
}