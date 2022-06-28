import { ShellBarRecord } from '@blueskyfish/frontend-shell-nav-service';
import { createReducer, on } from '@ngrx/store';
import { ShellBarActions } from './shell-bar.actions';

export const shellBarFeatureKey = 'shellBar';

export interface ShellBarState {
  [id: string]: ShellBarRecord;
}

export const initialState: ShellBarState = {};

export interface ShellBarPartialState {
  [shellBarFeatureKey]: ShellBarState;
}

export const shellBarReducer = createReducer(
  initialState,

  on(ShellBarActions.updateShellBarItems, (state, { items }) => ({
    ...items,
  })),
);
