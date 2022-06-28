import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGlobal from './shell-bar.reducer.ts';

export const selectGlobalState = createFeatureSelector<fromGlobal.ShellBarState>(
  fromGlobal.shellBarFeatureKey
);
