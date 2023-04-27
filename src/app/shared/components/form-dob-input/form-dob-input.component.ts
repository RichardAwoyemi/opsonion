import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormDobInputService } from './form-dob-input.service';
import { NGXLogger } from 'ngx-logger';
import { UtilService } from '../../services/util.service';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-dob-input',
  templateUrl: './form-dob-input.component.html',
})
export class FormDobInputComponent implements OnInit, OnDestroy {
  dates: Array<string>;
  years: Array<number>;
  user: IUser;

  ngUnsubscribe = new Subject<void>();

  dobDay: string;
  dobMonth: string;
  dobYear: string;
  showDobDayInputError: { [key: string]: boolean };
  showDobMonthInputError: { [key: string]: boolean };
  showDobYearInputError: { [key: string]: boolean };

  constructor(
    private utilService: UtilService,
    private dataService: DataService,
    private userService: UserService,
    private logger: NGXLogger,
    private userStore: Store<fromUser.State>,
    private formDobInputService: FormDobInputService
  ) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (!result.dobDay) {
            this.dobDay = 'Day';
          } else {
            this.dobDay = this.user.dobDay;
            this.userService.dobDay.next(this.dobDay);
            this.formDobInputService.showDobDayInputError.next({
              status: false,
            });
          }
          if (!result.dobMonth) {
            this.dobMonth = 'Month';
          } else {
            this.dobMonth = this.user.dobMonth;
            this.userService.dobMonth.next(this.dobMonth);
            this.formDobInputService.showDobMonthInputError.next({
              status: false,
            });
          }
          if (!result.dobYear) {
            this.dobYear = 'Year';
          } else {
            this.dobYear = this.user.dobYear;
            this.userService.dobYear.next(this.dobYear);
            this.formDobInputService.showDobYearInputError.next({
              status: false,
            });
          }
        }
      });

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = UtilService.createYearRange('1930', lastYear);
    this.dataService
      .getAllDates()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if (data) {
          this.dates = Object.values(data);
        }
      });

    this.dataService
      .getAllDates()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if (data) {
          this.dates = Object.values(data);
        }
      });

    this.formDobInputService.showDobDayInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showDobDayInputError = response;
        }
      });

    this.formDobInputService.showDobMonthInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showDobMonthInputError = response;
        }
      });

    this.formDobInputService.showDobYearInputError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.showDobYearInputError = response;
        }
      });

    this.userService.dobDay.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobDay = response;
        this.formDobInputService.showDobDayInputError.next({
          status: this.dobDay === 'Day',
        });
      }
    });

    this.userService.dobMonth.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobMonth = response;
        this.formDobInputService.showDobMonthInputError.next({
          status: this.dobMonth === 'Month',
        });
      }
    });

    this.userService.dobYear.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.dobYear = response;
        this.formDobInputService.showDobYearInputError.next({
          status: this.dobYear === 'Month',
        });
      }
    });
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  onChangeUpdateDob(): void {
    this.userService.dobDay.next(this.dobDay);
    this.userService.dobMonth.next(this.dobMonth);
    this.userService.dobYear.next(this.dobYear);

    this.formDobInputService.showDobDayInputError.next({
      status: this.dobDay === 'Day',
    });
    this.formDobInputService.showDobMonthInputError.next({
      status: this.dobMonth === 'Month',
    });
    this.formDobInputService.showDobYearInputError.next({
      status: this.dobYear === 'Year',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
