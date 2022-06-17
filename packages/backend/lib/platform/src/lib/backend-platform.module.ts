import { Module, Global } from '@nestjs/common';
import { CryptoService } from './crypto';

const services = [CryptoService];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class BackendPlatformModule {}
