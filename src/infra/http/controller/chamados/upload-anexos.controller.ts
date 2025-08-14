
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvalidAnexo } from 'src/core/errors/errors/invalid-anexos';
import { ResouceNotFoundError } from 'src/core/errors/errors/resource-not-found';
import { CreateAnexosUseCase } from 'src/domain/application/use-case/chamados/create-anexos';

@Controller('/anexos')
export class UploadAnexosController {
  constructor(
    private uploadAnsCreateAnexos: CreateAnexosUseCase
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Código copiado da documentação do nest.js
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // aqui definimos o tamanho do arquivo q vamos receber
          new MaxFileSizeValidator({ 
            maxSize: 1024 * 1024 * 2 // 2md
           }),

           // aqui definimos o formato do arquivo
          new FileTypeValidator({ 
            fileType: '.(png|jpg|jpeg|pdf)'
           }),
        ],
      }),
    ) file: Express.Multer.File
  ) {
    const result = await this.uploadAnsCreateAnexos.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAnexo:
          throw new Error(error.message)
        default: 
        throw new Error(error.message)
      }
    }

    const {anexos} = result.value

    return {
      anexosId: anexos.id.toString()
    }
  }

}
