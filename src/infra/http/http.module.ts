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

import { CreateAnalistaController } from './controller/analista/create-analista.controller';
import { CreateAnalistaUseCase } from 'src/domain/application/use-case/create-analista';

import { EditUserController } from './controller/user/edit-user.controller';
import { EditUserUseCase } from 'src/domain/application/use-case/edit-user';
import { GetUserByIdController } from './controller/user/get-user-by-id.controller';
import { GetUserByIdUseCase } from 'src/domain/application/use-case/get-user-by-id';
import { DeleteUserController } from './controller/user/delete-user.controller';
import { DeleteUserUseCase } from 'src/domain/application/use-case/delete-user';
import { CancelarChamadoController } from './controller/chamados/cancelar-chamado.controller';
import { CancelarChamadoUseCase } from 'src/domain/application/use-case/chamados/cancelar-chamado';
import { ListUsersController } from './controller/user/list-user.controller';
import { ListUsersUseCase } from 'src/domain/application/use-case/list-users';

@Module({
  imports: [DatabaseModule, StorageModule,CryptographyModule],
  controllers: [
    CreateUserController,
    CreateAnalistaController,
    EditUserController,
    GetUserByIdController,
    ListUsersController,
    DeleteUserController,
    SendCodeForTheEmailController,
    AuthenticateController,
    ResetPasswordController,

    CreateChamadoController,
    EncerrarChamadoController,
    AtualizacaoChamadoController,
    ListChamadosByUserController,
    CancelarChamadoController,
    UploadAnexosController,
    // UploadAnexosMulterController
  ],
  providers: [
    CreateUserUseCase,
    CreateAnalistaUseCase,
    EditUserUseCase,
    GetUserByIdUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    SendEmail,
    AuthenticateUseCase,
    ResetPasswordUseCase,
    CreateTokenResetPasswordUseCase,

    CreateChamadoUseCase,
    EncerrarChamadoUseCase,
    AtualizacaoChamadoUseCase,
    ListChamadosByUserUseCase,
    CancelarChamadoUseCase,
    CreateAnexosUseCase,
    
  ],
})
export class HttpModule {}
