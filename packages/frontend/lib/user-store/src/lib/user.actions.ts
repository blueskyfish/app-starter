import { LoginPayload, UserInfo } from '@blueskyfish/frontend-user-api';
import { createAction, props } from '@ngrx/store';

export const userUploadInfo = createAction(
  '[Users] update user info',
  props<{ user: UserInfo }>()
);

export const userSendLogin = createAction(
  '[Users] send user login',
  props<{ body: LoginPayload}>()
);



