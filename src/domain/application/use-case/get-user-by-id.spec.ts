import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, test, expect} from 'vitest'
import { EditUserUseCase } from './edit-user'
import { MakeUser } from 'test/factory/make-user'
import { compare, hash } from 'bcrypt'
import { User } from 'src/domain/enteprise/entities/user'
import { GetUserByIdUseCase } from './get-user-by-id'
import { object } from 'zod'

let inMemoryUser: InMemoryUser // essa variavel representa o "banco de dados"
let sut: GetUserByIdUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Get user by id', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryUser = new InMemoryUser()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new GetUserByIdUseCase(inMemoryUser)
  })

  test('should be abble to edit a user', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'aux.TI',
      categoria: 'Usuário Padrão',
      loja: 'Gima FL Jaru'
    })

    inMemoryUser.create(user)

    const result = await sut.execute({
      id: user.id.toString()
    })

    expect(result.value).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          name: 'Vinicius Silva',
          email: 'vinicius100@live.com'
        })
      })
      
    )
  })
})