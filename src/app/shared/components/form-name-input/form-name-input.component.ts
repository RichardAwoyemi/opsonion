import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import { IUser } from 'src/app/shared/models/user';
import { UserService } from '../../services/user.service';
import { FormNameInputService } from './form-name-input.service';

@Component({
  selector: 'app-form-name-input',
  templateUrl: './form-name-input.component.html',
})
export class FormNameInputComponent implements OnInit, OnDestroy {
  firstName: string;
  lastName: string;
  showFirstNameInputError: { [key: string]: boolean };
  showLastNameInputError: { [key: string]: boolean };
  ngUnsubscribe = new Subject<void>();

  constructor(
    public formNameInputService: FormNameInputService,
    public userService: UserService,
    private userStore: Store<fromUser.State>
  ) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          if (result.firstName) {
            this.firstName = result.firstName;
            this.formNameInputService.showFirstNameInputError.next({
              status: !this.firstName,
            });
            this.userService.firstName.next(this.firstName);
          }
          if (result.lastName) {
            this.lastName = result.lastName;
            this.formNameInputService.showLastNameInputError.next({
              status: !this.lastName,
            });
            this.userService.lastName.next(this.lastName);
          }
        }
      });

    this.formNameInputService.showFirstNameInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showFirstNameInputError = result;
        }
      });

    this.formNameInputService.showLastNameInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showLastNameInputError = result;
        }
      });
  }

  onChangeUpdateFirstName(): void {
    this.userService.firstName.next(this.firstName);
    this.formNameInputService.checkFirstNameInput(this.firstName);
  }

  onChangeUpdateLastName(): void {
    this.userService.lastName.next(this.lastName);
    this.formNameInputService.checkLastNameInput(this.lastName);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
