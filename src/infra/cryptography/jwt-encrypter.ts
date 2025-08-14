import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from 'src/domain/application/criptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.sign(payload);
  }

}
