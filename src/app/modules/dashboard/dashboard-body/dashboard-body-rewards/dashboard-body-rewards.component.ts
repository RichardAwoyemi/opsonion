import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../../../shared/models/user';
import { CreditsService } from '../../../../shared/services/credits.service';
import { UtilService } from '../../../../shared/services/util.service';
import * as fromUser from '../../../core/store/shared/user.reducer';

@Component({
  selector: 'app-dashboard-body-rewards',
  templateUrl: './dashboard-body-rewards.component.html',
  styleUrls: ['./dashboard-body-rewards.component.css'],
})
export class DashboardBodyRewardsComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  user: IUser;
  credits = 0;
  innerHeight: number;
  referralId: string;
  referralUrl: string;
  referralMessage: string;
  facebookShareUrl: string;
  whatsappShareUrl: string;
  twitterShareUrl: string;
  emailShareUrl: string;
  rewardsBodyPadding: { [key: string]: string };
  rewardsTopPadding: { [key: string]: string };

  ngUnsubscribe = new Subject<void>();

  constructor(
    private userStore: Store<fromUser.State>,
    private toastrService: ToastrService,
    private creditsService: CreditsService,
    private breakpointObserver: BreakpointObserver,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result.matches === false) {
          this.rewardsBodyPadding = { padding: '2em' };
          this.rewardsTopPadding = { 'padding-top': '1em' };
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
    this.innerHeight = window.innerHeight;
    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          this.referralId = this.user.referralId;
          this.referralUrl = document.location.href.split('/')[2] + '/invite/' + this.referralId;
          this.createReferralUrls(this.referralUrl);
          if (this.user.credits) {
            this.credits = this.user.credits;
          }
        }
      });
    this.ngxLoader.stop();
  }

  createReferralUrls(referralUrl: string): void {
    this.referralMessage = `Want to build a cool website without writing a single line of code? Sign up to join Opsonion at ${this.referralUrl}!`;
    this.facebookShareUrl = `http://www.facebook.com/sharer/sharer.php?u=${referralUrl}`;
    this.whatsappShareUrl = `https://wa.me/?text=${this.referralMessage}`;
    this.twitterShareUrl = `https://twitter.com/intent/tweet?text=${this.referralMessage}`;
    this.emailShareUrl = `mailto:?subject=Build the sites you want with the ease you deserve!&body=${this.referralMessage}`;
  }

  copyMessage(): void {
    UtilService.copyMessage(this.referralUrl);
    this.toastrService.success('Your referral link has been copied.', 'Great!');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
