import { randomUUID } from 'crypto'
import { Uploader, UploadParams } from 'src/domain/application/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

// Aqui estamos criando um anexo fake para implementar no test.

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({fileName}: UploadParams): Promise<{ url: string }> {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url
    })
    
    return {url}
  }

}
