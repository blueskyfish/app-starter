import { Module, Global } from '@nestjs/common';
import { AuthMiddleware } from './auth';
import { HttpExceptionFilter } from './errors';

/**
 * Exportable provider services
 */
const providers = [
  AuthMiddleware,
  HttpExceptionFilter,
]

@Global()
@Module({
	controllers: [],
	providers: [
    ...providers,
  ],
	exports: [
    ...providers,
  ],
})
export class BackendCommonsModule {}
