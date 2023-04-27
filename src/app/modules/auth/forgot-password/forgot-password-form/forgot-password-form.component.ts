import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { IUserLogin } from '../../../../shared/models/user';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent {
  user: IUserLogin;
  showEmailInputError = false;

  constructor(public authService: AuthService) {}

  checkEmailInputError(): void {
    this.showEmailInputError = !this.user.email || this.user.email.length === 0;
  }

  submitPasswordResetRequest(): void {
    this.checkEmailInputError();
    if (this.showEmailInputError === false) {
      this.authService.resetPassword(this.user.email);
    }
  }

  trim(): void {
    if (!UtilService.isNullOrWhitespace(this.user.email)) {
      this.user.email.trim();
    }
  }
}
