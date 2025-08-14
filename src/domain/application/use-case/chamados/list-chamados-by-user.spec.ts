import { InMemoryChamado } from 'test/repository/in-memory-chamado';
import { describe, test, expect, beforeEach } from 'vitest';
import { ListChamadosByUserUseCase } from './list-chamados-by-user';
import { MakeUser } from 'test/factory/make-user';
import { InMemoryUser } from 'test/repository/in-memory-user';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { User } from 'src/domain/enteprise/entities/user';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { InMemoryAnexos } from 'test/repository/in-memory-anexos';
import { InMemoryChamadoAnexos } from 'test/repository/in-memory-chamado-anexos';

let inMemoryUser: InMemoryUser;
let inMemoryChamado: InMemoryChamado;
let inMemoryChamadoAnexos: InMemoryChamadoAnexos
let inMemoryAnexos: InMemoryAnexos
let sut: ListChamadosByUserUseCase;
describe('List chamado', async () => {
  beforeEach(() => {
    inMemoryChamadoAnexos = new InMemoryChamadoAnexos()
    inMemoryAnexos = new InMemoryAnexos()
    inMemoryChamado = new InMemoryChamado(inMemoryChamadoAnexos, inMemoryAnexos);
    inMemoryUser = new InMemoryUser();
    sut = new ListChamadosByUserUseCase(inMemoryChamado);
  });

  test('should be abble get a chamado by user.', async () => {
     const user = User.create({
        name: 'Vinicius Silva',
        email: 'vinicius100@live.com',
        password: '123456',
        cargo: 'aux.TI',
        categoria: 'Usuário Padrão',
        loja: 'Gima FL Jaru'
      })
    
    inMemoryUser.create(user);

    const chamado1 = await Chamado.create({
      userId: new UniqueEntityId('user-1') ,
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject('Aberto'),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: 69992115445,
    });

    await inMemoryChamado.create(chamado1)

    const chamado2 = await Chamado.create({
      userId: user.id ,
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'Melhoria',
      status: new StatusValueObject('Aberto'),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: 69992115445,
    });

    await inMemoryChamado.create(chamado2)

    const result = await sut.excecute({
      userId: user.id.toString()
    })

    // console.log('chamado', result.chamados, 'user: ', user.id.toString())
    expect(result.value).toMatchObject({
      chamados: expect.arrayContaining([
        expect.objectContaining({
          userId: user.id
        })
      ])
    });
 
  });
});
