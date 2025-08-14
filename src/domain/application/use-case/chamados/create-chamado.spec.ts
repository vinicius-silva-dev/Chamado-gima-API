import { InMemoryChamado } from 'test/repository/in-memory-chamado';
import { describe, test, expect, beforeEach } from 'vitest';
import { CreateChamadoUseCase } from './create-chamado';
import { MakeUser } from 'test/factory/make-user';
import { InMemoryUser } from 'test/repository/in-memory-user';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { InMemoryAnalista } from 'test/repository/in-memory-analista';
import { Analista } from 'src/domain/enteprise/entities/analistas';
import { InMemoryChamadoAnexos } from 'test/repository/in-memory-chamado-anexos';
import { InMemoryAnexos } from 'test/repository/in-memory-anexos';

// let inMemoryAnalista: InMemoryAnalista;
let inMemoryChamadoAnexos: InMemoryChamadoAnexos
let inMemoryAnexos: InMemoryAnexos
let inMemoryChamado: InMemoryChamado;
let sut: CreateChamadoUseCase;
describe('Create chamado', async () => {
  beforeEach(() => {
    inMemoryChamadoAnexos = new InMemoryChamadoAnexos()
    inMemoryAnexos = new InMemoryAnexos()
    inMemoryChamado = new InMemoryChamado(inMemoryChamadoAnexos, inMemoryAnexos);
    // inMemoryAnalista = new InMemoryAnalista();
    sut = new CreateChamadoUseCase(inMemoryChamado);
  });

  test('should be abble create a chamado.', async () => {
    // const user = await MakeUser();

    await sut.excecute({
      userId: 'user-1',
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      anexosIds: ['1', '2'],
      telefone: '69992115445',
    });

    expect(inMemoryChamado.items).toHaveLength(1);
    expect(inMemoryChamado.items[0].anexos.currentItems).toHaveLength(2);
    expect(inMemoryChamado.items[0].anexos.currentItems).toEqual([
      expect.objectContaining({ anexosId: new UniqueEntityId('1') }),
      expect.objectContaining({ anexosId: new UniqueEntityId('2') }),
    ]);
  });


  test('should persist attachment when creating a new chamado', async () => {
    const result = await sut.excecute({
      userId: 'user-1',
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      anexosIds: ['1', '2'],
      telefone: '69992115445',
    });

    console.log(inMemoryChamadoAnexos.items)
    expect(result.isRight()).toBe(true)
    expect(inMemoryChamadoAnexos.items).toHaveLength(2)
    expect(inMemoryChamadoAnexos.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          anexosId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          anexosId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
});
