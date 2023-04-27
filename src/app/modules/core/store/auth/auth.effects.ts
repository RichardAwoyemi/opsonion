import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { IAuth } from '../../../../shared/models/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  googleSignIn$ = this.actions$.pipe(
    ofType(AuthActions.googleSignIn),
    switchMap(() =>
      from(this.authService.googleSignIn()).pipe(
        map(() => AuthActions.signInSuccess()),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  mobileGoogleSignIn$ = this.actions$.pipe(
    ofType(AuthActions.mobileGoogleSignIn),
    switchMap(() =>
      from(this.authService.mobileGoogleSignIn()).pipe(
        map(() => AuthActions.signInSuccess()),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  facebookSignIn$ = this.actions$.pipe(
    ofType(AuthActions.facebookSignIn),
    switchMap(() =>
      from(this.authService.facebookSignIn()).pipe(
        map(() => AuthActions.signInSuccess()),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(AuthActions.signOut),
    switchMap(() =>
      of(this.authService.signOut()).pipe(
        map(() => AuthActions.signOutSuccess()),
        catchError((err) =>
          of(
            AuthActions.signOutError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  mobileFacebookSignIn$ = this.actions$.pipe(
    ofType(AuthActions.mobileFacebookSignIn),
    switchMap(() =>
      from(this.authService.mobileFacebookSignIn()).pipe(
        map(() => AuthActions.signInSuccess()),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  getData$ = this.actions$.pipe(
    ofType(AuthActions.getData),
    switchMap(() =>
      this.afAuth.authState.pipe(
        map((data: IAuth) => {
          if (data) {
            return AuthActions.dataReceived({
              payload: AuthService.parseData(data),
            });
          } else {
            return AuthActions.dataNotReceived();
          }
        }),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );
  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(AuthActions.signInSuccess),
    switchMap(() =>
      this.afAuth.authState.pipe(
        map((data: IAuth) => {
          if (data) {
            localStorage.setItem('uid', AuthService.parseData(data).uid);
            return AuthActions.dataReceived({
              payload: AuthService.parseData(data),
            });
          } else {
            return AuthActions.dataNotReceived();
          }
        }),
        catchError((err) =>
          of(
            AuthActions.signInError({
              errorMessage: err.message,
              errorCode: err.code,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}
}
