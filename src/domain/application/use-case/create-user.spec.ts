import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, test, expect} from 'vitest'
import { CreateUserUseCase } from './create-user'

let inMemoryUser: InMemoryUser // essa variavel representa o "banco de dados"
let sut: CreateUserUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Create user', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryUser = new InMemoryUser()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new CreateUserUseCase(inMemoryUser)
  })

  test('should be abble to create a user', async () => {
    await sut.execute({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'aux.TI',
      loja: 'Gima FL Jaru'
    })

    // Aqui eu estou utilizando o método toHaveLength para ver se dentro do array items, que esta vazio, tem um dado. Tendo esse dado, significa que o usuário foi criado.
    // console.log(inMemoryUser.items)
    expect(inMemoryUser.items).toHaveLength(1)
  })
})