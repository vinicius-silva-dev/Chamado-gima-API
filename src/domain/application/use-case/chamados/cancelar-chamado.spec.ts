import { InMemoryChamado } from 'test/repository/in-memory-chamado';
import { describe, test, expect, beforeEach } from 'vitest';
import { CancelarChamadoUseCase } from './cancelar-chamado';
import { User } from 'src/domain/enteprise/entities/user';
import { Analista } from 'src/domain/enteprise/entities/analistas';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { InMemoryAnexos } from 'test/repository/in-memory-anexos';
import { InMemoryChamadoAnexos } from 'test/repository/in-memory-chamado-anexos';

let inMemoryChamado: InMemoryChamado
let inMemoryChamadoAnexos: InMemoryChamadoAnexos
let inMemoryAnexos: InMemoryAnexos
let sut: CancelarChamadoUseCase
describe('Cancelar chamado', async () => {
  beforeEach(() => {
    inMemoryChamadoAnexos = new InMemoryChamadoAnexos()
    inMemoryAnexos = new InMemoryAnexos()
    inMemoryChamado = new InMemoryChamado(inMemoryChamadoAnexos, inMemoryAnexos);
    sut = new CancelarChamadoUseCase(inMemoryChamado)
  });

  test('should be abble answer a chamado.', async () => {
    const user = await User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      cargo: 'aux.TI',
      categoria: 'Usuário Padrão',
      loja: 'Gima FL Jaru'
    })

    const analista = await Analista.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      categoria: 'Analista'
    })

    const chamado = await Chamado.create({
      userId: user.id.toString(),
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: '69992115445',
    }, new UniqueEntityId('chamado-1'))

    await inMemoryChamado.create(chamado)
    // console.log(inMemoryChamado.items[0])
    
    await sut.excecute({
      chamadoId: 'chamado-1',
      descricao: 'Chamado cancelado pelo usuário.',
      status: 'Cancelado'
    })
    
    // console.log(inMemoryChamado.items[0])
    expect(inMemoryChamado.items[0]).toMatchObject({
      status: new StatusValueObject('Cancelado') 
    })
  });
});
