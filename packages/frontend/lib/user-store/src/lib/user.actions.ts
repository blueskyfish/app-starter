import { LoginPayload, UserInfo } from '@blueskyfish/frontend-user-api';
import { createAction, props } from '@ngrx/store';

export class UserActions {

  static readonly initialUser = createAction(
    '[User] initial user',
  );

  static readonly updateUserInfo = createAction(
    '[Users] update user info',
    props<{ user: UserInfo }>()
  );

  static readonly userSendLogin = createAction(
    '[Users] send user login',
    props<{ body: LoginPayload}>()
  );
}


