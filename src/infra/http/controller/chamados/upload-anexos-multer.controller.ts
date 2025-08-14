// import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { InvalidAnexo } from 'src/core/errors/errors/invalid-anexos';
// import { CreateAnexosUseCase } from 'src/domain/application/use-case/chamados/create-anexos';

// @Controller('/anexosmulter')
// export class UploadAnexosMulterController {
//   constructor(
//     private uploadAnsCreateAnexos: CreateAnexosUseCase
//   ) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('file', {
//     storage: diskStorage({
//       destination: '../../../../../uploads/',
//       filename: (req, file, callback) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//         const ext = extname(file.originalname);
//         callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
//       },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   })) // Código copiado da documentação do nest.js
//   async handle(
//     @UploadedFile() file: Express.Multer.File
//   ) {
//     const result = await this.uploadAnsCreateAnexos.execute({
//       fileName: file.originalname,
//       fileType: file.mimetype,
//       path: file.path,
//       size: file.size
//     })

//     if (result.isLeft()) {
//       const error = result.value

//       switch (error.constructor) {
//         case InvalidAnexo:
//           throw new Error(error.message)
//         default: 
//         throw new Error(error.message)
//       }
//     }

//     const {anexos} = result.value

//     return {
//       anexosId: anexos.id.toString()
//     }
//   }

// }
