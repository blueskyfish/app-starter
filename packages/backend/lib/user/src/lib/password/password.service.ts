import { CryptoService } from '@blueskyfish/backend-platform';
import { Injectable } from '@nestjs/common';
import { buildPassword, getSalt, generateSalt } from './password.util';

/**
 * The service create formatted password or check plain password with formatted password.
 *
 * The format of the password is in 3 parts separated
 *
 * * Version Information
 * * User Salt
 * * Hashed Password
 *
 *
 * Together with the version information, the user salt and the hashed password is stored and managed the password.
 */
@Injectable()
export class PasswordService {

  /**
   * Initialize the service
   *
   * @param {CryptoService} cryptoService the crypto service
   */
  constructor(private cryptoService: CryptoService) {
  }

  /**
   * Generates a password token. It contains an new version, user salt and the hashed password.
   *
   * @param {string} password the plain password.
   * @returns {string} the password token
   */
  generatePassword(password: string): string {
    const salt = generateSalt();
    const hash = this.cryptoService.digest(salt, password);

    return buildPassword(salt, hash);
  }

  /**
   * Check the plan password with the hashed password token.
   *
   * @param {string} hashedPassword the hashed password with version, user salt and hashed password
   * @param {string} password the plain password
   * @returns {boolean} `true` means, the password is correct.
   */
  checkPassword(hashedPassword: string, password: string): boolean {
    if (hashedPassword.startsWith('-')) {
      // plain password
      return password === hashedPassword.substring(1);
    }

    const salt = getSalt(hashedPassword);
    if (!salt) {
      return false;
    }
    const hash = this.cryptoService.digest(salt, password);
    if (!hash) {
      return false;
    }
    const temp = buildPassword(salt, hash);
    return hashedPassword === temp;
  }

  /**
   * Encrypt the given parameter value and return the encrypted data
   *
   * @see CryptoService.encrypt
   */
  encrypt(value: string): string {
    return this.cryptoService.encrypt(value);
  }

  /**
   * Decrypt the given parameter value and return the decrypted data
   *
   * @see CryptoService.decrypt
   */
  decrypt(value: string): string {
    return this.cryptoService.decrypt(value);
  }

  encryptData<T>(data: T): string {
    return this.cryptoService.encryptJson<T>(data);
  }

  decryptData<T>(value: string): T {
    return this.cryptoService.decryptJson<T>(value);
  }
}
