import { isNil } from '@blueskyfish/grundel';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserName } from './user.models';
import { UserState, userFeatureKey } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(
  userFeatureKey
);

export const selectUserName = createSelector(
  selectUserState,
  (state): UserName | null => {
    if (isNil(state.user)) {
      return null;
    }
    return {
      id: state.user?.id ?? '',
      name: state.user?.name ?? ''
    };
  }
)

