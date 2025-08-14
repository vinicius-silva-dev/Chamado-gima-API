import { InMemoryChamado } from 'test/repository/in-memory-chamado';
import { describe, test, expect, beforeEach } from 'vitest';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { User } from 'src/domain/enteprise/entities/user';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { GetChamadosAtendidoByAnalistaUseCase } from './get-chamados-atendidos-by-analista';
import { Analista } from 'src/domain/enteprise/entities/analistas';
import { InMemoryAnexos } from 'test/repository/in-memory-anexos';
import { InMemoryChamadoAnexos } from 'test/repository/in-memory-chamado-anexos';

let inMemoryChamado: InMemoryChamado;
let inMemoryChamadoAnexos: InMemoryChamadoAnexos
let inMemoryAnexos: InMemoryAnexos
let sut: GetChamadosAtendidoByAnalistaUseCase;
describe('Create chamado', async () => {
  beforeEach(() => {
    inMemoryChamadoAnexos = new InMemoryChamadoAnexos()
    inMemoryAnexos = new InMemoryAnexos()
    inMemoryChamado = new InMemoryChamado(inMemoryChamadoAnexos, inMemoryAnexos);
    sut = new GetChamadosAtendidoByAnalistaUseCase(inMemoryChamado);
  });

  test('should be abble get chamados serverd by analista.', async () => {
     const user = User.create({
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
      userId: user.id,
      analistaId: analista.id,
      loja: 'Gima FL Jaru',
      prioridade: 'Medio',
      tipo_chamado: 'Melhoria',
      status: new StatusValueObject('Atendimento'),
      title: 'Chamado de teste.',
      descricao: 'Essa descição é apenas um teste.',
      telefone: 69992115445,
    });

    await inMemoryChamado.create(chamado2)
    
    const result = await sut.excecute({
      analistaId: analista.id.toString()
    })

    console.log(result.value)
    expect(result.value).toMatchObject({
      chamados: expect.arrayContaining([
        expect.objectContaining({
          analistaId: analista.id
        })
      ])
    });
 
  });
});
