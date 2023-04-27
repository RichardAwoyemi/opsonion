import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';

@Component({
  selector: 'app-login-button-group',
  templateUrl: './login-button-group.component.html',
})
export class LoginButtonGroupComponent implements OnInit {
  @Input() position: string;
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private library: FaIconLibrary,
    private store: Store<fromAuth.State>
  ) {
    library.addIcons(faFacebookF, faGoogle, faLongArrowAltRight);
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  setButtonAlignment(position: string): string {
    if (position === 'center') {
      return 'gap-xy text-center';
    }
    if (position === 'left') {
      return 'gap-xy';
    }
  }

  googleSignIn(): void {
    if (this.isMobile['matches'] === true) {
      this.store.dispatch(authActions.mobileGoogleSignIn());
    } else {
      this.store.dispatch(authActions.googleSignIn());
    }
  }

  facebookSignIn(): void {
    if (this.isMobile['matches'] === true) {
      this.store.dispatch(authActions.mobileFacebookSignIn());
    } else {
      this.store.dispatch(authActions.facebookSignIn());
    }
  }
}
