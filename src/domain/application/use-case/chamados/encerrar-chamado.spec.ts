import { InMemoryChamado } from 'test/repository/in-memory-chamado';
import { describe, test, expect, beforeEach } from 'vitest';
import { EncerrarChamadoUseCase } from './encerrar-chamado';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { InMemoryAnexos } from 'test/repository/in-memory-anexos';
import { InMemoryChamadoAnexos } from 'test/repository/in-memory-chamado-anexos';
import { InMemoryUser } from 'test/repository/in-memory-user';
import { User } from 'src/domain/enteprise/entities/user';
import { InMemoryAnalista } from 'test/repository/in-memory-analista';
import { Analista } from 'src/domain/enteprise/entities/analistas';
import { NotAllowedError } from 'src/core/errors/errors/not-allowerd-error';


let inMemoryChamado: InMemoryChamado
let inMemoryChamadoAnexos: InMemoryChamadoAnexos
let inMemoryAnexos: InMemoryAnexos
let inMemoryAnalista: InMemoryAnalista
let inMemoryUser: InMemoryUser
let sut: EncerrarChamadoUseCase
describe('Encerrar chamado', async () => {
  beforeEach(() => {
    inMemoryChamadoAnexos = new InMemoryChamadoAnexos()
    inMemoryAnexos = new InMemoryAnexos()
    inMemoryChamado = new InMemoryChamado(inMemoryChamadoAnexos, inMemoryAnexos);
    inMemoryAnalista = new InMemoryAnalista()
    inMemoryUser = new InMemoryUser()
    sut = new EncerrarChamadoUseCase(inMemoryChamado, inMemoryAnalista)
  });

  test('should be abble close a chamado.', async () => {
    const user = await Analista.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      categoria: 'Analista'
    })

    await inMemoryAnalista.create(user)

    const chamado = await Chamado.create({
      userId: user.id.toString(),
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      atualizacaoChamado: [],
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: '69992115445',
    }, new UniqueEntityId('chamado-1'))

    await inMemoryChamado.create(chamado)
    
    
    await sut.excecute({
      chamadoId: 'chamado-1',
      userId: user.id.toString(),
      descricaoEncerramento: 'Esse chamado foi resolvido por meio de testes automatizados',
      status: 'Encerrado'
    })

    expect(inMemoryChamado.items[0]).toMatchObject({
      status: new StatusValueObject('Encerrado') 
    })
  });

  test('not should be abble a user close a chamado.', async () => {
    const user = await User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'aux.TI',
      categoria: 'Usuário Padrão',
      loja: 'Gima FL Jaru'
    })

    await inMemoryUser.create(user)

    const chamado = await Chamado.create({
      userId: user.id.toString(),
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      atualizacaoChamado: [],
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: '69992115445',
    }, new UniqueEntityId('chamado-1'))

    await inMemoryChamado.create(chamado)
    
    
    const result = await sut.excecute({
      chamadoId: 'chamado-1',
      userId: user.id.toString(),
      descricaoEncerramento: 'Esse chamado foi resolvido por meio de testes automatizados',
      status: 'Encerrado'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

});
