import { Injectable } from '@angular/core';
import { AuthStorageService } from '@blueskyfish/frontend-auth-util';
import { isEmpty } from '@blueskyfish/grundel';
import { DateTime } from 'luxon';

const AUTH_USER_TOKEN = 'auth.userToken';
const AUTH_USER_TIMESTAMP = 'auth.userTimestamp';

/**
 * The **auth manager** service manages the access tokens and the timestamp of the login
 */
@Injectable({ providedIn: 'root'})
export class AuthManagerService {

  constructor(private storage: AuthStorageService) {
  }

  /**
   * Check if the authorization token from user is existed
   */
  get hasToken(): boolean {
    return this.storage.hasItem(AUTH_USER_TOKEN) && this.storage.hasItem(AUTH_USER_TIMESTAMP);
  }

  /**
   * Get the authorization user token
   */
  get token(): string {
    return this.storage.getItem(AUTH_USER_TOKEN) ?? '';
  }

  login(token: string): void {
    if (!isEmpty(token)) {
      this.storage.setItem(AUTH_USER_TIMESTAMP, DateTime.now().toSQL());
      this.storage.setItem(AUTH_USER_TOKEN, token);
    }
  }

  logout(): void {
    this.storage.removeItem(AUTH_USER_TIMESTAMP);
    this.storage.removeItem(AUTH_USER_TOKEN);
  }
}
