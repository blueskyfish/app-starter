import { CryptoConfig, CryptoService } from '@blueskyfish/backend-platform';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

function cryptoLoading(): Record<string, any> {
  return {
    crypto: {
      publicKey: '96ZuvNfj71ngK0SoU940i6e5En4L20xtiLoGTpu4uFu9wCoWEWnKGpSSRXzQRGdq',
      privateKey: '96ZuvNfj71ngK0SoU940i6e5En4L20xtiLoGTpu4uFu9wCoWEWnKGpSSRXzQRGdq',
      digestSecret: '96ZuvNfj71ngK0SoU940i6e5En4L20xtiLoGTpu4uFu9wCoWEWnKGpSSRXzQRGdq'
    } as CryptoConfig,
  }
}

describe('Password Service', () => {

  let app: TestingModule;
  let passwordService: PasswordService;

  beforeEach(async () => {

    const priKeyFilename = 'test-private.pem';
    const pubKeyFilename = 'test-public.pem';

    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [cryptoLoading],
        })
      ],
      providers: [
        CryptoService,
        PasswordService,
      ]
    }).compile();

    passwordService = app.get(PasswordService);
  });

  afterAll(async () => await app.close());

  describe('password and check password', () => {

    it('should check the password', () => {

      const password = 'SaltedStars234!!';

      const hash = passwordService.generatePassword(password);

      // console.log('Password =>', hash);

      expect(hash).not.toBeNull();
      expect(passwordService.checkPassword(hash, password)).toBeTruthy();
    });

  });

});
