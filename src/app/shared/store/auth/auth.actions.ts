import { createAction, props } from '@ngrx/store';
import { LoginBody, UserResponse } from '@interfaces/login.interface';

export const loginUser = createAction(
  '[Login Page] Login User',
  props<{ loginData: LoginBody }>()
);

export const loginUserSuccess = createAction(
  '[Login API] Login Success',
  props<{ user: UserResponse }>()
);

export const loginUserFailure = createAction(
  '[Login API] Login Failure',
  props<{ error: any }>()
);
