import { Injectable } from '@angular/core';
import { isNil, isTrue } from '@blueskyfish/grundel';

const PREFIX_KEY = 'app-starter';

@Injectable({ providedIn: 'root'})
export class AuthStorageService {

  private readonly keys: Set<string> = new Set<string>();

  /**
   * Internal access to the storage
   * @private
   */
  private static get storage(): Storage {
    return localStorage;
  }

  setItem(name: string, value: string): void {
    const key = this.buildKey(name, true);
    AuthStorageService.storage.setItem(key, value);
  }

  getItem(name: string): string | null {
    const key = this.buildKey(name);
    return AuthStorageService.storage.getItem(key) ?? null;
  }

  hasItem(name: string): boolean {
    const key = this.buildKey(name);
    return !isNil(AuthStorageService.storage.getItem(key));
  }

  removeItem(name: string): void {
    const key = this.buildKey(name);
    if (AuthStorageService.storage)
    AuthStorageService.storage.removeItem(key);
    this.keys.delete(key);
  }

  private buildKey(name: string, checkKeyHit?: boolean): string {
    const key = `${PREFIX_KEY}.${name}`;
    if (isTrue(checkKeyHit) && !this.keys.has(key)) {
      this.keys.add(key);
    }
    return key;
  }



  clear(): void {
    this.keys.forEach((key) => {
      AuthStorageService.storage.removeItem(key);
    });
  }
}
