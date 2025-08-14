import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, test, expect} from 'vitest'
import { EditUserUseCase } from './edit-user'
import { MakeUser } from 'test/factory/make-user'
import { compare, hash } from 'bcrypt'
import { User } from 'src/domain/enteprise/entities/user'

let inMemoryUser: InMemoryUser // essa variavel representa o "banco de dados"
let sut: EditUserUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Create user', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryUser = new InMemoryUser()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new EditUserUseCase(inMemoryUser)
  })

  test('should be abble to create a user', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'aux.TI',
      categoria: 'Usuário Padrão',
      loja: 'Gima FL Jaru'
    })

    inMemoryUser.create(user)

    await sut.execute({
      email: 'vinicius100@live.com',
      password: '1234567',
    })

    
    
    const isPassword = await compare('1234567', inMemoryUser.items[0].password)
    expect(isPassword).toEqual(true)
  })
})