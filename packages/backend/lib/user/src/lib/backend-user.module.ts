import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password';
import { LoginService, RegisterService, RenewService, UserService } from './services';

@Global()
@Module({
  providers: [
    LoginService,
    RegisterService,
    RenewService,
    PasswordService,
    UserService,
  ],
  exports: [
    LoginService,
    RegisterService,
    RenewService,
    PasswordService,
    UserService,
  ],
})
export class BackendUserModule {}
