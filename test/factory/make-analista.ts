import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Analista, AnalistaProps } from "src/domain/enteprise/entities/analistas";

export async function MakeAnalista(overside: Partial<AnalistaProps> = {}, id?: UniqueEntityId) {
  const analista = await Analista.create({
    name: 'Vinicius Silva',
    email: 'vinicius100@live.com',
    password: '123456',
    categoria: 'Analista',
    createdAt: new Date()
  })

  return analista
}