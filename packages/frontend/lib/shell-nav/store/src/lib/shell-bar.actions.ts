import { ShellBarItemMap } from '@blueskyfish/frontend-shell-nav-service';
import { createAction, props } from '@ngrx/store';

export class ShellBarActions {
  static readonly loadShellBarItems = createAction(
    '[ShellBar] load shell-bar items'
  );

  static readonly updateShellBarItems = createAction(
    '[ShellBar] update shell-bar items',
    props<{ items: ShellBarItemMap }>()
  );
}
