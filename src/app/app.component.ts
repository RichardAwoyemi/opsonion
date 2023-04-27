import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import * as userActions from 'src/app/modules/core/store/shared/user.actions';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { IUser } from './shared/models/user';
import { Router } from '@angular/router';
import { RouterService } from './shared/services/router.service';
import { AuthService } from './modules/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;

declare let window: Window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  referredByUid: string;
  user: IUser;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    public router: Router,
    private routerService: RouterService,
    private authService: AuthService,
    private authStore: Store<fromAuth.State>,
    private userStore: Store<fromUser.State>
  ) {
    this.afAuth.getRedirectResult().then((result) => {
      if (result.user && this.authService.isLoggedIn()) {
        this.referredByUid = JSON.parse(localStorage.getItem('referredBy'));
        if (this.referredByUid) {
          this.processMobileReferralLogin(result);
        } else {
          this.processMobileLogin(result);
        }
        localStorage.removeItem('referredBy');
      }
    });
  }

  private static assignUserProfile(additionalUserInfo: UserCredential, providerId: string) {
    if (providerId === 'google.com') {
      return {
        firstName: additionalUserInfo['given_name'],
        lastName: additionalUserInfo['family_name'],
        email: additionalUserInfo['email'],
        displayName: additionalUserInfo['name'],
        photoURL: additionalUserInfo['picture'],
      };
    }
    if (providerId === 'facebook.com') {
      return {
        firstName: additionalUserInfo['first_name'],
        lastName: additionalUserInfo['last_name'],
        email: additionalUserInfo['email'],
        displayName: additionalUserInfo['name'],
        photoURL: additionalUserInfo['picture']['data']['url'],
      };
    }
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    this.afAuth.authState.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        localStorage.setItem('uid', result.uid);
        this.authStore.dispatch(authActions.getData());
        this.userStore.dispatch(userActions.getData());
      }
    });

    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result && this.authService.isLoggedIn()) {
          this.redirectUser();
        }
      });
  }

  processMobileLogin(response: UserCredential): void {
    this.isMobile.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (
        (result.matches &&
          !this.referredByUid &&
          response &&
          response.user.providerData[0].providerId === 'facebook.com') ||
        (result.matches && response && response.user.providerData[0].providerId === 'google.com')
      ) {
        this.authService
          .mobileLogin(
            AppComponent.assignUserProfile(response, response.user.providerData[0].providerId),
            response.user.uid
          )
          .then(() => {});
      }
    });
  }

  processMobileReferralLogin(response: UserCredential): void {
    this.isMobile.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (
        (result.matches &&
          this.referredByUid &&
          response &&
          response.user.providerData[0].providerId === 'facebook.com') ||
        (result.matches &&
          this.referredByUid &&
          response &&
          response.user.providerData[0].providerId === 'google.com')
      ) {
        const referredByUser: IUser = {
          uid: this.referredByUid,
        };
        this.authService
          .mobileReferralLogin(
            AppComponent.assignUserProfile(response, response.user.providerData[0].providerId),
            response.user.uid,
            referredByUser
          )
          .then(() => {});
      }
    });
  }

  redirectUser(): void {
    this.router.navigate([RouterService.getCurrentRoute()]).then(() => {});
  }

  onActivate(): void {
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
