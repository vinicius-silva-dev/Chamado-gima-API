import 'dotenv'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-guard';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Coloque isso num .env no projeto real
      signOptions: { expiresIn: '3h' },
    }),
    EnvModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    JwtStrategy,
    EnvService
  ],
})
export class AuthModule {}