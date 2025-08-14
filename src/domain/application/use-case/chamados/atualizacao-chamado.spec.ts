import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { User } from 'src/domain/enteprise/entities/user';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { describe, test, expect, beforeEach } from 'vitest';
import { AtualizacaoChamadoUseCase } from './atualizacao-chamado';
import { InMemoryAtualizacaoChamado } from 'test/repository/in-memory-atualizacao-chamado';


let inMemoryAtualizacaoChamado: InMemoryAtualizacaoChamado
let sut: AtualizacaoChamadoUseCase
describe('Atender chamado', async () => {
  beforeEach(() => {
    inMemoryAtualizacaoChamado = new InMemoryAtualizacaoChamado()
    sut = new AtualizacaoChamadoUseCase(inMemoryAtualizacaoChamado)
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

    const chamado = await Chamado.create({
      userId: user.id,
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'incidente',
      status: new StatusValueObject(),
      atualizacaoChamado: [],
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste, onde precisamos descrever bem para que o test seja aprovado.',
      telefone: 69992115445,
    }, new UniqueEntityId('chamado-1'))

    // console.log(inMemoryChamado.items[0])
    
    await sut.excecute({
      chamadoId: chamado.id.toString(),
      userId: user.id.toString(),
      descricao: 'Aqui é a descrição do chamado',
      anexosIds: ['1', '2']
    })
  
    expect(inMemoryAtualizacaoChamado.items).toHaveLength(1);
    expect(inMemoryAtualizacaoChamado.items[0].anexos).toHaveLength(2);
    expect(inMemoryAtualizacaoChamado.items[0].anexos).toEqual([
      expect.objectContaining({ anexosId: new UniqueEntityId('1') }),
      expect.objectContaining({ anexosId: new UniqueEntityId('2') }),
    ]);
  });
});
