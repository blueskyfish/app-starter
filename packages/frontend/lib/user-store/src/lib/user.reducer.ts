import { UserInfo } from '@blueskyfish/frontend-user-api';
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './user.actions';

export const userFeatureKey = 'users';

export interface UserState {
  /**
   * The information about the current user
   */
  user: UserInfo | null;
}

export interface UserPartialState {
  [userFeatureKey]: UserState;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.userUploadInfo, (state, { user }) => ({
    ...state,
    user,
  }))
);
