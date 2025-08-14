import { InMemoryUser } from "test/repository/in-memory-user";
import { beforeEach, describe, it, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { MakeUser } from "test/factory/make-user";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";

let inMemoryUser: InMemoryUser
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUseCase
describe('Authenticate users', async ()=> {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(inMemoryUser, fakeEncrypter)
  })

  it('shoud be able the user authenticate', async () => {
    const user = await MakeUser()

    inMemoryUser.create(user)

    const result = await sut.execute({
      email: 'osvaldo100@live.com',
      password: '123456'
    })

    
    expect(result.value).toEqual({
      token: expect.any(String)
    })
  })
})