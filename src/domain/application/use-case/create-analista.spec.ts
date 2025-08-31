import { InMemoryAnalista } from 'test/repository/in-memory-analista'
import {beforeEach, describe, test, expect} from 'vitest'
import { CreateAnalistaUseCase } from './create-analista'

let inMemoryAnalista: InMemoryAnalista // essa variavel representa o "banco de dados"
let sut: CreateAnalistaUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Create analista', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryAnalista = new InMemoryAnalista()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new CreateAnalistaUseCase(inMemoryAnalista)
  })

  test('should be abble to create a analista', async () => {
    await sut.execute({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
    })

    // Aqui eu estou utilizando o método toHaveLength para ver se dentro do array items, que esta vazio, tem um dado. Tendo esse dado, significa que o usuário foi criado.
    // console.log(inMemoryAnalista.items)
    expect(inMemoryAnalista.items).toHaveLength(1)
  })
})