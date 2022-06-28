import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShellBarItemMap } from '@blueskyfish/frontend-shell-nav-service';
import { ShellBarConfigService } from '@blueskyfish/frontend-shell-nav-store';
import { Actions, createEffect, ofType, OnInitEffects, } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ShellBarActions } from './shell-bar.actions';

@Injectable({ providedIn: 'root' })
export class ShellBarEffects implements OnInitEffects {

  readonly initAndLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShellBarActions.loadShellBarItems),
      switchMap(() => {
        return this.http.get(this.config.actionUrl).pipe(
          // @ts-ignore
          map((items: ShellBarItemMap) =>
            ShellBarActions.updateShellBarItems({ items })
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private config: ShellBarConfigService
  ) {}

  ngrxOnInitEffects(): Action {
    console.log('> Debug: OnInitEffects');
    return ShellBarActions.loadShellBarItems();
  }
}
