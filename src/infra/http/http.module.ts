import { Module } from '@nestjs/common';
import { SendCodeForTheEmailController } from './controller/send-code-for-the-email.controller';
import { SendEmail } from './controller/send-email.service';
import { ResetPasswordController } from './controller/login/reset-password.controller';
import { ResetPasswordUseCase } from 'src/domain/application/use-case/reset-password';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controller/user/create-user.controller';
import { CreateUserUseCase } from 'src/domain/application/use-case/create-user';
import { CreateChamadoController } from './controller/chamados/create-chamados.controller';
import { CreateChamadoUseCase } from 'src/domain/application/use-case/chamados/create-chamado';
import { CreateAnexosUseCase } from 'src/domain/application/use-case/chamados/create-anexos';
import { StorageModule } from '../storage/storage.module';
// import { UploadAnexosMulterController } from './controller/chamados/upload-anexos-multer.controller';
import { UploadAnexosController } from './controller/chamados/upload-anexos.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controller/login/authenticate.controller';
import { AuthenticateUseCase } from 'src/domain/application/use-case/authenticate';
import { CreateTokenResetPasswordUseCase } from 'src/domain/application/use-case/create-token-password';
import { EncerrarChamadoController } from './controller/chamados/encerrar-chamado.controller';
import { EncerrarChamadoUseCase } from 'src/domain/application/use-case/chamados/encerrar-chamado';
import { AtualizacaoChamadoController } from './controller/chamados/atualizacao-chamado.controller';
import { AtualizacaoChamadoUseCase } from 'src/domain/application/use-case/chamados/atualizacao-chamado';
import { ListChamadosByUserController } from './controller/chamados/list-chamados-by-user.controller';
import { ListChamadosByUserUseCase } from 'src/domain/application/use-case/chamados/list-chamados-by-user';

@Module({
  imports: [DatabaseModule, StorageModule,CryptographyModule],
  controllers: [
    CreateUserController,
    SendCodeForTheEmailController,
    AuthenticateController,
    ResetPasswordController,

    CreateChamadoController,
    EncerrarChamadoController,
    AtualizacaoChamadoController,
    ListChamadosByUserController,
    UploadAnexosController,
    // UploadAnexosMulterController
  ],
  providers: [
    CreateUserUseCase,
    SendEmail,
    AuthenticateUseCase,
    ResetPasswordUseCase,
    CreateTokenResetPasswordUseCase,

    CreateChamadoUseCase,
    EncerrarChamadoUseCase,
    AtualizacaoChamadoUseCase,
    ListChamadosByUserUseCase,
    CreateAnexosUseCase,
    
  ],
})
export class HttpModule {}
