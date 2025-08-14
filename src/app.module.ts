import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpModule } from './infra/http/http.module'
import { DatabaseModule } from './infra/database/database.module'
import { EnvModule } from './infra/env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { AuthModule } from './infra/auth/auth.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
    EnvModule
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
