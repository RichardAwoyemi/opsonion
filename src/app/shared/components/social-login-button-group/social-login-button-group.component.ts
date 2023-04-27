import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import { AuthService } from '../../../modules/auth/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-social-login-button-group',
  templateUrl: './social-login-button-group.component.html',
})
export class SocialLoginButtonGroupComponent implements OnInit {
  @Input() referredByUser: IUser;
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private store: Store<fromAuth.State>
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  googleSignIn(): void {
    if (this.referredByUser) {
      this.authService.googleSignInWithReferral(this.referredByUser).then(() => {});
    } else {
      this.store.dispatch(authActions.googleSignIn());
    }
  }

  mobileGoogleSignIn(): void {
    if (this.referredByUser) {
      this.authService.mobileGoogleSignInWithReferral(this.referredByUser).then(() => {});
    } else {
      this.store.dispatch(authActions.mobileGoogleSignIn());
    }
  }

  facebookSignIn(): void {
    if (this.referredByUser) {
      this.authService.facebookSignInWithReferral(this.referredByUser).then(() => {});
    } else {
      this.store.dispatch(authActions.facebookSignIn());
    }
  }

  mobileFacebookSignIn(): void {
    if (this.referredByUser) {
      this.authService.mobileFacebookSignInWithReferral(this.referredByUser).then(() => {});
    } else {
      this.store.dispatch(authActions.mobileFacebookSignIn());
    }
  }
}
