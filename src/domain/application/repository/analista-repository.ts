import {Analista} from '../../enteprise/entities/analistas'

export abstract class AnalistaRepository {
  abstract findById(id: string): Promise<Analista | null>
  abstract findByEmail(email: string): Promise<Analista | null>
  abstract findByCategoria(categoria: string): Promise<Analista | null>
  abstract save(analista: Analista): Promise<void>
  abstract create(analista: Analista): Promise<void>
  abstract delete(analista: Analista): Promise<void>
}