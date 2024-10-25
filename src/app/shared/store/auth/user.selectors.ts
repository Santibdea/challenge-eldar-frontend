import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './auth.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectLoginError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
