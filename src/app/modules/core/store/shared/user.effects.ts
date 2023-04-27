import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { IUser } from '../../../../shared/models/user';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class UserEffects {
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(UserActions.signOut),
    switchMap(() => of(this.authService.signOut()).pipe(map(() => UserActions.signOutSuccess())))
  );

  @Effect()
  getData$ = this.actions$.pipe(
    ofType(UserActions.getData),
    switchMap(() =>
      this.userService
        .getUserById(localStorage.getItem('uid'))
        .pipe(
          map((data: IUser) => UserActions.dataReceived({ payload: UserService.parseData(data) }))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
