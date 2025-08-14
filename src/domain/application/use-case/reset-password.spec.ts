import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, test, expect} from 'vitest'
import { ResetPasswordUseCase } from './reset-password'
import { MakeUser } from 'test/factory/make-user'
import { compare, hash } from 'bcrypt'
import { User } from 'src/domain/enteprise/entities/user'
import { InMemoryTokenReset } from 'test/repository/in-memory-token-reset'
import { TokenResetPassword } from 'src/domain/enteprise/entities/token-reset-password'

let inMemoryUser: InMemoryUser // essa variavel representa o "banco de dados"
let inMemoryTokenReset: InMemoryTokenReset // essa variavel representa o "banco de dados"
let sut: ResetPasswordUseCase // aqui é o caso de uso, onde vamos passar os dados para que o usuário seja criado.
describe('Create user', async () => {
  beforeEach(() => {
    // As variveis acima precisam receber as instancias das classe na qual elas estão tipadas.
    inMemoryUser = new InMemoryUser()
    inMemoryTokenReset = new InMemoryTokenReset()
    
    // Aqui, além de instanciar o caso de uso, estamos passado o repositóro que o caso de uso vai precisar para salvar os dados criados.
    sut = new ResetPasswordUseCase(inMemoryUser, inMemoryTokenReset)
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

    const token = TokenResetPassword.create({
      token: '12345',
      userId: user.id.toString()
    })

    inMemoryTokenReset.create(token)

    await sut.execute({
      email: 'vinicius100@live.com',
      password: '1234567',
      token: '12345'
    })

    
    
    const isPassword = await compare('1234567', inMemoryUser.items[0].password)
    expect(isPassword).toEqual(true)
  })
})