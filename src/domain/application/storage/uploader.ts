export interface UploadParams {
  fileName: string
  fileType: string
  body: Buffer
  // path: string
  // size: number
}
// Aqui é basicamente um contrato de como será o uploade de anexos, ou seja, oq vai ter nesse anexo.
export abstract class Uploader {
  abstract upload(params: UploadParams): Promise<{ url: string }>
}