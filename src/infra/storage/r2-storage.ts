import 'dotenv'
import { EnvService } from '../env/env.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Uploader, UploadParams } from 'src/domain/application/storage/uploader';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(
    private envService: EnvService
  ) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
   
    this.client = new S3Client({
      endpoint: `https://3bcab79d365c99fc64fdc1b07e42a8cf.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY')
      }
    })
  }

  async upload({
    fileName,
    fileType,
    body
  }: UploadParams): Promise<{ url: string; }> {
    const upload = randomUUID()
    const uniqueFileName = `${upload}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_CLOUD_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body
      })

    )

    // Uma dica importante é não salvar o arquivo inteiro no banco de dados, e sim, uma referência, tipo um id, parte da url com o nome do arquivo.

    return {
      url: uniqueFileName
    }
  }
}
