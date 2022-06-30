import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShellBar from './shell-bar.reducer';

export const selectShellBarState = createFeatureSelector<fromShellBar.ShellBarState>(
  fromShellBar.shellBarFeatureKey
);

export class ShellBarSelectors {

  static selectShellbarRecordList = createSelector(
    selectShellBarState,
    (state) => {
      return Object.values(state);
    }
  );
}
