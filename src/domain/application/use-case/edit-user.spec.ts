import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, test, expect} from 'vitest'
import { EditUserUseCase } from './edit-user'
import { compare } from 'bcrypt'
import { User } from 'src/domain/enteprise/entities/user'
import { InMemoryAnalista } from 'test/repository/in-memory-analista'
import { Analista } from 'src/domain/enteprise/entities/analistas'


let inMemoryUser: InMemoryUser // essa variavel representa o "banco de dados"
let inMemoryAnalista: InMemoryAnalista
let sut: EditUserUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Edit user', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryUser = new InMemoryUser()
    inMemoryAnalista = new InMemoryAnalista()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new EditUserUseCase(inMemoryUser, inMemoryAnalista)
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

    const analista = Analista.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      categoria: 'Analista'
    })

    inMemoryAnalista.create(analista)

    const result = await sut.execute({
      analistaId: analista.id.toString(),
      email: 'vinicius100@live.com',
      cargo: 'Aux.TI',
      password: '1234567',
    })

    const isPassword = await compare('1234567', inMemoryUser.items[0].password)
    expect(isPassword).toEqual(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({
        cargo: 'Aux.TI'
      })
    })
  })
})