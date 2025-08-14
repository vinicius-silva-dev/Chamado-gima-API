import 'dotenv'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Coloque isso num .env no projeto real
      signOptions: { expiresIn: '3h' },
    }),
    EnvModule
  ],
  providers: [EnvService],
})
export class AuthModule {}