import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import { AuthService } from '../../../modules/auth/auth.service';
import { UserInfo } from 'firebase';

@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html',
})
export class FormChangePasswordComponent implements OnInit {
  user: IUser = {
    photoURL: '/assets/img/anonymous.jpg',
  };
  isPasswordChangeEnabled = false;
  account: Promise<UserInfo[]>;

  constructor(private userStore: Store<fromUser.State>, private authService: AuthService) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.account = this.authService.checkAccountType();
    if (this.account[0]['providerId'] === 'password') {
      this.isPasswordChangeEnabled = true;
    }
  }

  changePassword(): void {
    this.authService.resetPassword(this.account[0]['email']);
  }
}
