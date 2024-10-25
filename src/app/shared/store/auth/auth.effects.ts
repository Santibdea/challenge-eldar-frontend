import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LoginService, TokenService } from '@services';
import { UserResponse } from '@interfaces/login.interface';
import { loginUser, loginUserFailure, loginUserSuccess } from './auth.actions';
import { Router } from '@angular/router';
import { HomeComponent } from '@views/private/home/home.component';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router

  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser), 
      mergeMap(({ loginData }) =>
        this.loginService.login(loginData).pipe(
          map((users: UserResponse[]) => {
            if (users.length > 0) {
              this.tokenService.setToken(users[0].token)
              this.router.navigate([HomeComponent.PATH])
              return loginUserSuccess({ user: users[0] });
            } else {
                console.log('login con error');
              return loginUserFailure({ error: 'Credenciales incorrectas' }); 
            }
          }),
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );
}
