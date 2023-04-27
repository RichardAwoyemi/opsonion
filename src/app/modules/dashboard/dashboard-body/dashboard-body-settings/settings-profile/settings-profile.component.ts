import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormAddressInputService } from '../../../../../shared/components/form-address-input/form-address-input.service';
import { FormDobInputService } from '../../../../../shared/components/form-dob-input/form-dob-input.service';
import { FormNameInputService } from '../../../../../shared/components/form-name-input/form-name-input.service';
import { FormUsernameInputService } from '../../../../../shared/components/form-username-input/form-username-input.service';
import { IUser } from '../../../../../shared/models/user';
import { UserService } from '../../../../../shared/services/user.service';
import * as fromUser from '../../../../core/store/shared/user.reducer';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  username: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  usernameExists: { [key: string]: boolean };
  showFirstNameInputError: { [key: string]: boolean };
  showLastNameInputError: { [key: string]: boolean };
  showDobDayInputError: { [key: string]: boolean };
  showDobMonthInputError: { [key: string]: boolean };
  showDobYearInputError: { [key: string]: boolean };
  showStreetAddressInputError: { [key: string]: boolean };
  showCityInputError: { [key: string]: boolean };
  showPostcodeInputError: { [key: string]: boolean };

  ngUnsubscribe = new Subject<void>();

  constructor(
    private userStore: Store<fromUser.State>,
    private formUsernameInputService: FormUsernameInputService,
    private formNameInputService: FormNameInputService,
    private formDobInputService: FormDobInputService,
    private formAddressInputService: FormAddressInputService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (result.username) {
            this.userService.username.next(result.username);
          }
        }
      });

    this.formUsernameInputService.usernameExists
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.usernameExists = response;
        }
      });

    this.userService.username.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.username = response;
      }
    });

    this.userService.firstName.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.firstName = response;
      }
    });

    this.userService.lastName.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.lastName = response;
      }
    });

    this.userService.streetAddress1.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.streetAddress1 = response;
      }
    });

    this.userService.streetAddress2.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.streetAddress2 = response;
      }
    });

    this.userService.city.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.city = response;
      }
    });

    this.userService.postcode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.postcode = response;
      }
    });

    this.userService.dobDay.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobDay = response;
      }
    });

    this.userService.dobMonth.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobMonth = response;
      }
    });

    this.userService.dobYear.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobYear = response;
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

    this.formDobInputService.showDobDayInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showDobDayInputError = result;
        }
      });

    this.formDobInputService.showDobMonthInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showDobMonthInputError = result;
        }
      });

    this.formDobInputService.showDobYearInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showDobYearInputError = result;
        }
      });

    this.formAddressInputService.showStreetAddressInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showStreetAddressInputError = result;
        }
      });

    this.formAddressInputService.showCityInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showCityInputError = result;
        }
      });

    this.formAddressInputService.showPostcodeInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.showPostcodeInputError = result;
        }
      });
  }

  setUserPersonalDetails(): void {
    if (
      !this.user.uid ||
      this.usernameExists['status'] ||
      this.showFirstNameInputError['status'] ||
      this.showLastNameInputError['status'] ||
      this.showDobDayInputError['status'] ||
      this.showDobMonthInputError['status'] ||
      this.showDobYearInputError['status'] ||
      this.showStreetAddressInputError['status'] ||
      this.showCityInputError['status'] ||
      this.showPostcodeInputError['status']
    ) {
      this.toastrService.warning('Please fill in all the required fields', 'Oops!');
    } else {
      if (!this.streetAddress2) {
        this.streetAddress2 = null;
      }
      this.userService.setUserPersonalDetails(
        this.user.uid,
        this.username,
        this.firstName,
        this.lastName,
        this.dobDay,
        this.dobMonth,
        this.dobYear,
        this.streetAddress1,
        this.streetAddress2,
        this.city,
        this.postcode
      );
      this.toastrService.success('Your profile has been updated.', 'Great!');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
