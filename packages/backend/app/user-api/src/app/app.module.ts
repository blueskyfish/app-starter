import { BackendBootstrapModule } from '@blueskyfish/backend-commons';
import { BackendDatabaseModule } from '@blueskyfish/backend-database';
import { BackendPlatformModule, configLoader } from '@blueskyfish/backend-platform';
import { Module } from '@nestjs/common';
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

    BackendBootstrapModule,
    BackendPlatformModule,
    BackendDatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
