import { createReducer, on } from '@ngrx/store';
import { User } from '@interfaces/user.interface';
import { loginUserFailure, loginUserSuccess } from './auth.actions';

export interface UserState {
  user: User | null;
  error: any | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    user: {
      id: user.id,
      role: user.role,
      token: user.token,
      avatar: user.avatar,
    },
    error: null,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
