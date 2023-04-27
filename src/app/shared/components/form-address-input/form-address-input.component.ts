import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import { IUser } from 'src/app/shared/models/user';
import { UserService } from '../../services/user.service';
import { FormAddressInputService } from './form-address-input.service';

@Component({
  selector: 'app-form-address-input',
  templateUrl: './form-address-input.component.html',
})
export class FormAddressInputComponent implements OnInit, OnDestroy {
  user: IUser;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;
  showStreetAddressInputError: { [key: string]: boolean };
  showCityInputError: { [key: string]: boolean };
  showPostcodeInputError: { [key: string]: boolean };
  ngUnsubscribe = new Subject<void>();

  constructor(
    public formAddressInputService: FormAddressInputService,
    private userService: UserService,
    private userStore: Store<fromUser.State>
  ) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (this.user.streetAddress1) {
            this.streetAddress1 = this.user.streetAddress1;
            this.userService.streetAddress1.next(this.streetAddress1);
            this.formAddressInputService.showStreetAddressInputError.next({
              status: false,
            });
          }
          if (this.user.streetAddress2) {
            this.streetAddress2 = this.user.streetAddress2;
            this.userService.streetAddress2.next(this.streetAddress2);
          }
          if (this.user.city) {
            this.city = this.user.city;
            this.userService.city.next(this.city);
            this.formAddressInputService.showCityInputError.next({
              status: false,
            });
          }
          if (this.user.postcode) {
            this.postcode = this.user.postcode;
            this.userService.postcode.next(this.postcode);
            this.formAddressInputService.showPostcodeInputError.next({
              status: false,
            });
          }
        }
      });

    this.formAddressInputService.showStreetAddressInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showStreetAddressInputError = response;
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

    this.formAddressInputService.showCityInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showCityInputError = response;
        }
      });

    this.userService.city.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.city = response;
      }
    });

    this.formAddressInputService.showPostcodeInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showPostcodeInputError = response;
        }
      });

    this.userService.postcode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.postcode = response;
      }
    });
  }

  checkStreetAddress1Input(): void {
    if (this.streetAddress1) {
      this.streetAddress1 = this.streetAddress1.trim();
      if (this.streetAddress1.length > 5) {
        this.formAddressInputService.showStreetAddressInputError.next({
          status: false,
        });
      } else {
        this.formAddressInputService.showStreetAddressInputError.next({
          status: true,
        });
      }
      this.userService.streetAddress1.next(this.streetAddress1);
    } else {
      this.formAddressInputService.showStreetAddressInputError.next({
        status: true,
      });
    }
  }

  checkStreetAddress2Input(): void {
    if (this.streetAddress2) {
      this.streetAddress2 = this.streetAddress2.trim();
      this.userService.streetAddress2.next(this.streetAddress2);
    }
  }

  checkCityInput(): void {
    if (this.city) {
      this.city = this.city.trim();
      this.formAddressInputService.showCityInputError.next({ status: false });
      this.userService.city.next(this.city);
    } else {
      this.formAddressInputService.showCityInputError.next({ status: true });
    }
  }

  checkPostcodeInput(): void {
    if (this.postcode) {
      this.postcode = this.postcode.trim();
      this.formAddressInputService.showPostcodeInputError.next({
        status: false,
      });
      this.userService.postcode.next(this.postcode);
    } else {
      this.formAddressInputService.showPostcodeInputError.next({
        status: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
