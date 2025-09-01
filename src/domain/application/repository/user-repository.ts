import {User} from '../../enteprise/entities/user'

export abstract class UserRepository {
  abstract findMany(): Promise<User[] | null>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByCargo(cargo: string): Promise<User | null>
  abstract save(user: User): Promise<void>
  abstract create(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}