import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
})
export class FormRegisterComponent implements OnInit {
  @Input() referredByUser: IUser;
  form: {
    user: IUser;
    userAcceptedAgreement: boolean;
    captcha: string;
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem('user');
  }

  register(): void {
    if (!this.referredByUser) {
      this.authService
        .register(
          this.form.user.email,
          this.form.user.password,
          this.form.user.firstName,
          this.form.user.lastName
        )
        .then(() => {});
    } else {
      this.authService
        .registerWithReferral(
          this.form.user.email,
          this.form.user.password,
          this.form.user.firstName,
          this.form.user.lastName,
          this.referredByUser
        )
        .then(() => {});
    }
  }
}
