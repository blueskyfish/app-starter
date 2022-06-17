/*
 * Entry point for backend "UserApi"
 */
import { bootstrap, BootstrapOptions } from '@blueskyfish/backend-commons';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// TODO Update the application name and OpenApi Settings
const options: BootstrapOptions = {
  appName: 'Blueskyfish AppStarter',
  appModule: AppModule,
  httpHost: 'localhost',
  httpPort: 28050,
  production: environment.production,
  openApi: {
    title: 'Blueskyfish Application',
    description: 'The OpenApi Overview of "Blueskyfish AppStarter"',
    version: "0.0.1"
  }
};

bootstrap(options).catch((err) =>
  Logger.error(`🔥 Application "${options.appName}" could not start (${err.message})`, err.stack, 'Boostrap')
);
