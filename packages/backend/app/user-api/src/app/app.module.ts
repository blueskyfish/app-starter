import { BackendBootstrapModule } from '@blueskyfish/backend-commons';
import { BackendPlatformModule } from '@blueskyfish/backend-platform';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from '../../../../lib/platform/src/lib/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
