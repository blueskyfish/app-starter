import { AuthMiddleware, BackendCommonsModule, HttpExceptionFilter } from '@blueskyfish/backend-commons';
import { BackendDatabaseModule } from '@blueskyfish/backend-database';
import { BackendPlatformModule, configLoader } from '@blueskyfish/backend-platform';
import { BackendQueueModule } from '@blueskyfish/backend-queue';
import {
  BackendUserModule,
  LoginController,
  RegisterController,
  RenewController,
  UserController
} from '@blueskyfish/backend-user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

/**
 * Main module for backend **UserApi**
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => configLoader('CONFIG_PATH')]
    }),

    BackendCommonsModule,
    BackendPlatformModule,
    BackendDatabaseModule,
    BackendQueueModule.registerAsBoth(),
    BackendUserModule,
  ],
  controllers: [
    LoginController,
    RegisterController,
    UserController,
    RenewController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    const publicRoutes = ['about', 'alive', 'check', 'login', 'register'];

    consumer
      .apply(AuthMiddleware)
      .exclude(...publicRoutes.map((route) => `/${route}`))
      .forRoutes(
        UserController,
        RenewController,
      )
  }
}
