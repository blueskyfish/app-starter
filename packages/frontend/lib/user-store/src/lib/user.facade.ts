import { Injectable } from '@angular/core';
import { LoginPayload } from '@blueskyfish/frontend-user-api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActions } from './user.actions';
import { UserName } from './user.models';
import { UserPartialState } from './user.reducer';
import { selectUserName } from './user.selectors';

@Injectable({providedIn: 'root'})
export class UserFacadeService {

  constructor(private store: Store<UserPartialState>) {
  }

  /**
   * Emit the user id and name.
   *
   * > If the emitted value is `null`, then the user is not logged in.
   */
  get userName$(): Observable<UserName | null> {
    return this.store.select(selectUserName);
  }

  sendLogin(body: LoginPayload): void {
    this.store.dispatch(UserActions.userSendLogin({body}));
  }
}
