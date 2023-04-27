import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SimpleModalService } from 'src/app/shared/components/simple-modal/simple-modal.service';
import { AuthService } from '../../auth.service';
import { IUserLogin } from '../../../../shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: IUserLogin = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public simpleModalService: SimpleModalService,
    public ngZone: NgZone,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  login(): void {
    this.authService.signIn(this.user.email, this.user.password).then(
      (result) => {
        if (result != null) {
          if (result['user'].emailVerified !== false) {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']).then(() => {});
            });
          } else {
            this.router.navigate(['verify-email']).then(() => {});
            this.simpleModalService.displayMessage(
              'Oops!',
              'Your email account has not been verified yet.'
            );
          }
        }
      },
      (error) => {
        this.simpleModalService.displayMessage('Oops!', error.message);
      }
    );
  }
}
