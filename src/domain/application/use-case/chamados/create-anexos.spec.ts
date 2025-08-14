import { InMemoryAnexos } from 'test/repository/in-memory-anexos';
import { describe, test, expect, beforeEach } from 'vitest';
import { CreateAnexosUseCase } from './create-anexos';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { StatusValueObject } from 'src/domain/enteprise/entities/value-object/status';
import { Chamado } from 'src/domain/enteprise/entities/chamado';
import { FakeUploader } from 'test/storage/fake-uploader';
import { InvalidAnexo } from 'src/core/errors/errors/invalid-anexos';

let inMemoryAnexos: InMemoryAnexos;
let fakeUploader: FakeUploader
let sut: CreateAnexosUseCase;
describe('Create anexos', async () => {
  beforeEach(() => {
    inMemoryAnexos = new InMemoryAnexos();
    fakeUploader = new FakeUploader()
    sut = new CreateAnexosUseCase(inMemoryAnexos, fakeUploader);
  });

  test('should be abble create a anexos.', async () => {

    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from('')
    });

    console.log(result.value)
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      anexos: inMemoryAnexos.items[0]
    })
    expect(fakeUploader.uploads[0]).toEqual(expect
      .objectContaining({
        fileName: 'profile.png'
      })
    )
  });

  test('should not be able to upload an attachment  with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'video/mpeg',
      body: Buffer.from('')
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAnexo)
  })
});
