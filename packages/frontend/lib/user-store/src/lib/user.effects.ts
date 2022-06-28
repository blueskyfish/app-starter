import { Injectable } from '@angular/core';
import { AuthManagerService } from '@blueskyfish/frontend-auth-util';
import { LoginUser, UserApiService, UserInfo } from '@blueskyfish/frontend-user-api';
import { Actions, createEffect, ofType, OnInitEffects, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserActions } from './user.actions';

@Injectable({providedIn: 'root'})
export class UserEffects implements OnInitEffects {

  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.initialUser),
      switchMap(() => {
        if (this.authManager.hasToken) {
          return this.userApi.getUserInfo()
            .pipe(
              map((user: UserInfo) => UserActions.updateUserInfo({user}))
            );
        }
        return EMPTY;
      })
    );
  });

  /**
   * Send the login payload with the user credentials.
   *
   * In case of success, the user is logged in and
   */
  readonly sendLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSendLogin),
      switchMap(({body}) => {
        return this.userApi.loginUser({body})
          .pipe(
            map((result: LoginUser) => {
              const user: UserInfo = {
                id: result.id,
                name: result.name,
                email: result.email,
                permissions: result.permissions,
              };
              this.authManager.login(result.token);
              // TODO Action for redirect to "Dashboard"
              return UserActions.updateUserInfo({user});
            }),
            catchError((err) => {
              // TODO Prepare the error
              return EMPTY;
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authManager: AuthManagerService,
    private userApi: UserApiService,
  ) {
  }

  ngrxOnInitEffects(): Action {
    return UserActions.initialUser();
  }
}
