import { Encrypter } from "src/domain/application/criptography/encrypter";
import { JwtEncrypter } from "./jwt-encrypter";
import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Coloque isso num .env no projeto real
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter }
  ],
  exports: [Encrypter]
})
export class CryptographyModule {}
