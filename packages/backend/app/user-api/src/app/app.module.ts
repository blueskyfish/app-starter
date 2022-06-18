import { AuthMiddleware, BackendCommonsModule } from '@blueskyfish/backend-commons';
import { BackendDatabaseModule } from '@blueskyfish/backend-database';
import { BackendPlatformModule, configLoader } from '@blueskyfish/backend-platform';
import { BackendQueueModule } from '@blueskyfish/backend-queue';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    const publicRoutes = ['about', 'alive', 'check'];

    consumer
      .apply(AuthMiddleware)
      .exclude(...publicRoutes.map((route) => `/${route}`))
      .forRoutes(
        // Add here the controllers
      )
  }
}
