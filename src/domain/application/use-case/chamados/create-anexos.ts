import { Injectable } from '@nestjs/common';
import { Anexos } from 'src/domain/enteprise/entities/anexos';
import { AnexosRepository } from '../../repository/anexos-repository';
import { Either, left, right } from 'src/core/either';
import { Uploader } from '../../storage/uploader';
import { InvalidAnexo } from 'src/core/errors/errors/invalid-anexos';

interface CreateAnexosRequest {
  fileName: string
  fileType: string
  body: Buffer
  // path: string
  // size: number
}

type CreateAnexosResponse = Either<InvalidAnexo, {
  anexos: Anexos;
}> ;

@Injectable()
export class CreateAnexosUseCase {
  constructor(
    private anexosRepository: AnexosRepository,
    private uploader: Uploader
  ) {}

  async execute({
    fileName,
    fileType,
    body
    // path,
    // size
  }: CreateAnexosRequest): Promise<CreateAnexosResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAnexo())
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body
      // path,
      // size
    })

    const anexos = await Anexos.create({
      title: fileName,
      url
    });

    await this.anexosRepository.create(anexos);

    return right({ anexos });
  }
}
